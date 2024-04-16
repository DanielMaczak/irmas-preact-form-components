//  TODO: Has outline when focused (accessibility)
//  TODO: should inherit color from parent via --bg-color CSS variable
//  TODO: Add min-max tests

//  External dependencies
import {
  fireEvent,
  queryByDisplayValue,
  queryByLabelText,
  queryByText,
  render,
} from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'preact/hooks';

//  Internal dependencies
import { DateInput } from './date-input.component';
import * as m from './date-input.mocks';

/**
 * @description Encapsulates tested component with state.
 * Is intended to be the only gateway of tests to tested component.
 * @param (*) Mimicking the params of tested component.
 */
const TestedComponent = ({
  initialValue,
  mockSetValue,
  id,
  className,
  label,
  enabled,
  min,
  max,
}: {
  initialValue: any; // to allow tests on the Type
  mockSetValue?: (value: number) => void;
  id?: string;
  className?: string;
  label?: string;
  enabled?: boolean;
  min?: number;
  max?: number;
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <DateInput
      value={value}
      setValue={mockSetValue || setValue}
      {...(id ? { id: id } : {})}
      {...(className ? { className: className } : {})}
      {...(label ? { label: label } : {})}
      {...(enabled !== undefined ? { enabled: enabled } : {})}
      {...(min ? { min: min } : {})}
      {...(max ? { max: max } : {})}
    />
  );
};

/**
 * @module date-input.test
 * @description Covers full JS unit tests.
 * Currently is missing CSS unit tests.
 * All mocks are to be stored in standalone module.
 * @version 1.0.0
 */
describe('DateInput component', () => {
  it('should render correctly with default props', () => {
    //  Render the component
    const { container } = render(
      <TestedComponent initialValue={m.valueInput1} />
    );
    //  Search for input element
    const htmlInput: HTMLInputElement | null = queryByDisplayValue(
      container as HTMLElement,
      m.valueOutput1
    );
    //  Verify element state
    expect(htmlInput).not.toBeNull();
    expect(htmlInput?.id).toEqual('');
  });

  it('should render correctly with custom props', () => {
    //  Render the component
    const { container } = render(
      <TestedComponent
        initialValue={m.valueInput1}
        id={m.customId}
        className={m.customClassInput}
        label={m.customLabel}
        enabled={false}
      />
    );
    //  Search for input elements
    const htmlLabel = queryByText(container as HTMLElement, m.customLabel);
    const htmlInput: HTMLInputElement | null = queryByLabelText(
      container as HTMLElement,
      m.customLabel
    );
    //  Verify element state
    expect(htmlLabel).not.toBeNull();
    expect(htmlInput).not.toBeNull();
    expect(htmlInput?.value).toEqual(m.valueOutput1);
    expect(htmlInput?.id).toEqual(m.customId);
    expect(htmlLabel?.classList).toContain(m.customClassOutputLabel);
    expect(htmlInput?.classList).toContain(m.customClassOutputInput);
    expect(htmlInput?.getAttribute('disabled')).not.toBeNull();
  });

  it('should autogenerate ID for label if none provided', () => {
    //  Render the component
    const { container } = render(
      <TestedComponent initialValue={m.valueInput1} label={m.customLabel} />
    );
    //  Search for input elements
    const htmlLabel = queryByText(container as HTMLElement, m.customLabel);
    const htmlInput: HTMLInputElement | null = queryByLabelText(
      container as HTMLElement,
      m.customLabel
    );
    //  Verify element state
    expect(htmlLabel).not.toBeNull();
    expect(htmlInput).not.toBeNull();
    expect(htmlInput?.id).not.toEqual('');
    expect(htmlLabel?.getAttribute('for')).toEqual(htmlInput?.id);
  });

  it('should not render label if none requested', () => {
    //  Render the component
    const { container } = render(
      <TestedComponent initialValue={m.valueInput1} />
    );
    //  Search for label elements
    const htmlLabels: HTMLCollection = container.getElementsByTagName('label');
    //  Verify element state
    expect(htmlLabels.length).toEqual(0);
  });

  it('should render empty with invalid value prop', () => {
    for (let invalidValue of m.invalidValues) {
      //  Render the component
      const { container } = render(
        <TestedComponent initialValue={invalidValue} label={m.customLabel} />
      );
      //  Search for input element
      const htmlInput: HTMLInputElement | null = queryByLabelText(
        container as HTMLElement,
        m.customLabel
      );
      //  Verify element state
      expect(htmlInput).not.toBeNull();
      expect(htmlInput?.value).toEqual('');
    }
  });

  it('should update state only when date is changed', () => {
    //  Render the component
    const setValue = vi.fn();
    const { container } = render(
      <TestedComponent
        initialValue={m.valueInput1}
        mockSetValue={setValue}
        label={m.customLabel}
      />
    );
    //  Search for input element
    const htmlInput: HTMLInputElement | null = queryByLabelText(
      container as HTMLElement,
      m.customLabel
    );
    //  Verify element state
    expect(htmlInput).not.toBeNull();
    if (htmlInput) {
      fireEvent.input(htmlInput, { target: { value: m.valueOutput1 } });
      expect(setValue).not.toHaveBeenCalled();
      fireEvent.input(htmlInput, { target: { value: m.valueOutput2 } });
      expect(setValue).toHaveBeenCalledOnce();
    }
  });

  it('should not update state on invalid input', () => {
    for (let invalidValue of m.invalidValues) {
      //  Render the component
      const setValue = vi.fn();
      const { container } = render(
        <TestedComponent
          initialValue={m.valueInput1}
          mockSetValue={setValue}
          label={m.customLabel}
        />
      );
      //  Search for input element
      const htmlInput: HTMLInputElement | null = queryByLabelText(
        container as HTMLElement,
        m.customLabel
      );
      //  Verify element state
      expect(htmlInput).not.toBeNull();
      if (htmlInput) {
        fireEvent.input(htmlInput, { target: { value: invalidValue } });
        expect(setValue).not.toHaveBeenCalled();
      }
    }
  });

  it('should not update state when input is disabled', () => {
    //  Render the component
    const setValue = vi.fn();
    const { container } = render(
      <TestedComponent
        initialValue={m.valueInput1}
        mockSetValue={setValue}
        label={m.customLabel}
        enabled={false}
      />
    );
    //  Search for input element
    const htmlInput: HTMLInputElement | null = queryByLabelText(
      container as HTMLElement,
      m.customLabel
    );
    //  Verify element state
    expect(htmlInput).not.toBeNull();
    if (htmlInput) {
      fireEvent.input(htmlInput, { target: { value: m.valueOutput2 } });
      expect(setValue).not.toHaveBeenCalled();
    }
  });
});
