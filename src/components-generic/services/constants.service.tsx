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
  CLASS_BUTTON = `__button`, // button
  CLASS_FIELDSET = `__fieldset`, // grouping into ReplaceInput
}
export const CLASS_GENERIC: string = 'irmaspfc'; // assigned to all components
export const CLASS_TEXT: string = CLASS_GENERIC + '__text';
export const CLASS_TEXTSINGLE: string = CLASS_GENERIC + '__text-single'; // single-line
export const CLASS_TEXTMULTI: string = CLASS_GENERIC + '__text-multi'; // multi-line
export const CLASS_NUM: string = CLASS_GENERIC + '__num';
export const CLASS_DROPDOWN: string = CLASS_GENERIC + '__dropdown';
export const CLASS_SWITCH: string = CLASS_GENERIC + '__switch';

//  Text capitalization options
export enum CAPS_OPTIONS {
  NONE, // keep at 0 === false
  CHARS,
  WORDS,
  SENTENCES,
}
