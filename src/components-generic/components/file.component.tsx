//  Custom component CSS
import '../styles/style.css';

//  External dependencies
import { useRef } from 'preact/compat';

//  Internal dependencies
import * as c from '../services/constants.service';
import * as u from '../services/utilities.service';

/**
 * @module file.component
 * @description Enables creating file-select buttons for forms.
 * Included features:
 * -  customizable class names,
 * -  dynamic button text,
 * -  hidden input control to allow custom styling.
 * @param value Hook to value displayed in component.
 * @oaram action Operation when button is clicked.
 * @param id Custom ID to override randomly generated.
 * @param name Name for submit function.
 * @param className Custom class list to attach to component
 * @param enabled Relay standard HTML attribute.
 * @version 1.0.0
 */
export const File = ({
  value,
  action,
  id = '',
  name = '',
  className = '',
  enabled = true,
}: {
  value: string;
  action: (e: Event) => void;
  id?: string;
  name?: string;
  className?: string;
  enabled?: boolean;
}) => {
  //  Ensure element has valid static ID
  const idRef = useRef(u.generateElementId(id));

  //  Generate class strings
  const buttonClasses = useRef(
    u.generateInputClasses(c.CLASS_TYPES.CLASS_BUTTON, className)
  );

  return (
    <>
      <label htmlFor={idRef.current} class={buttonClasses.current}>
        {value}
      </label>
      <input
        type="file"
        id={idRef.current}
        {...(name ? { name: name } : {})}
        style={'display:none'}
        disabled={!enabled}
        onChange={action}
      />
    </>
  );
};
