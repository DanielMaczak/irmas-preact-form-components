//  Custom component CSS
import './style.css';

//  External dependencies
import { ChangeEvent } from 'preact/compat';

//  Internal dependencies
import * as c from './constants.service';

/**
 * @module date-input.component
 * @description Enables creating customizable date input components.
 * Expects date via value parameter to be given as number in ms.
 * Value is stored on valid date input.
 * Included features:
 * -  customizable class names,
 * -  state management for input values,
 * -  optional associated label,
 * -  invalid input protection.
 * @version 1.0.0
 */
export function DateInput({
  value,
  setValue,
  id = '',
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
   * @description Stores date value into state when changed.
   * @param e - Date input change event.
   */
  const storeValue = (e: ChangeEvent): void => {
    if (!enabled) return;
    if (!(e.currentTarget instanceof HTMLInputElement)) return;
    const elem: HTMLInputElement = e.currentTarget;
    const newValue: number = new Date(elem.value).valueOf();
    if (isNaN(newValue)) return;
    if (value === newValue) return;
    setValue(newValue);
  };

  //  Ensure elements have valid static ID
  const idRef = id || label ? c.generateElementId(id) : undefined;

  //  Generate class strings
  const labelClasses = c.generateInputClasses('label', className);
  const inputClasses = c.generateInputClasses('input', className);

  return (
    <>
      {label && (
        <label htmlFor={idRef?.current} class={labelClasses}>
          {label}
        </label>
      )}
      <input
        type="date"
        value={
          typeof value === 'number' &&
          !isNaN(value) &&
          value > -Infinity &&
          value < Infinity
            ? new Date(value).toISOString().slice(0, 10)
            : undefined
        }
        {...(idRef ? { id: idRef.current } : {})}
        class={inputClasses}
        disabled={!enabled}
        onChange={storeValue}
      />
    </>
  );
}
