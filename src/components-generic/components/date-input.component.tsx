//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { Ref } from 'preact';
import { ForwardedRef, forwardRef, ChangeEvent } from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';

/**
 * @description Converts time in standard JS number of ms
 * into date format required by date input control (YYYY-MM-DD).
 * @param value Time in number form.
 * @returns Date in string or undefined if conversion fails.
 */
const getDateString = (value: number): string | undefined => {
  return typeof value === 'number' && Number.isFinite(value)
    ? new Date(value).toISOString().slice(0, 10)
    : undefined;
};

/**
 * @module date-input.component
 * @description Enables creating customizable date input components.
 * Expects date via value parameter to be given as number in ms.
 * Value is stored on valid date input.
 * Included features:
 * -  customizable class names,
 * -  state management for input values,
 * -  optional associated label,
 * -  invalid input protection,
 * -  minimum/maximum date.
 * @param value Hook to value displayed in component.
 * @param setValue Hook to change internal value storage.
 * @param id Custom ID to override randomly generated.
 * @param className Custom class list to attach to component.
 * @param label Text to display in label (otherwise is omitted).
 * @param enabled Relay standard HTML attribute.
 * @param min Limits date picker and date input to consecutive dates.
 * @param max Limits date picker and date input to previous dates.
 * @param ref Forward ref to input element passed from parent.
 * @version 1.0.0
 */
export const DateInput = (
  {
    value,
    setValue,
    id = '',
    className = '',
    label = '',
    enabled = true,
    min = 0,
    max = 253402214400000, // 9999-12-31
  }: {
    value: number;
    setValue: (value: number) => void;
    id?: string;
    className?: string;
    label?: string;
    enabled?: boolean;
    min?: number;
    max?: number;
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
    className
  );

  //  Ensure value is within min-max
  const limitedValue: number = Math.max(min, Math.min(max, value));
  limitedValue !== value && setValue(limitedValue);

  /**
   * @description Stores date value into state when changed.
   * Applies min and max before saving.
   * @param e Date input change event.
   */
  const storeValue = (e: ChangeEvent): void => {
    if (!enabled) return;
    if (!(e.currentTarget instanceof HTMLInputElement)) return;
    //  Convert to number
    const newValue: number = new Date(e.currentTarget.value).valueOf();
    if (isNaN(newValue) || value === newValue) return;
    //  Limit to min-max
    const limitedValue: number = Math.max(min, Math.min(max, newValue));
    const stringValue: string | undefined = getDateString(limitedValue);
    if (!stringValue) return;
    //  Store final value
    e.currentTarget.value = stringValue;
    setValue(limitedValue);
  };

  return (
    <>
      {label && (
        <label htmlFor={idRef?.current} class={labelClasses.current}>
          {label}
        </label>
      )}
      <input
        type="date"
        value={getDateString(value)}
        min={getDateString(min)}
        max={getDateString(max)}
        {...(idRef ? { id: idRef.current } : {})}
        class={inputClasses.current}
        disabled={!enabled}
        onChange={storeValue}
        ref={ref as Ref<HTMLInputElement>}
      />
    </>
  );
};

/**
 * @description Provides forwarded reference to internal input component.
 * Intended for use with Replace Input component.
 */
export const DateInputRef = forwardRef(DateInput);
