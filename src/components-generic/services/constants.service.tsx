/**
 * @module constants.service
 * @description Hosts general-purpose constants of this project.
 * All exported object constants MUST be frozen to ensure immutability.
 * @version 1.0.0
 */

//  CSS identifiers
export enum CLASS_TYPES {
  CLASS_INPUT = `__input`, // version for controls (inputs)
  CLASS_LABEL = `__label`, // version for labels
  CLASS_FIELDSET = `__fieldset`, // for fieldset group control
}
export const CLASS_TEXTINPUT: string = 'text-input';
export const CLASS_TEXTSINGLE: string = 'text-single'; // single-line version
export const CLASS_TEXTMULTI: string = 'text-multi'; // multi-line
export const CLASS_NUMINPUT: string = 'num-input';
