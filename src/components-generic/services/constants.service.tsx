/**
 * @module constants.service
 * @description Hosts general-purpose constants of this project.
 * All exported object constants MUST be frozen to ensure immutability.
 * @version 1.0.0
 */

//  CSS identifiers
export enum CLASS_TYPES {
  CLASS_INPUT = `__input`, // control (inputs)
  CLASS_LABEL = `__label`, // label
  CLASS_OPTION = `__option`, // individual dropdown options
  CLASS_LIST = `__list`, // dropdown options container
  CLASS_ARROW = `__arrow`, // dropdown arrow icon
  CLASS_FIELDSET = `__fieldset`, // grouping into ReplaceInput
}
export const CLASS_TEXTINPUT: string = 'text-input';
export const CLASS_TEXTSINGLE: string = 'text-single'; // single-line
export const CLASS_TEXTMULTI: string = 'text-multi'; // multi-line
export const CLASS_NUMINPUT: string = 'num-input';
