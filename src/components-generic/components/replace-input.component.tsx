//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { ComponentChild, Ref } from 'preact';
import {
  ForwardedRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';

/**
 * @description This component is intended to be used with any input form.
 * Input stores value in value prop, while textarea as textContent.
 * This function ensures value is always correctly read.
 * @param element HTML element to read.
 * @returns Value of element as string ('' for empty/invalid element).
 */
const getElementContent = (element: HTMLElement | null): string => {
  if (!element) return '';
  if ('value' in element) {
    return element.value as string;
  } else {
    return element.textContent ?? '';
  }
};

/**
 * @description Copies selected properties between elements
 * to ensure they will visually appear the same.
 * @param copyFrom Source of properties.
 * @param copyTo Target to copy properties to.
 */
const copyElementProps = (copyFrom: HTMLElement, copyTo: HTMLElement): void => {
  copyTo.textContent = getElementContent(copyFrom);
  copyTo.style.cssText = copyFrom.style.cssText;
  copyFrom.id && (copyTo.id = copyFrom.id);
  copyFrom.className && (copyTo.className = copyFrom.className);
};

/**
 * @module replace-input.component
 * @description Allows to replace any input component while not used.
 * Intended to improve performance when many inputs have to be present on page.
 * Makes user experience pleasant by reducing stutter during editing,
 * while making the initial page load longer.
 * Refer to documentation for usage:
 * https://github.com/DanielMaczak/irmas-preact-form-components
 * Included features:
 * -  any component can be passed as replacement during inactivity
 * -  if no component given, generates custom component mimicking input
 * @param ReplaceWith Used directly to autogenerate component,
 *        not used if component is given.
 * @param component Custom component to use as replacement.
 * @param children Input to be replaced.
 * @version 1.0.0
 */
export const ReplaceInput = ({
  ReplaceWith = 'div',
  component,
  children,
}: {
  ReplaceWith?: 'div' | 'span' | 'td' | 'li';
  component?: (ref: Ref<HTMLElement>) => ComponentChild;
  children: (childRef: ForwardedRef<HTMLElement>) => ComponentChild;
}) => {
  //  State hooks
  const [displayInput, setDisplay] = useState(false);

  //  Component references (mutable)
  const childRef = useRef<HTMLElement | null>(null);
  const replaceRef = useRef<HTMLElement | null>(null);

  //  Memoize component check
  const useComponent: boolean = useMemo(() => Boolean(component), [component]);

  //  Generate class strings
  const fieldsetClasses = useRef(
    u.generateInputClasses(c.CLASS_TYPES.CLASS_FIELDSET)
  );

  //  Element switching
  useEffect(() => {
    if (!replaceRef.current || !childRef.current) return;
    if (displayInput) {
      //  Show input element
      replaceRef.current.replaceWith(childRef.current);
      childRef.current.focus();
    } else {
      //  Show replacement element
      if (!useComponent) copyElementProps(childRef.current, replaceRef.current);
      childRef.current.replaceWith(replaceRef.current);
    }
  }, [displayInput]);

  //  Initial component state
  useLayoutEffect(() => {
    // ^ to trigger as soon as possible
    if (!replaceRef.current || !childRef.current) return;
    if (!useComponent) copyElementProps(childRef.current, replaceRef.current);
    childRef.current.replaceWith(replaceRef.current);
  }, []);

  /**
   * @description Mouse click handlers.
   * Mimick standard behavior with non-replaced element:
   * -  label click focuses input,
   * -  click outside removes focus,
   * -  click inside input changes cursor position (does not interfere),
   * -  repeated label click keeps focus on input.
   * @param e Mouse click event.
   */
  let mouseDown: boolean = false;
  const onClickHandler = (e: MouseEvent): void => {
    e.preventDefault(); // prevent label triggering twice
    mouseDown = false; // click finished
    if (Object.is(e.target, childRef.current)) return; // click inside input
    !displayInput && setDisplay(true);
    childRef.current?.focus();
  };
  const onMouseDownHandler = (): void => {
    mouseDown = true; // click initiated
    !displayInput && setDisplay(true);
    childRef.current?.focus();
  };
  const onBlurHandler = (): void => {
    if (mouseDown) return; // prevent repeated label click to be taken as blur
    displayInput && setDisplay(false);
  };

  return (
    <fieldset
      class={fieldsetClasses.current}
      onClick={e => onClickHandler(e)}
      onMouseDown={onMouseDownHandler}
      onBlur={onBlurHandler}
    >
      {children(childRef)}
      {component !== undefined ? (
        component(replaceRef)
      ) : (
        // TODO replace any with some insane custom type
        <ReplaceWith ref={replaceRef as any} />
      )}
    </fieldset>
  );
};
