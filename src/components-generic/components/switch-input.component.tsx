//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { Ref } from 'preact';
import { ForwardedRef, forwardRef, useRef } from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';
import * as t from '../services/types.service';

/**
 * @module switch-input.component
 * @description Enables creating switch control composed of labels.
 * Selected option is highlighted via label background.
 * Uses HTML+CSS mechanisms to visualize selected option.
 * Allows multi-select if value is passed as Set.
 * Value is stored on clicking it.
 * Included features:
 * -  allows single-selection from provided options,
 * -  allows multi-selection from provided options,
 * -  customizable class names,
 * -  state management for input values,
 * -  optional associated label.
 * @param value Hook to ID(s) of value(s) selected in component.
 * @param setValue Hook to change internal value (option ID) storage.
 * @param options List of options and associated IDs.
 * @param id Custom {HTML} ID to override randomly generated.
 * @param name Name for submit function.
 * @param className Custom class list to attach to component.
 * @param label Text to display in label (otherwise is omitted).
 * @param enabled Relay standard HTML attribute.
 * @param ref Forward ref to input element passed from parent.
 * @version 1.0.0
 */
export const SwitchInput = (
  {
    value,
    setValue,
    options,
    id = '',
    name = '',
    className = '',
    label = '',
    enabled = true,
  }: {
    value: string | Set<string>;
    setValue: (value: string | Set<string>) => void;
    options: t.Option[];
    id?: string;
    name?: string;
    className?: string;
    label?: string;
    enabled?: boolean;
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
    u.generateInputClasses(c.CLASS_TYPES.CLASS_INPUT, c.CLASS_SWITCH, className)
  );
  const optionClasses = useRef(
    u.generateInputClasses(c.CLASS_TYPES.CLASS_OPTION, className)
  );

  //  Determine switch type
  const isMultiSwitch = typeof value != 'string';

  /**
   * @description Extracts selected option from interacting element.
   * Stores option into state when changed.
   * @param e Mouse click event.
   */
  const storeValue = (e: MouseEvent): void => {
    if (!enabled) return;
    if (!(e.currentTarget instanceof HTMLInputElement)) return;
    //  Extract option
    const input: HTMLInputElement = e.currentTarget;
    const id: string = String(input.dataset['id']);
    const option: t.Option | undefined = options.find(
      option => option.id === id
    );
    //  Store final value
    if (option) {
      if (isMultiSwitch) {
        const newValue: Set<string> = new Set(value);
        newValue.delete(option.id) || newValue.add(option.id);
        setValue(newValue);
      } else {
        setValue(option.id);
      }
    }
  };

  return (
    <>
      {label && (
        <label htmlFor={idRef.current} class={labelClasses.current}>
          {label}
        </label>
      )}
      <fieldset
        {...(idRef.current ? { id: idRef.current } : {})}
        {...(name ? { name: name } : {})}
        class={inputClasses.current}
        ref={ref as Ref<HTMLFieldSetElement>}
      >
        {options.map(option => (
          <label class={optionClasses.current}>
            <input
              type={isMultiSwitch ? 'checkbox' : 'radio'}
              disabled={!enabled}
              data-id={option.id}
              onClick={storeValue}
              {...((isMultiSwitch ? value.has(option.id) : value === option.id)
                ? { checked: true }
                : {})}
            />
            {option.value}
          </label>
        ))}
      </fieldset>
    </>
  );
};

/**
 * @description Provides forwarded reference to internal input component.
 * Intended for use with Replace Input component.
 */
export const SwitchInputRef = forwardRef(SwitchInput);
