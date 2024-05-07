/**
 * @module date-input.mocks
 * @description Hosts all mocks for unit testing of this component.
 * All exported object constants MUST be frozen to ensure immutability.
 * @version 1.0.0
 */

//  Correct value output
export const value1Date: string = '2024-01-30';
export const value2Date: string = '2024-01-31';
export const invalidValues: any[] = [
  '1706572800000',
  'invalid-date',
  {},
  { testProp: 'testValue' },
  [],
  ['testValue'],
  Infinity,
  -Infinity,
  NaN,
  false,
  undefined,
  null,
];

//  ID assignment
export const customId: string = 'testID';

//  Name assignment
export const customName: string = 'test-name';

//  ClassName assignment
export const defaultClassInput: string = 'irmaspfc__input';
export const customClassInput: string = 'test-class';
export const customClassOutputLabel: string = 'test-class__label';
export const customClassOutputInput: string = 'test-class__input';

//  Label assignment
export const customLabel: string = 'Test label:';

//  Min-max
//  - basic test
export const defaultMinDate: string = '1970-01-01'; // 0
export const defaultMaxDate: string = '9999-12-31';
export const beforeDefaultMinDate: string = '1969-12-31';
export const afterDefaultMaxDate: string = '10000-01-01';
//  - custom range test
export const customRanges = [
  { minDate: '2024-02-01', maxDate: '2024-02-02', expected: '2024-02-01' },
  { minDate: '2024-01-01', maxDate: '2024-01-02', expected: '2024-01-02' },
];
//  - min > max
export const greaterMinDate: string = '2024-02-01';
export const smallerMaxDate: string = '2024-01-02';

//  Freeze constant objects
Object.freeze(invalidValues);
Object.freeze(customRanges);
