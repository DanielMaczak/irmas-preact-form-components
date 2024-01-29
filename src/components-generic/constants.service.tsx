/**
 * @module constants.service
 * @description Hosts general-purpose constants of this project,
 * and provides following utilities for generating constant values:
 * -  CSS classes are generated for input or label elements
 *    with mandatory base class integrated by default.
 * -  Unique element IDs are returned as reference to ensure they don't change.
 * All exported object constants MUST be frozen to ensure immutability.
 * @version 1.0.0
 */

//  External dependencies
import { MutableRef, useRef } from 'preact/hooks';

//  CSS identifiers
const CLASS_GENERIC: string = 'irmaspfc'; // assigned to all components
const CLASS_INPUT: string = `__input`; // version for controls (inputs)
const CLASS_LABEL: string = `__label`; // version for labels
export const CLASS_TEXTINPUT: string = 'text-input';
export const CLASS_TEXTSINGLE: string = 'text-single'; // single-line version
export const CLASS_TEXTMULTI: string = 'text-multi'; // multi-line
export const CLASS_NUMINPUT: string = 'num-input';

//  ID storage
const ELEM_ID_LEN: number = 8;
const generatedIds: Set<string> = new Set();

/**
 * @description Generates CSS classes for input or label elements.
 * Mandatory base class is integrated by default.
 * @param classType - Type of class to generate, either 'input' or 'label'.
 * @param requestedClasses - Additional classes to append to the base class.
 * @returns Concatenated string of CSS classes.
 */
export const generateInputClasses = (
  classType: 'input' | 'label',
  ...requestedClasses: string[]
): string => {
  const suffix = classType === 'input' ? CLASS_INPUT : CLASS_LABEL;
  let classList = CLASS_GENERIC + suffix; // minimum required return
  for (let requestedClass of requestedClasses) {
    if (requestedClass) classList += ' ' + requestedClass + suffix;
  }
  return classList;
};

/**
 * @description Generates reference of element ID.
 * If no ID is provided, generates one using current date and random number.
 * Ensures that generated ID is not already in use
 * and is guaranteed to reach 8 characters.
 * @param id - ID provided by user, used without adjustment if given.
 * @returns Mutable reference object containing unique element ID.
 */
export const generateElementId = (id: string): MutableRef<string> => {
  //  If ID given by user, reference it without adjustment
  if (id) return useRef(id);
  //  Generate custom unique ID
  const getRandomId = (): string => {
    const now: number = Date.now();
    return (now * (1 - Math.random())) // 0 <= Math.random() < 1
      .toString(36) // turn to ASCII chars
      .padStart(ELEM_ID_LEN, now.toString()) // ensure desired length
      .slice(-ELEM_ID_LEN); // take most variable 8 chars
  };
  let randomId: string = getRandomId();
  while (!randomId || generatedIds.has(randomId)) randomId = getRandomId();
  generatedIds.add(randomId); // remember new ID
  return useRef(CLASS_GENERIC + '__' + randomId);
};
