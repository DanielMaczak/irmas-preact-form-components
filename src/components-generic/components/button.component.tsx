//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { Ref } from 'preact';
import { ForwardedRef, forwardRef } from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';

/**
 * @module button.component
 * @description Enables creating buttons for forms.
 * To allow user submit form only once,
 * mark selected inputs as required and set singleClick = true;
 * optionally, use setValue to change button text after first click.
 * Does not trigger submit.
 * Included features:
 * -  can be set to trigger action only once.
 * -  can be set to allow click only once in X ms.
 * -  customizable class names,
 * -  dynamic button text.
 * @param value Hook to value displayed in component.
 * @oaram action Operation when button is clicked.
 * @param setValue Hook to change internal value storage.
 * @param id Custom ID to override randomly generated.
 * @param className Custom class list to attach to component
 * @param enabled Relay standard HTML attribute.
 * @param singleClick True if button can be clicked only once.
 * @param inactiveAfterClickFor Makes button inactive for X ms after each click.
 * @param ref Forward ref to input element passed from parent.
 * @version 1.0.0
 */
export const Button = forwardRef(function Button(
  {
    value,
    action,
    setValue,
    id = '',
    className = '',
    enabled = true,
    singleClick = false,
    inactiveAfterClickFor = 0,
  }: {
    value: string;
    action: () => void;
    setValue?: () => void;
    id?: string;
    className?: string;
    enabled?: boolean;
    singleClick?: boolean;
    inactiveAfterClickFor?: number;
  },
  ref: ForwardedRef<HTMLElement>
) {
  //  Ensure element has valid static ID
  const idRef = id ? u.generateElementId(id) : undefined;

  //  Generate class strings
  const buttonClasses = u.generateInputClasses(
    c.CLASS_TYPES.CLASS_BUTTON,
    className
  );

  /**
   * @description Assigns handler based on component props:
   * -  singleClick: can be triggered only once,
   * -  inactiveAfterCLickFor: checks time since last click,
   * -  else: handles every click regardless.
   * This way ensures needless checks won't run on every click.
   */
  const getClickAction = (): (() => void) => {
    let lastClicked: number = 0;
    const runClickActions = (): void => {
      action();
      setValue !== undefined && setValue();
      lastClicked = Date.now();
    };
    const handleInactiveAfterClick = (): void => {
      if (Date.now() - lastClicked >= inactiveAfterClickFor) runClickActions();
    };
    const handleSingleClick = (): void => {
      if (!lastClicked) runClickActions();
    };
    return singleClick
      ? handleSingleClick
      : inactiveAfterClickFor
      ? handleInactiveAfterClick
      : runClickActions;
  };

  return (
    <button
      type="button"
      {...(idRef ? { id: idRef.current } : {})}
      class={buttonClasses.current}
      disabled={!enabled}
      onClick={getClickAction()}
      ref={ref as Ref<HTMLButtonElement>}
    >
      {value}
    </button>
  );
});
