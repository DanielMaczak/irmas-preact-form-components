//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { Ref } from 'preact';
import { ForwardedRef, forwardRef, useRef } from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';

//  Key press identifiers as UTF-16 decimal codes
const KEYS_ALLOWED: number[] = [
  48, // 0
  49, // 1...
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57, // 9
  46, // .
  45, // -
].sort();

/**
 * @module num-input.component
 * @description Enables creating customizable number-only input components.
 * To disable entering numbers outside min/max range, give only min and/or max.
 * To apply styling to values outside min/max range, give also invalidCLassName.
 * Value is stored on valid numeric input.
 * Included features:
 * -  protects from entering values that are not number,
 * -  minimum/maximum values with soft and hard enforcement,
 * -  protection from going outside safe INT limits,
 * -  customizable class names,
 * -  state management for input values,
 * -  optional associated label.
 * @param value Hook to value displayed in component.
 * @param setValue Hook to change internal value storage.
 * @param id Custom ID to override randomly generated.
 * @param name Name for submit function.
 * @param className Custom class list to attach to component.
 * @param label Text to display in label (otherwise is omitted).
 * @param enabled Relay standard HTML attribute.
 * @param min Limit lowest value user can enter.
 * @param max Limit highest value user can enter.
 * @param invalidCLassName Class applied when user enters value outside min-max.
 * @param ref Forward ref to input element passed from parent.
 * @version 1.0.0
 */
export const NumInput = (
  {
    value,
    setValue,
    id = '',
    name = '',
    className = '',
    label = '',
    enabled = true,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    invalidClassName = '',
  }: {
    value: number;
    setValue: (value: number) => void;
    id?: string;
    name?: string;
    className?: string;
    label?: string;
    enabled?: boolean;
    min?: number;
    max?: number;
    invalidClassName?: string;
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
    u.generateInputClasses(c.CLASS_TYPES.CLASS_INPUT, c.CLASS_NUM, className)
  );

  //  Ensure value is within min-max
  const limitedValue: number = Math.max(min, Math.min(max, value));
  limitedValue !== value && setValue(limitedValue);

  /**
   * @description Filters input to allow only values related to numbers,
   * including single decimal point and negative sign.
   * Does not access element itself for maximum efficiency,
   * this is intended to be handled by storeValue only if passed through here.
   * @param e Keyboard event to be filtered.
   */
  const filterNumeric = (e: KeyboardEvent): void => {
    //  Let through non-character keys
    if (e.key.length > 1) return;
    //  Prevent non-numeric
    if (!KEYS_ALLOWED.includes(e.key.charCodeAt(0))) {
      e.preventDefault();
      return;
    }
    //  Prevent second decimal point and dash
    if (e.key.charCodeAt(0) > 47) return; // number
    const valueAsString: string = String(value);
    if (
      (e.key === '.' && valueAsString.includes('.')) ||
      (e.key === '-' && valueAsString.includes('-'))
    ) {
      e.preventDefault();
      return;
    }
  };

  /**
   * @description Secondary check for non-numeric value made of numeric chars.
   * Non-numeric values are caught and reversed to last valid value;
   * this is expensive operation so is only executed on rare cases
   * when minus sign is placed between numbers (dummy user! :).
   * Conversion to number was chosen over parseFloat
   * as parse is less precise in identifying wrong numbers.
   * @param e Number input change event.
   */
  const convertToNumber = (e: Event): void => {
    //  Access element
    if (!(e.currentTarget instanceof HTMLInputElement)) return;
    const input: HTMLInputElement = e.currentTarget;
    //  Allow temporary semi-numeric values
    if (input.value === '' || input.value === '-') return;
    //  Test for wrong number made of allowed characters
    let newValue: number = Number(input.value);
    if (Number.isNaN(newValue)) {
      const cursorPosition: number = (input.selectionStart ?? 1) - 1;
      input.value = String(value);
      input.selectionStart = cursorPosition;
      input.selectionEnd = cursorPosition;
      return;
    }
  };

  /**
   * @description Stores number into state when user leaves control.
   * Applies min-max boundaries before value is stored.
   * @param e Number input change event.
   */
  const storeValue = (e: Event): void => {
    //  Access element
    if (!(e.currentTarget instanceof HTMLInputElement)) return;
    const input: HTMLInputElement = e.currentTarget;
    //  Secondary check if user leaves only semi-numeric value
    let value: number = Number(input.value);
    if (Number.isNaN(value)) value = 0;
    //  Test against min-max
    const applyMinMax = (minMax: number): void => {
      //  Ensure we never leave safe INT range
      if (value > Number.MAX_SAFE_INTEGER) {
        value = Number.MAX_SAFE_INTEGER;
        input.value = String(value);
      } else if (value < Number.MIN_SAFE_INTEGER) {
        value = Number.MIN_SAFE_INTEGER;
        input.value = String(value);
        //  Then, if we are, apply local min/max
      } else if (!invalidClassName) {
        value = minMax;
        input.value = String(value);
      }
      //  Apply formatting
      if (invalidClassName) {
        input.classList.add(invalidClassName);
      }
    };
    if (value < min) {
      applyMinMax(min);
    } else if (value > max) {
      applyMinMax(max);
    } else if (invalidClassName) {
      input.classList.remove(invalidClassName);
    }
    //  Store new value
    setValue(value);
  };

  return (
    <>
      {label && (
        <label htmlFor={idRef.current} class={labelClasses.current}>
          {label}
        </label>
      )}
      <input
        type="text" // prevent nonsensical behavior on number input
        value={value}
        {...(idRef.current ? { id: idRef.current } : {})}
        {...(name ? { name: name } : {})}
        class={inputClasses.current}
        disabled={!enabled}
        min={min}
        max={max}
        onKeyDown={filterNumeric}
        onInput={convertToNumber}
        onBlur={storeValue}
        inputMode="decimal" // support for phones
        ref={ref as Ref<HTMLInputElement>}
      />
    </>
  );
};

/**
 * @description Provides forwarded reference to internal input component.
 * Intended for use with Replace Input component.
 */
export const NumInputRef = forwardRef(NumInput);
