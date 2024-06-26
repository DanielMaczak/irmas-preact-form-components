//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { Ref } from 'preact';
import { ForwardedRef, forwardRef, useRef } from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';

//  Internal constants
const MIN_DATE: number = 0;
const MAX_DATE: number = 253402214400000; // 9999-12-31

/**
 * @description Converts time in standard JS number of ms
 * into date format required by date input control (YYYY-MM-DD).
 * @param value Time in number form.
 * @returns Date in string.
 */
const getDateString = (value: number): string => {
  return new Date(value).toISOString().slice(0, 10);
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
 * @param name Name for submit function.
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
    name = '',
    className = '',
    label = '',
    enabled = true,
    min = MIN_DATE,
    max = MAX_DATE,
  }: {
    value: number | null;
    setValue: (value: number | null) => void;
    id?: string;
    name?: string;
    className?: string;
    label?: string;
    enabled?: boolean;
    min?: number;
    max?: number;
  },
  ref: ForwardedRef<HTMLElement>
) => {
  //  Ensure element has valid static ID
  const idRef = useRef(id || label ? u.generateElementId(id) : undefined);

  //  Generate class strings
  const labelClasses = useRef(
    u.generateInputClasses(c.CLASS_TYPES.CLASS_LABEL, className)
  );
  const inputClasses = useRef(
    u.generateInputClasses(c.CLASS_TYPES.CLASS_INPUT, className)
  );

  //  Ensure value is within valid min-max
  if (!Number.isFinite(min)) min = MIN_DATE;
  if (!Number.isFinite(max)) max = MAX_DATE;
  min > max && (max = MAX_DATE) && (min = MIN_DATE); // MIN_DATE = false
  if (value !== null && Number.isFinite(value)) {
    const limitedValue: number = Math.max(min, Math.min(max, value));
    limitedValue !== value && setValue(limitedValue);
  }

  /**
   * @description Stores date value into state when changed.
   * Applies min and max before saving.
   * @param e Date input change event.
   */
  const storeValue = (e: Event): void => {
    if (!enabled) return;
    if (e.currentTarget instanceof HTMLInputElement) {
      //  Check for null case
      if (e.currentTarget.value === '') {
        setValue(null);
        return;
      }
      //  Convert to number
      const newValue: number = new Date(e.currentTarget.value).valueOf();
      if (Number.isNaN(newValue) || value === newValue) return;
      //  Limit to min-max
      const limitedValue: number = Math.max(min, Math.min(max, newValue));
      const stringValue: string = getDateString(limitedValue);
      //  Store final value
      e.currentTarget.value = stringValue;
      setValue(limitedValue);
    }
  };

  return (
    <>
      {label && (
        <label htmlFor={idRef.current} class={labelClasses.current}>
          {label}
        </label>
      )}
      <input
        type="date"
        value={
          value !== null && Number.isFinite(value) ? getDateString(value) : ''
        }
        min={getDateString(min)}
        max={getDateString(max)}
        {...(idRef.current ? { id: idRef.current } : {})}
        {...(name ? { name: name } : {})}
        class={inputClasses.current}
        disabled={!enabled}
        onInput={storeValue}
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
