//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { Ref } from 'preact';
import { ForwardedRef, forwardRef } from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';
import * as t from '../services/types.service';

const combineIds = (...ids: string[]) => {
  return ids.join('__');
};

/**
 * @module switch-input.component
 * @description Enables creating switch control with no radio buttons.
 * Selected option is highlighted via label background.
 * Uses HTML+CSS mechanisms to visualize selected option.
 * Value is stored on clicking it.
 * Included features:
 * -  allows single-selection from provided options,
 * -  customizable class names,
 * -  state management for input values,
 * -  optional associated label.
 * @param value Hook to value displayed in component.
 * @param setValue Hook to change internal value storage.
 * @param options List of options and associated IDs.
 * @param id Custom ID to override randomly generated.
 * @param className Custom class list to attach to component.
 * @param label Text to display in label (otherwise is omitted).
 * @param enabled Relay standard HTML attribute.
 * @param ref Forward ref to input element passed from parent.
 * @version 1.0.0
 */
export const SwitchInput = forwardRef(function SwitchInput(
  {
    value,
    setValue,
    options,
    id = '',
    className = '',
    label = '',
    enabled = true,
  }: {
    value: t.Option;
    setValue: (value: t.Option) => void;
    options: t.Option[];
    id?: string;
    className?: string;
    label?: string;
    enabled?: boolean;
  },
  ref: ForwardedRef<HTMLElement>
) {
  //  Ensure element has valid static ID
  const idRef = u.generateElementId(id);

  //  Generate class strings
  const labelClasses = u.generateInputClasses(
    c.CLASS_TYPES.CLASS_LABEL,
    className
  );
  const inputClasses = u.generateInputClasses(
    c.CLASS_TYPES.CLASS_INPUT,
    className
  );
  const optionClasses = u.generateInputClasses(
    c.CLASS_TYPES.CLASS_OPTION,
    className
  );

  /**
   * @description
   * @param e
   */
  const storeValue = (e: MouseEvent): void => {
    if (!enabled) return;
    if (!(e.currentTarget instanceof HTMLLabelElement)) return;
    //  Extract option
    const label: HTMLLabelElement = e.currentTarget;
    const id: string = String(label.dataset.id);
    const option: t.Option | undefined = options.find(
      option => option.id === id
    );
    //  Store final value
    option && setValue(option);
    console.log(option);
  };

  return (
    <>
      {label && (
        <label htmlFor={idRef.current} class={labelClasses.current}>
          {label}
        </label>
      )}
      <fieldset
        id={idRef.current}
        class={inputClasses.current}
        ref={ref as Ref<HTMLFieldSetElement>}
      >
        {options.map(option => (
          <>
            <input
              type="radio"
              id={combineIds(idRef.current, option.id)}
              disabled={!enabled}
              {...(value.id === option.id ? { checked: true } : {})}
            />
            <label
              data-id={option.id}
              htmlFor={combineIds(idRef.current, option.id)}
              class={optionClasses.current}
              onClick={storeValue}
            >
              {option.value}
            </label>
          </>
        ))}
      </fieldset>
    </>
  );
});
