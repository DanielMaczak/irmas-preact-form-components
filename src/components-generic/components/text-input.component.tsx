//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { Ref } from 'preact';
import { ForwardedRef, forwardRef, useMemo } from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';

//  Internal constants
export enum CAPS_OPTIONS {
  NONE = 'none',
  CHARS = 'characters',
  WORDS = 'words',
  SENTENCES = 'sentences',
}

/**
 * @description Resizes text input if component is defined as multiline.
 * @param e InputEvent.
 */
const resizeContainer = (e: InputEvent): void => {
  if (!(e.currentTarget instanceof HTMLElement)) return;
  const elem: HTMLElement = e.currentTarget;
  elem.style.height = '1px'; // ensure resize to smaller
  elem.style.height = `${elem.scrollHeight}px`;
};

/**
 * @description Capitalizes text based on 3 provided settings:
 * -  characters: all text is capitalized,
 * -  words: all words have first letter capitalized,
 * -  sentences: all full sentences have first letter capitalized.
 * Does not autocorrect remaining parts of text to allow typing names etc.
 * @param text What is capitalized.
 * @param autocapitalize One of capitalization options.
 * @returns Capitalized text.
 */
const capitalizeText = (text: string, autocapitalize: CAPS_OPTIONS) => {
  switch (autocapitalize) {
    case CAPS_OPTIONS.CHARS:
      return text.toUpperCase();
    case CAPS_OPTIONS.WORDS:
      return text.replace(
        /\w+/g,
        word => word[0].toUpperCase() + word.slice(1)
      );
    case CAPS_OPTIONS.SENTENCES:
      return text.replace(/^\w|\.\s+\w/g, startOfSentence =>
        startOfSentence.toUpperCase()
      );
    default:
      return text;
  }
};

/**
 * @module text-input.component
 * @description Enables creating customizable text input components.
 * Value is stored on control exit.
 * Included features:
 * -  auto-resizing for multiline inputs,
 * -  customizable class names,
 * -  state management for input values,
 * -  optional associated label.
 * @param value Hook to value displayed in component.
 * @param setValue Hook to change internal value storage.
 * @param id Custom ID to override randomly generated.
 * @param className Custom class list to attach to component.
 * @param label Text to display in label (otherwise is omitted).
 * @param placeholder Relay standard HTML attribute.
 * @param enabled Relay standard HTML attribute.
 * @param autocapitalize Relay standard HTML attribute.
 * @param multiline Makes component autosize vertically with input.
 * @param ref Forward ref to input element passed from parent.
 * @version 1.0.0
 */
export const TextInput = forwardRef(function TextInput(
  {
    value,
    setValue,
    id = '',
    className = '',
    label = '',
    placeholder = '',
    enabled = true,
    autocapitalize = CAPS_OPTIONS.NONE,
    multiline = false,
  }: {
    value: string;
    setValue: (value: string) => void;
    id?: string;
    className?: string;
    label?: string;
    placeholder?: string;
    enabled?: boolean;
    autocapitalize?: CAPS_OPTIONS;
    multiline?: boolean;
  },
  ref: ForwardedRef<HTMLElement>
) {
  /**
   * @description Applies autocapitalize to user input.
   * Is debounced on input to 350ms to allow key-holding and touch typing.
   * Ensures control retains cursor position.
   * @param e InputEvent.
   */
  let timeoutId: NodeJS.Timeout;
  const autocapitalizeInput = (e: InputEvent) => {
    if (timeoutId) clearTimeout(timeoutId);
    //  Access element
    if (!(e.currentTarget instanceof HTMLTextAreaElement)) return;
    const elem: HTMLTextAreaElement = e.currentTarget;
    //  Capitalize while retaining cursor position
    timeoutId = setTimeout(() => {
      const cursorPosition: number = elem.selectionStart;
      elem.value = capitalizeText(elem.value, autocapitalize);
      elem.selectionStart = cursorPosition;
      elem.selectionEnd = cursorPosition;
      return;
    }, 350);
  };

  /**
   * @description Stores value into state when switching focus.
   * @param e Text input focus/blur event.
   */
  const storeValue = (e: FocusEvent): void => {
    if (!(e.currentTarget instanceof HTMLElement)) return;
    const elem: HTMLElement = e.currentTarget;
    if (value === elem.textContent) return;
    elem.textContent ? setValue(elem.textContent) : setValue('');
  };

  //  Ensure element has valid static ID
  const idRef = useMemo(
    () => (id || label ? u.generateElementId(id) : undefined),
    [id, label]
  );

  //  Generate class strings
  const labelClasses = useMemo(
    () => u.generateInputClasses(c.CLASS_TYPES.CLASS_LABEL, className),
    [className]
  );
  const inputClasses = useMemo(
    () =>
      u.generateInputClasses(
        c.CLASS_TYPES.CLASS_INPUT,
        className,
        c.CLASS_TEXTINPUT,
        multiline ? c.CLASS_TEXTMULTI : c.CLASS_TEXTSINGLE
      ),
    [className, multiline]
  );

  return (
    <>
      {label && (
        <label htmlFor={idRef?.current} class={labelClasses}>
          {label}
        </label>
      )}
      <textarea
        {...(idRef ? { id: idRef.current } : {})}
        class={inputClasses}
        placeholder={placeholder}
        disabled={!enabled}
        onInput={e => {
          multiline && resizeContainer(e);
          autocapitalize !== CAPS_OPTIONS.NONE && autocapitalizeInput(e);
        }}
        onBlur={storeValue}
        autocomplete="on"
        rows={1} // set default size
        ref={ref as Ref<HTMLTextAreaElement>}
      >
        {value}
      </textarea>
    </>
  );
});
