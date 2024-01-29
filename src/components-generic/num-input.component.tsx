//  Custom component CSS
import './style.css';

//  Internal dependencies
import * as c from './constants.service';

//  Key press identifiers
const KEYS_ALLOWED: string[] = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
  '-',
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
 * @version 1.0.0
 */
export function NumInput({
  value,
  setValue,
  id = '',
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
  className?: string;
  label?: string;
  enabled?: boolean;
  min?: number;
  max?: number;
  invalidClassName?: string;
}) {
  /**
   * @description Filters input to allow only values related to numbers,
   * including single decimal point and negative sign.
   * Does not access element itself for maximum efficiency,
   * this is intended to be handled by storeValue only if passed through here.
   * @param e - Keyboard event to be filtered.
   */
  const filterNumeric = (e: KeyboardEvent): void => {
    //  Let through non-character keys
    if (e.key.length > 1) return;
    //  Prevent non-numeric
    if (!KEYS_ALLOWED.includes(e.key)) {
      e.preventDefault();
      return;
    }
    //  Prevent second decimal point and dash
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
   * @description Stores number into state on input change.
   * Non-numeric values are caught and reversed to last valid value;
   * this is expensive operation so is only executed on rare cases
   * when minus sign is placed between numbers (dummy user! :).
   * Conversion to number was chosen over parseFloat
   * as parse is less precise in identifying wrong numbers.
   * @param e - Number input change event.
   */
  const storeValue = (e: InputEvent): void => {
    //  Access element
    if (!(e.currentTarget instanceof HTMLInputElement)) return;
    const elem: HTMLInputElement = e.currentTarget;
    //  Allow temporary semi-numeric values
    if (elem.value === '' || elem.value === '-') {
      setValue(0);
      return;
    }
    //  Test for wrong number made of allowed characters
    let newValue: number = Number(elem.value);
    if (isNaN(newValue)) {
      const cursorPosition: number = (elem.selectionStart ?? 1) - 1;
      elem.value = String(value);
      elem.selectionStart = cursorPosition;
      elem.selectionEnd = cursorPosition;
      return;
    }
    //  Test against min-max
    const applyMinMax = (minMax: number) => {
      //  Ensure we never leave safe INT range
      if (newValue > Number.MAX_SAFE_INTEGER) {
        newValue = Number.MAX_SAFE_INTEGER;
        elem.value = String(newValue);
      } else if (newValue < Number.MIN_SAFE_INTEGER) {
        newValue = Number.MIN_SAFE_INTEGER;
        elem.value = String(newValue);
        //  Then, if we are, apply local min/max
      } else if (!invalidClassName) {
        newValue = minMax;
        elem.value = String(newValue);
      }
      //  Apply formatting
      if (invalidClassName) {
        elem.classList.add(invalidClassName);
      }
    };
    if (newValue < min) {
      applyMinMax(min);
    } else if (newValue > max) {
      applyMinMax(max);
    } else if (invalidClassName) {
      elem.classList.remove(invalidClassName);
    }
    //  Store new value
    setValue(newValue);
  };

  //  Ensure element has valid static ID
  const idRef = c.generateElementId(id);

  //  Generate class strings
  const labelClasses = c.generateInputClasses('label', className);
  const inputClasses = c.generateInputClasses(
    'input',
    className,
    c.CLASS_NUMINPUT
  );

  return (
    <>
      {label && (
        <label htmlFor={idRef.current} class={labelClasses}>
          {label}
        </label>
      )}
      <input
        type="text" // prevent nonsensical behavior on number input
        value={value}
        id={idRef.current}
        class={inputClasses}
        disabled={!enabled}
        min={min}
        max={max}
        onKeyDown={filterNumeric}
        onInput={storeValue}
        inputmode="decimal" // support for phones
      />
    </>
  );
}
