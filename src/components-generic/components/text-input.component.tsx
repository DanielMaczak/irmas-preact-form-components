//  Custom component CSS
import './style.css';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';

/**
 * @module text-input.component
 * @description Enables creating customizable text input components.
 * Value is stored on control exit.
 * Included features:
 * -  auto-resizing for multiline inputs,
 * -  customizable class names,
 * -  state management for input values,
 * -  optional associated label.
 * @version 1.0.0
 */
export function TextInput({
  value,
  setValue,
  id = '',
  className = '',
  label = '',
  placeholder = '',
  enabled = true,
  autocapitalize = 'none',
  multiline = false,
}: {
  value: string;
  setValue: (value: string) => void;
  id?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  enabled?: boolean;
  autocapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
}) {
  /**
   * @description Resizes text input if component is defined as multiline.
   * @param e - InputEvent.
   */
  const resizeContainer = (e: InputEvent): void => {
    if (!(e.currentTarget instanceof HTMLElement)) return;
    const elem: HTMLElement = e.currentTarget;
    elem.style.height = '1px'; // ensure resize to smaller
    elem.style.height = `${elem.scrollHeight}px`;
  };

  /**
   * @description Stores value into state when switching focus.
   * @param e - Text input focus/blur event.
   */
  const storeValue = (e: FocusEvent): void => {
    if (!(e.currentTarget instanceof HTMLElement)) return;
    const elem: HTMLElement = e.currentTarget;
    if (value === elem.textContent) return;
    elem.textContent ? setValue(elem.textContent) : setValue('');
  };

  //  Ensure element has valid static ID
  const idRef = u.generateElementId(id);

  //  Generate class strings
  const labelClasses = u.generateInputClasses('label', className);
  const inputClasses = u.generateInputClasses(
    'input',
    className,
    c.CLASS_TEXTINPUT,
    multiline ? c.CLASS_TEXTMULTI : c.CLASS_TEXTSINGLE
  );

  return (
    <>
      {label && (
        <label htmlFor={idRef.current} class={labelClasses}>
          {label}
        </label>
      )}
      <textarea
        id={idRef.current}
        class={inputClasses}
        placeholder={placeholder}
        disabled={!enabled}
        autocapitalize={autocapitalize}
        onInput={(() => multiline) && resizeContainer}
        onBlur={storeValue}
        autocomplete="on"
        rows={1} // set default size
      >
        {value}
      </textarea>
    </>
  );
}
