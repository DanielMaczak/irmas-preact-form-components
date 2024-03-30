//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { ForwardedRef, forwardRef, useRef } from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';
import * as t from '../services/types.service';

//  Dropdown arrow
const DropdownArrow = ({ className }: { className: string }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 100 100"
    class={className}
    style="fill: inherit;"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M50 78a8.32 8.32 0 0 1-6-2.5l-39-39c-3.3-3.3-3.3-8.7 0-12s8.7-3.3 12 0l33 33 33-33c3.3-3.3 8.7-3.3 12 0s3.3 8.7 0 12l-39 39a8.32 8.32 0 0 1-6 2.5z" />
  </svg>
);

/**
 * @module dropdown-input.component
 * @description
 *
 * @param value Hook to value displayed in component.
 * @param setValue Hook to change internal value storage.
 * @param options List of options and associated IDs.
 * @param id Custom ID to override randomly generated.
 * @param className Custom class list to attach to component.
 * @param label Text to display in label (otherwise is omitted).
 * @param enabled Relay standard HTML attribute.
 * @param showValue Shows only arrow if false.
 * @param ref Forward ref to input element passed from parent.
 * @version 1.0.0
 */
export const DropdownInput = forwardRef(function DropdownInput(
  {
    value,
    setValue,
    options,
    id = '',
    className = '',
    label = '',
    enabled = true,
    showValue = true,
  }: {
    value: t.Option;
    setValue: (option: t.Option) => void;
    options: t.Option[];
    id?: string;
    className?: string;
    label?: string;
    enabled?: boolean;
    showValue?: boolean;
  },
  ref: ForwardedRef<HTMLElement>
) {
  //  Component references (mutable)
  const dropdownRef = useRef<HTMLDetailsElement | null>(null);

  //  Ensure element has valid static ID
  const idRef = id || label ? u.generateElementId(id) : undefined;

  //  Generate class strings
  const labelClasses = u.generateInputClasses(
    c.CLASS_TYPES.CLASS_LABEL,
    className
  );
  const inputClasses = u.generateInputClasses(
    c.CLASS_TYPES.CLASS_INPUT,
    className
  );
  const optionClasses = u.generateInputClasses(
    c.CLASS_TYPES.CLASS_OPTION,
    className
  );
  const listClasses = u.generateInputClasses(
    c.CLASS_TYPES.CLASS_LIST,
    className
  );
  const arrowClasses = u.generateInputClasses(
    c.CLASS_TYPES.CLASS_ARROW,
    className
  );

  /**
   * @description
   *
   * @param e
   */
  const storeValue = (e: MouseEvent): void => {
    if (!enabled) return;
    if (!(e.currentTarget instanceof HTMLLIElement)) return;
    //  Extract option
    const elem: HTMLLIElement = e.currentTarget;
    const id: string = String(elem.value);
    const option: t.Option | undefined = options.find(
      option => option.id === id
    );
    //  Store final value
    option && setValue(option);
  };

  const openDropdown = () => {
    const summary = dropdownRef.current?.children[0] as HTMLElement | undefined;
    summary && summary.focus();
    dropdownRef.current?.toggleAttribute('open');
  };
  const closeDropdown = () => {
    dropdownRef.current?.removeAttribute('open');
  };

  return (
    <>
      {label && (
        <label
          htmlFor={idRef?.current}
          class={labelClasses.current}
          onClick={openDropdown}
        >
          {label}
        </label>
      )}
      <details
        {...(idRef ? { id: idRef.current } : {})}
        class={inputClasses.current}
        disabled={!enabled}
        onBlur={closeDropdown}
        ref={node => {
          ref && typeof ref !== 'function' && (ref.current = node);
          dropdownRef.current = node;
        }}
      >
        {/* //  Dropdown input */}
        <summary class={inputClasses.current}>
          {showValue ? value.value : null}
          <DropdownArrow className={arrowClasses.current} />
        </summary>
        {/* //  Dropdown options */}
        <ul class={listClasses.current}>
          {options.map(option => (
            <li
              key={option.id}
              value={option.id}
              onMouseDown={storeValue}
              class={optionClasses.current}
            >
              {option.value}
              {option.color ? (
                <span style={`background-color: rgb(${option.color});`}></span>
              ) : null}
            </li>
          ))}
        </ul>
      </details>
    </>
  );
});
