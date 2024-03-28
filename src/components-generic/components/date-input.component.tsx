//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { Ref } from 'preact';
import { ForwardedRef, forwardRef, useMemo, ChangeEvent } from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';

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
 * @param value Hook to value displayed in component.
 * @param setValue Hook to change internal value storage.
 * @param id Custom ID to override randomly generated.
 * @param className Custom class list to attach to component.
 * @param label Text to display in label (otherwise is omitted).
 * @param enabled Relay standard HTML attribute.
 * @param ref Forward ref to input element passed from parent.
 * @version 1.0.0
 */
export const DateInput = forwardRef(function DateInput(
  {
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
  },
  ref: ForwardedRef<HTMLElement>
) {
  /**
   * @description Stores date value into state when changed.
   * @param e Date input change event.
   */
  const storeValue = (e: ChangeEvent): void => {
    if (!enabled) return;
    if (!(e.currentTarget instanceof HTMLInputElement)) return;
    const newValue: number = new Date(e.currentTarget.value).valueOf();
    if (isNaN(newValue) || value === newValue) return;
    setValue(newValue);
  };

  //  Ensure element has valid static ID
  const idRef = useMemo(
    () => (id || label ? u.generateElementId(id) : undefined),
    [id, label]
  );

  //  Generate class strings
  const labelClasses = useMemo(
    () => u.generateInputClasses(c.CLASS_TYPES.CLASS_LABEL, className),
    [className]
  );
  const inputClasses = useMemo(
    () => u.generateInputClasses(c.CLASS_TYPES.CLASS_INPUT, className),
    [className]
  );

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
          typeof value === 'number' && Number.isFinite(value)
            ? new Date(value).toISOString().slice(0, 10)
            : undefined
        }
        {...(idRef ? { id: idRef.current } : {})}
        class={inputClasses}
        disabled={!enabled}
        onChange={storeValue}
        ref={ref as Ref<HTMLInputElement>}
      />
    </>
  );
});
