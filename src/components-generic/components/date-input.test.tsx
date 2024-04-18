//  TODO: handle with Cypress:
//  has outline when focused (accessibility)
//  should inherit color from parent via --bg-color CSS variable

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
  name,
  className,
  label,
  enabled,
  min,
  max,
}: {
  initialValue: any; // to allow tests on the Type
  mockSetValue?: (value: number) => void;
  id?: string;
  name?: string;
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
      {...(name ? { name: name } : {})}
      {...(className ? { className: className } : {})}
      {...(label ? { label: label } : {})}
      {...(enabled !== undefined ? { enabled: enabled } : {})}
      {...(min ? { min: min } : {})}
      {...(max ? { max: max } : {})}
    />
  );
};

/**
 * @description Quick way to obtain ms from date string.
 * @param date In format: YYYY-MM-DD.
 */
const getMs = (date: string): number => new Date(date).valueOf();

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
      <TestedComponent initialValue={getMs(m.value1Date)} />
    );
    //  Search for input element
    const htmlInput: HTMLInputElement | null = queryByDisplayValue(
      container as HTMLElement,
      m.value1Date
    );
    //  Verify element state
    expect(htmlInput).not.toBeNull();
    expect(htmlInput?.id).toEqual('');
    expect(htmlInput?.name).toEqual('');
    expect(htmlInput?.classList).toContain(m.defaultClassInput);
    expect(htmlInput?.getAttribute('disabled')).toBeNull();
    expect(container.textContent).toEqual('');
  });

  it('should render correctly with custom props', () => {
    //  Render the component
    const { container } = render(
      <TestedComponent
        initialValue={getMs(m.value1Date)}
        id={m.customId}
        name={m.customName}
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
    expect(htmlInput?.value).toEqual(m.value1Date);
    expect(htmlInput?.id).toEqual(m.customId);
    expect(htmlInput?.name).toEqual(m.customName);
    expect(htmlLabel?.classList).toContain(m.customClassOutputLabel);
    expect(htmlInput?.classList).toContain(m.customClassOutputInput);
    expect(htmlInput?.getAttribute('disabled')).not.toBeNull();
    expect(container.textContent).toEqual(m.customLabel);
  });

  it('should autogenerate ID for label if none provided', () => {
    //  Render the component
    const { container } = render(
      <TestedComponent
        initialValue={getMs(m.value1Date)}
        label={m.customLabel}
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
    expect(htmlInput?.id).not.toEqual('');
    expect(htmlLabel?.getAttribute('for')).toEqual(htmlInput?.id);
  });

  //  TODO: handle with Cypress
  // it('should focus input when label is clicked', () => {
  //   //  Render the component
  //   const { container } = render(
  //     <TestedComponent
  //       initialValue={getMs(m.value1Date)}
  //       label={m.customLabel}
  //     />
  //   );
  //   //  Search for input elements
  //   const htmlLabel = queryByText(container as HTMLElement, m.customLabel);
  //   const htmlInput: HTMLInputElement | null = queryByLabelText(
  //     container as HTMLElement,
  //     m.customLabel
  //   );
  //   //  Verify element state
  //   expect(htmlLabel).not.toBeNull();
  //   expect(htmlInput).not.toBeNull();
  //   if (htmlLabel) {
  //     fireEvent.click(htmlLabel);
  //     expect(htmlInput?.isEqualNode(document.activeElement)).toBe(true);
  //   }
  // });

  it('should not render label if none requested', () => {
    //  Render the component
    const { container } = render(
      <TestedComponent initialValue={getMs(m.value1Date)} />
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

  it('should update state to new given date', () => {
    //  Render the component
    let testValue: number = getMs(m.value1Date);
    const setValue = (value: number) => (testValue = value);
    const { container } = render(
      <TestedComponent initialValue={testValue} mockSetValue={setValue} />
    );
    //  Search for input element
    const htmlInput: HTMLInputElement | null = queryByDisplayValue(
      container as HTMLElement,
      m.value1Date
    );
    //  Verify element state
    expect(htmlInput).not.toBeNull();
    if (htmlInput) {
      fireEvent.input(htmlInput, { target: { value: m.value2Date } });
      expect(testValue).toEqual(getMs(m.value2Date));
    }
  });

  it('should update state only when date is changed', () => {
    //  Render the component
    const setValue = vi.fn();
    const { container } = render(
      <TestedComponent
        initialValue={getMs(m.value1Date)}
        mockSetValue={setValue}
      />
    );
    //  Search for input element
    const htmlInput: HTMLInputElement | null = queryByDisplayValue(
      container as HTMLElement,
      m.value1Date
    );
    //  Verify element state
    expect(htmlInput).not.toBeNull();
    if (htmlInput) {
      fireEvent.input(htmlInput, { target: { value: m.value1Date } });
      expect(setValue).not.toHaveBeenCalled();
      fireEvent.input(htmlInput, { target: { value: m.value2Date } });
      expect(setValue).toHaveBeenCalledOnce();
    }
  });

  it('should not update state on invalid input', () => {
    for (let invalidValue of m.invalidValues) {
      //  Render the component
      const setValue = vi.fn();
      const { container } = render(
        <TestedComponent
          initialValue={getMs(m.value1Date)}
          mockSetValue={setValue}
        />
      );
      //  Search for input element
      const htmlInput: HTMLInputElement | null = queryByDisplayValue(
        container as HTMLElement,
        m.value1Date
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
        initialValue={getMs(m.value1Date)}
        mockSetValue={setValue}
        enabled={false}
      />
    );
    //  Search for input element
    const htmlInput: HTMLInputElement | null = queryByDisplayValue(
      container as HTMLElement,
      m.value1Date
    );
    //  Verify element state
    expect(htmlInput).not.toBeNull();
    if (htmlInput) {
      fireEvent.input(htmlInput, { target: { value: m.value2Date } });
      expect(setValue).not.toHaveBeenCalled();
    }
  });

  it('should render correctly with default min-max props', () => {
    //  Render the component
    let testValue: number = getMs(m.value1Date);
    const setValue = (value: number) => (testValue = value);
    const { container } = render(
      <TestedComponent
        initialValue={testValue}
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
      fireEvent.input(htmlInput, { target: { value: m.beforeDefaultMinDate } });
      expect(testValue).toEqual(getMs(m.defaultMinDate));
      fireEvent.input(htmlInput, { target: { value: m.afterDefaultMaxDate } });
      expect(testValue).toEqual(getMs(m.defaultMaxDate));
    }
  });

  it('should render correctly with custom min-max props', () => {
    for (let customRange of m.customRanges) {
      //  Render the component
      let testValue: number = getMs(m.value1Date);
      const setValue = (value: number) => (testValue = value);
      const { container } = render(
        <TestedComponent
          initialValue={testValue}
          mockSetValue={setValue}
          min={getMs(customRange.minDate)}
          max={getMs(customRange.maxDate)}
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
        expect(testValue).toBe(getMs(customRange.expected));
        fireEvent.input(htmlInput, { target: { value: m.defaultMinDate } });
        expect(testValue).toBe(getMs(customRange.minDate));
        fireEvent.input(htmlInput, { target: { value: m.defaultMaxDate } });
        expect(testValue).toBe(getMs(customRange.maxDate));
      }
    }
  });

  it('should reset to default min-max if min > max', () => {
    //  Render the component
    let testValue: number = getMs(m.value1Date);
    const setValue = (value: number) => (testValue = value);
    const { container } = render(
      <TestedComponent
        initialValue={testValue}
        mockSetValue={setValue}
        min={getMs(m.greaterMinDate)}
        max={getMs(m.smallerMaxDate)}
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
      fireEvent.input(htmlInput, { target: { value: m.beforeDefaultMinDate } });
      expect(testValue).toEqual(getMs(m.defaultMinDate));
      fireEvent.input(htmlInput, { target: { value: m.afterDefaultMaxDate } });
      expect(testValue).toEqual(getMs(m.defaultMaxDate));
    }
  });

  it('should reset to default min-max if given invalid values', () => {
    for (let invalidValue of m.invalidValues) {
      //  Render the component
      let testValue: number = getMs(m.value1Date);
      const setValue = (value: number) => (testValue = value);
      const { container } = render(
        <TestedComponent
          initialValue={testValue}
          mockSetValue={setValue}
          min={invalidValue}
          max={invalidValue}
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
        fireEvent.input(htmlInput, {
          target: { value: m.beforeDefaultMinDate },
        });
        expect(testValue).toEqual(getMs(m.defaultMinDate));
        fireEvent.input(htmlInput, {
          target: { value: m.afterDefaultMaxDate },
        });
        expect(testValue).toEqual(getMs(m.defaultMaxDate));
      }
    }
  });
});
