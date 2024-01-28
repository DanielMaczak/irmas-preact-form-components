//  Custom component CSS
import './num-input.component.css';

//  CSS identifiers
const COMP_NAME: string = 'num-input';
const COMP_INPUT: string = `${COMP_NAME}__input`;
const COMP_LABEL: string = `${COMP_NAME}__label`;

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
 * Included features:
 *    protects from entering values that are not number,
 *    minimum/maximum values with soft and hard enforcement,
 *    customizable class names,
 *    state management for input values,
 *    optional associated label.
 * @version 1.0.0
 */
export function NumInput({
  value,
  setValue,
  id = `${COMP_NAME}__${(Math.random() * +new Date() + 1)
    .toString(36)
    .slice(-8)}`,
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
   * @description Composes class name for number-only input component.
   * Requires that component name is part of defaultClass.
   * @param defaultClassName - Default class name for element.
   * @returns Composed class name.
   */
  const composeClassName = (defaultClassName: string): string => {
    const customClassName: string = className
      ? defaultClassName.replace(COMP_NAME, className)
      : '';
    const completeClassName: string[] = [defaultClassName, customClassName];
    return completeClassName.join(' ').replace(/\s+/g, ' ').trim();
  };

  /**
   * @description Filters keyboard input to allow only numeric values,
   * including single decimal point and negative sign.
   * Does not access element for maximum efficiency,
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
    //  Test rare cases of wrong number
    let newValue: number = Number(elem.value);
    if (isNaN(newValue)) {
      const cursorPosition: number = (elem.selectionStart ?? 1) - 1;
      elem.value = String(value);
      elem.selectionStart = cursorPosition;
      elem.selectionEnd = cursorPosition;
      return;
    }
    //  Test against min-max
    if (newValue < min) {
      if (invalidClassName) {
        elem.classList.add(invalidClassName);
      } else {
        newValue = min;
        elem.value = String(newValue);
      }
    } else if (newValue > max) {
      if (invalidClassName) {
        elem.classList.add(invalidClassName);
      } else {
        newValue = max;
        elem.value = String(newValue);
      }
    } else if (invalidClassName) {
      elem.classList.remove(invalidClassName);
    }
    //  Store new value
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
        type="text" // prevent nonsensical behavior on number input
        value={value}
        id={id}
        class={composeClassName(COMP_INPUT)}
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
