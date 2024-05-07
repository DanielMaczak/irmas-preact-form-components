//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { Ref } from 'preact';
import { ForwardedRef, forwardRef, useRef } from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';

/**
 * @description Resizes text input if component is defined as multiline.
 * @param e InputEvent.
 */
const resizeContainer = (e: Event): void => {
  if (e.currentTarget instanceof HTMLTextAreaElement) {
    const textArea: HTMLTextAreaElement = e.currentTarget;
    textArea.style.height = '1px'; // ensure resize to smaller
    textArea.style.height = `${textArea.scrollHeight}px`;
  }
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
const capitalizeText = (
  text: string,
  autocapitalize: c.CAPS_OPTIONS
): string => {
  switch (autocapitalize) {
    case c.CAPS_OPTIONS.CHARS:
      return text.toUpperCase();
    case c.CAPS_OPTIONS.WORDS:
      return text.replace(
        /\p{L}+(?:'\p{L}+)*/gu,
        word => word[0].toUpperCase() + word.slice(1)
      );
    case c.CAPS_OPTIONS.SENTENCES:
      return text.replace(/^\s*\p{L}|\.\s+\p{L}/gu, startOfSentence =>
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
 * -  autocapitalize that works on any device,
 * -  customizable class names,
 * -  state management for input values,
 * -  optional associated label.
 * @param value Hook to value displayed in component.
 * @param setValue Hook to change internal value storage.
 * @param id Custom ID to override randomly generated.
 * @param name Name for submit function.
 * @param className Custom class list to attach to component.
 * @param label Text to display in label (otherwise is omitted).
 * @param placeholder Relay standard HTML attribute.
 * @param enabled Relay standard HTML attribute.
 * @param autocapitalize Relay standard HTML attribute.
 * @param multiline Makes component autosize vertically with input.
 * @param ref Forward ref to input element passed from parent.
 * @version 1.0.0
 */
export const TextInput = (
  {
    value,
    setValue,
    id = '',
    name = '',
    className = '',
    label = '',
    placeholder = '',
    enabled = true,
    autocapitalize = c.CAPS_OPTIONS.NONE,
    multiline = false,
  }: {
    value: string;
    setValue: (value: string) => void;
    id?: string;
    name?: string;
    className?: string;
    label?: string;
    placeholder?: string;
    enabled?: boolean;
    autocapitalize?: c.CAPS_OPTIONS;
    multiline?: boolean;
  },
  ref: ForwardedRef<HTMLElement>
) => {
  //  Ensure element has valid static ID
  const idRef = id || label ? u.generateElementId(id) : undefined;

  //  Generate class strings
  const labelClasses = u.generateInputClasses(
    c.CLASS_TYPES.CLASS_LABEL,
    className
  );
  const inputClasses = u.generateInputClasses(
    c.CLASS_TYPES.CLASS_INPUT,
    c.CLASS_TEXT,
    multiline ? c.CLASS_TEXTMULTI : c.CLASS_TEXTSINGLE,
    className
  );

  //  Value references (mutable)
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  /**
   * @description Applies autocapitalize to user input.
   * Is debounced on input to 350ms to allow key-holding and touch typing.
   * Ensures control retains cursor position.
   * @param e InputEvent.
   */
  const autocapitalizeInput = (e: Event): void => {
    timeoutId.current && clearTimeout(timeoutId.current);
    //  Access element
    if (!(e.currentTarget instanceof HTMLTextAreaElement)) return;
    const textArea: HTMLTextAreaElement = e.currentTarget;
    //  Capitalize while retaining cursor position
    timeoutId.current = setTimeout(() => {
      const cursorPosition: number = textArea.selectionStart;
      textArea.value = capitalizeText(textArea.value, autocapitalize);
      textArea.selectionStart = cursorPosition;
      textArea.selectionEnd = cursorPosition;
    }, 350);
  };

  /**
   * @description Stores value into state when switching focus.
   * @param e Text input focus/blur event.
   */
  const storeValue = (e: FocusEvent): void => {
    if (!enabled) return;
    if (e.currentTarget instanceof HTMLTextAreaElement) {
      const textArea: HTMLTextAreaElement = e.currentTarget;
      if (value === textArea.value) return;
      setValue(textArea.value);
    }
  };

  return (
    <>
      {label && (
        <label htmlFor={idRef?.current} class={labelClasses.current}>
          {label}
        </label>
      )}
      <textarea
        value={
          typeof value !== 'string'
            ? ''
            : autocapitalize
            ? capitalizeText(value, autocapitalize)
            : value
        }
        {...(idRef ? { id: idRef.current } : {})}
        {...(name ? { name: name } : {})}
        class={inputClasses.current}
        placeholder={placeholder}
        disabled={!enabled}
        onInput={e => {
          multiline && resizeContainer(e);
          autocapitalize && autocapitalizeInput(e);
        }}
        onBlur={storeValue}
        autocomplete="on"
        autocapitalize="off" // we provide our own
        rows={1} // set default size
        ref={ref as Ref<HTMLTextAreaElement>}
      />
    </>
  );
};

/**
 * @description Provides forwarded reference to internal input component.
 * Intended for use with Replace Input component.
 */
export const TextInputRef = forwardRef(TextInput);
