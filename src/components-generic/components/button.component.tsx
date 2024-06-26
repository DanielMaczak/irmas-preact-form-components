//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { useRef, useState } from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';
import { ComponentChildren } from 'preact';

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
 * @param id Custom ID to override randomly generated.
 * @param name Name for submit function.
 * @param className Custom class list to attach to component
 * @param enabled Relay standard HTML attribute.
 * @param singleClick Makes button permanently inactive after first click.
 * @param inactiveAfterClickFor Makes button inactive for X ms after each click.
 * @param inactiveValue Displayed text during inactive period.
 * @param children Displays passed children inside button.
 * @version 1.0.0
 */
export const Button = ({
  value,
  action,
  id = '',
  name = '',
  className = '',
  enabled = true,
  singleClick = false,
  inactiveAfterClickFor = 0,
  inactiveValue = '',
  children,
}: {
  value: string;
  action: () => void;
  id?: string;
  name?: string;
  className?: string;
  enabled?: boolean;
  singleClick?: boolean;
  inactiveAfterClickFor?: number;
  inactiveValue?: string;
  children?: ComponentChildren;
}) => {
  //  State hooks
  const [isActive, activate] = useState<boolean>(true);

  //  Ensure element has valid static ID
  const idRef = useRef(id ? u.generateElementId(id) : undefined);

  //  Generate class strings
  const buttonClasses = useRef(
    u.generateInputClasses(c.CLASS_TYPES.CLASS_BUTTON, className)
  );

  /**
   * @description Assigns handler based on component props:
   * -  singleClick: can be triggered only once,
   * -  inactiveAfterCLickFor: checks time since last click,
   * -  else: handles every click regardless.
   * This way ensures needless checks won't run on every click.
   */
  const getClickAction = (): (() => void) => {
    const runClickActions = (): void => {
      action();
    };
    const handleInactiveAfterClick = (): void => {
      if (isActive) {
        runClickActions();
        activate(false);
        setTimeout(() => activate(true), inactiveAfterClickFor);
      }
    };
    const handleSingleClick = (): void => {
      if (isActive) {
        runClickActions();
        activate(false);
      }
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
      {...(idRef.current ? { id: idRef.current } : {})}
      {...(name ? { name: name } : {})}
      class={buttonClasses.current}
      disabled={!isActive || !enabled}
      onClick={getClickAction()}
    >
      {children}
      {isActive ? value : inactiveValue || value}
    </button>
  );
};
