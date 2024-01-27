//  External dependencies
import { ChangeEvent } from 'preact/compat';

//  Custom component CSS
import './date-input.component.css';

//  CSS identifiers
const COMP_NAME: string = 'date-input';
const COMP_INPUT: string = `${COMP_NAME}__input`;
const COMP_LABEL: string = `${COMP_NAME}__label`;

/**
 * @module date-input.component
 * @description Enables creating customizable date input components.
 * Expects date via value as number in ms.
 * Included features:
 *    customizable class names,
 *    state management for input values,
 *    optional associated label.
 * @version 1.0.0
 */
export function DateInput({
  value,
  setValue,
  id = `${COMP_NAME}__${(+new Date()).toString(36).slice(-8)}`,
  className = '',
  label = '',
  enabled = true,
}: {
  value: number;
  setValue: (value: number) => void;
  id?: string;
  className?: string;
  label?: string;
  enabled?: boolean;
}) {
  /**
   * @description Composes class name for date input component.
   * Requires that component name is part of defaultClass.
   * @param defaultClass - Default class name for element.
   * @returns Composed class name.
   */
  const composeClassName = (defaultClass: string): string => {
    const customClassName: string = className
      ? defaultClass.replace(COMP_NAME, className)
      : '';
    const completeClassName: string[] = [defaultClass, customClassName];
    return completeClassName.join(' ').replace(/\s+/g, ' ').trim();
  };

  /**
   * @description Stores date value into state when changed.
   * @param e - Date input change event.
   */
  const storeValue = (e: ChangeEvent): void => {
    if (!(e.currentTarget instanceof HTMLInputElement)) return;
    const elem: HTMLInputElement = e.currentTarget;
    const newValue: number = new Date(elem.value).valueOf();
    if (isNaN(newValue)) return;
    if (value === newValue) return;
    setValue(newValue);
  };

  return (
    <>
      {label && (
        <label htmlFor={id} class={composeClassName(COMP_LABEL)}>
          {label}
        </label>
      )}
      <input
        type="date"
        value={new Date(value).toISOString().slice(0, 10)}
        id={id}
        class={composeClassName(COMP_INPUT)}
        disabled={!enabled}
        onChange={storeValue}
      />
    </>
  );
}
