//  Custom component CSS
import './text-input.component.css';

//  CSS identifiers
const COMP_NAME: string = 'text-input';
const COMP_INPUT: string = `${COMP_NAME}__input`;
const COMP_INPUT_MULTILINE: string = `${COMP_NAME}__input-multiline`;
const COMP_LABEL: string = `${COMP_NAME}__label`;

/**
 * @module text-input.component
 * @description Enables creating customizable text input components.
 * Included features:
 *    auto-resizing for multiline inputs,
 *    customizable class names,
 *    state management for input values,
 *    optional associated label.
 * @version 1.0.0
 */
export function TextInput({
  value,
  setValue,
  id = `${COMP_NAME}__${(+new Date()).toString(36).slice(-8)}`,
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
   * @description Composes class name for text input component.
   * Requires that component name is part of defaultClass.
   * @param defaultClass - Default class name for element.
   * @param multiline - Boolean indicating if input is multiline.
   * @returns Composed class name.
   */
  const composeClassName = (
    defaultClass: string,
    multiline: boolean = false
  ): string => {
    const customClassName: string = className
      ? defaultClass.replace(COMP_NAME, className)
      : '';
    const completeClassName: string[] = [
      defaultClass,
      multiline ? COMP_INPUT_MULTILINE : '',
      customClassName,
    ];
    return completeClassName.join(' ').replace(/\s+/g, ' ').trim();
  };

  /**
   * @description Resizes text input if component is defined as multiline.
   * @param e - InputEvent.
   */
  const resizeContainer = (e: InputEvent): void => {
    if (!multiline) return;
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

  return (
    <>
      {label && (
        <label htmlFor={id} class={composeClassName(COMP_LABEL)}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        class={composeClassName(COMP_INPUT, multiline)}
        placeholder={placeholder}
        disabled={!enabled}
        autocapitalize={autocapitalize}
        onInput={resizeContainer}
        onBlur={storeValue}
        autocomplete="on"
        rows={1} // set default size
      >
        {value}
      </textarea>
    </>
  );
}
