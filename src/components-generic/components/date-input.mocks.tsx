/**
 * @module date-input.mocks
 * @description Hosts all mocks for unit testing of this component.
 * All exported object constants MUST be frozen to ensure immutability.
 * @version 1.0.0
 */

//  Correct value output
export const valueInput1: number = 1706572800000;
export const valueOutput1: string = '2024-01-30';
export const valueOutput2: string = '2024-01-31';
export const invalidValues: any[] = [
  '1706572800000',
  'invalid-date',
  Infinity,
  -Infinity,
  NaN,
  false,
  undefined,
  null,
];

//  Custom ID assignment
export const customId: string = 'testID';

//  Custom className assignment
export const customClassInput: string = 'test-class';
export const customClassOutputLabel: string = 'test-class__label';
export const customClassOutputInput: string = 'test-class__input';

//  Correct label assignment
export const customLabel: string = 'Test label:';

//  Correct styling
export const inheritStyle: string = '--bg-color: 255, 0, 0;';
export const inheritedColor: string = 'red';

//  Freeze constant objects
Object.freeze(invalidValues);
