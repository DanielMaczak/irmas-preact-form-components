/**
 * @module utilities.service
 * @description Hosts utility function (helpers) of this project.
 * All functions hosted here are intended to be reused across components.
 * @version 1.0.0
 */

//  External dependencies
import { MutableRef, useRef } from 'preact/hooks';

//  Internal dependencies
import * as c from './constants.service';

//  ID storage
const ELEM_ID_LEN: number = 8;
const generatedIds: Set<string> = new Set();

/**
 * @description Custom hook generating reference of CSS classes for elements.
 * Mandatory base class is integrated by default.
 * Also works with multiple classes given in single string.
 * @param classType Type of class to generate, either 'input' or 'label'.
 * @param requestedClasses Additional classes to append to the base class.
 * @returns Concatenated string of CSS classes.
 */
export const generateInputClasses = (
  classType:
    | c.CLASS_TYPES.CLASS_INPUT
    | c.CLASS_TYPES.CLASS_LABEL
    | c.CLASS_TYPES.CLASS_OPTION
    | c.CLASS_TYPES.CLASS_LIST
    | c.CLASS_TYPES.CLASS_ARROW
    | c.CLASS_TYPES.CLASS_FIELDSET,
  ...requestedClasses: string[]
): MutableRef<string> => {
  let classList = c.CLASS_GENERIC + classType; // minimum required return
  requestedClasses
    .join(' ')
    .split(' ')
    .forEach(className => {
      className && (classList += ' ' + className + classType);
    });
  return useRef(classList);
};

/**
 * @description Generates string of 8 random characters.
 * Resulting ID is almost guaranteed to be unique,
 * and is guaranteed to never be 0 or less than 8 characters.
 * @returns String of 8 random characters.
 */
const generateRandomId = (): string => {
  const now: number = Date.now();
  return (now * (1 - Math.random())) // 0 <= Math.random() < 1
    .toString(36) // turn to ASCII chars
    .padStart(ELEM_ID_LEN, now.toString()) // ensure desired length
    .slice(-ELEM_ID_LEN); // take most variable 8 chars
};

/**
 * @description Custom hook generating reference of element ID.
 * If no ID is provided, generates new ID that is guaranteed to be unique.
 * @param id ID provided by user, used without adjustment if given.
 * @returns Mutable reference object containing unique element ID.
 */
export const generateElementId = (id: string): MutableRef<string> => {
  if (id) return useRef(id);
  let randomId: string = generateRandomId();
  while (!randomId || generatedIds.has(randomId)) randomId = generateRandomId();
  generatedIds.add(randomId); // remember new ID
  return useRef(c.CLASS_GENERIC + '__' + randomId);
};
