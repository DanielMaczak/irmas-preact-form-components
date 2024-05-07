//  External dependencies
import {
  fireEvent,
  queryByDisplayValue,
  queryByLabelText,
  queryByText,
  render,
} from '@testing-library/preact';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useState } from 'preact/hooks';

//  Internal dependencies
import { TextInput } from './text-input.component';
import * as m from './text-input.mocks';
import * as c from '../services/constants.service';

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
  placeholder,
  enabled,
  autocapitalize,
  multiline,
}: {
  initialValue: any; // to allow tests on the Type
  mockSetValue?: (value: string) => void;
  id?: string;
  name?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  enabled?: boolean;
  autocapitalize?: c.CAPS_OPTIONS;
  multiline?: boolean;
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <TextInput
      value={value}
      setValue={mockSetValue || setValue}
      {...(id ? { id: id } : {})}
      {...(name ? { name: name } : {})}
      {...(className ? { className: className } : {})}
      {...(label ? { label: label } : {})}
      {...(placeholder ? { placeholder: placeholder } : {})}
      {...(enabled !== undefined ? { enabled: enabled } : {})}
      {...(autocapitalize ? { autocapitalize: autocapitalize } : {})}
      {...(multiline !== undefined ? { multiline: multiline } : {})}
    />
  );
};

/**
 * @description Simulates entering value into <textarea> with all effects.
 * Uses native JS event triggers because testing-library's don't trigger.
 * @param htmlTextArea <textarea> produced by tested component.
 * @param value Value to input into htmlTextArea.
 */
const enterValue = (htmlTextArea: HTMLTextAreaElement, value: any): void => {
  htmlTextArea.focus();
  fireEvent.input(htmlTextArea, { target: { value: value } });
  htmlTextArea.blur();
};

/**
 * @module text-input.test
 * @description Covers full JS unit tests.
 * Currently is missing CSS unit tests.
 * All mocks are to be stored in standalone module.
 * @version 1.0.0
 */
describe('TextInput component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render correctly with default props', () => {
    //  Render the component
    const { container } = render(<TestedComponent initialValue={m.value} />);
    //  Search for input element
    const htmlTextArea: HTMLTextAreaElement | null = queryByDisplayValue(
      container as HTMLElement,
      m.value
    );
    //  Verify element state
    expect(htmlTextArea).not.toBeNull();
    expect(htmlTextArea?.value).toEqual(m.value);
    expect(htmlTextArea?.id).toEqual('');
    expect(htmlTextArea?.name).toEqual('');
    expect(htmlTextArea?.classList).toContain(m.defaultClassInput);
    expect(htmlTextArea?.getAttribute('disabled')).toBeNull();
    expect(container.textContent).toEqual('');
  });

  it('should render correctly with custom props', () => {
    //  Render the component
    const { container } = render(
      <TestedComponent
        initialValue={m.value}
        id={m.customId}
        name={m.customName}
        className={m.customClassInput}
        label={m.customLabel}
        enabled={false}
      />
    );
    //  Search for input elements
    const htmlLabel = queryByText(container as HTMLElement, m.customLabel);
    const htmlTextArea: HTMLTextAreaElement | null = queryByLabelText(
      container as HTMLElement,
      m.customLabel
    );
    //  Verify element state
    expect(htmlLabel).not.toBeNull();
    expect(htmlTextArea).not.toBeNull();
    expect(htmlTextArea?.value).toEqual(m.value);
    expect(htmlTextArea?.id).toEqual(m.customId);
    expect(htmlTextArea?.name).toEqual(m.customName);
    expect(htmlLabel?.classList).toContain(m.customClassOutputLabel);
    expect(htmlTextArea?.classList).toContain(m.customClassOutputInput);
    expect(htmlTextArea?.getAttribute('disabled')).not.toBeNull();
    expect(container.textContent).toEqual(m.customLabel);
  });

  it('should render correctly with any UTF-16 character', () => {
    //  Render the component
    const { container } = render(
      <TestedComponent initialValue={m.utf16value} label={m.customLabel} />
    );
    //  Search for input elements
    const htmlTextArea: HTMLTextAreaElement | null = queryByLabelText(
      container as HTMLElement,
      m.customLabel
    );
    //  Verify element state
    expect(htmlTextArea).not.toBeNull();
    expect(htmlTextArea?.value).toEqual(m.utf16value);
  });

  it('should autogenerate ID for label if none provided', () => {
    //  Render the component
    const { container } = render(
      <TestedComponent initialValue={m.value} label={m.customLabel} />
    );
    //  Search for input elements
    const htmlLabel = queryByText(container as HTMLElement, m.customLabel);
    const htmlTextArea: HTMLTextAreaElement | null = queryByLabelText(
      container as HTMLElement,
      m.customLabel
    );
    //  Verify element state
    expect(htmlLabel).not.toBeNull();
    expect(htmlTextArea).not.toBeNull();
    expect(htmlTextArea?.id).not.toEqual('');
    expect(htmlLabel?.getAttribute('for')).toEqual(htmlTextArea?.id);
  });

  it('should not render label if none requested', () => {
    //  Render the component
    const { container } = render(<TestedComponent initialValue={m.value} />);
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
      const htmlTextArea: HTMLTextAreaElement | null = queryByLabelText(
        container as HTMLElement,
        m.customLabel
      );
      //  Verify element state
      expect(htmlTextArea).not.toBeNull();
      expect(htmlTextArea?.value).toEqual('');
    }
  });

  it('should update state to new given text', () => {
    //  Render the component
    let testValue: string = m.value;
    const setValue = (value: string) => (testValue = value);
    const { container } = render(
      <TestedComponent initialValue={testValue} mockSetValue={setValue} />
    );
    //  Search for input element
    const htmlTextArea: HTMLTextAreaElement | null = queryByDisplayValue(
      container as HTMLElement,
      testValue
    );
    //  Verify element state
    expect(htmlTextArea).not.toBeNull();
    if (htmlTextArea) {
      enterValue(htmlTextArea, m.replaceValue);
      expect(testValue).toEqual(m.replaceValue);
    }
  });

  it('should update state only when text is changed', () => {
    //  Render the component
    const setValue = vi.fn();
    const { container } = render(
      <TestedComponent initialValue={m.value} mockSetValue={setValue} />
    );
    //  Search for input element
    const htmlTextArea: HTMLTextAreaElement | null = queryByDisplayValue(
      container as HTMLElement,
      m.value
    );
    //  Verify element state
    expect(htmlTextArea).not.toBeNull();
    if (htmlTextArea) {
      enterValue(htmlTextArea, m.value);
      expect(setValue).not.toHaveBeenCalled();
      enterValue(htmlTextArea, m.replaceValue);
      expect(setValue).toHaveBeenCalledOnce();
    }
  });

  it('should not update state when input is disabled', () => {
    //  Render the component
    const setValue = vi.fn();
    const { container } = render(
      <TestedComponent
        initialValue={m.value}
        mockSetValue={setValue}
        enabled={false}
      />
    );
    //  Search for input element
    const htmlTextArea: HTMLTextAreaElement | null = queryByDisplayValue(
      container as HTMLElement,
      m.value
    );
    //  Verify element state
    expect(htmlTextArea).not.toBeNull();
    if (htmlTextArea) {
      enterValue(htmlTextArea, m.replaceValue);
      expect(setValue).not.toHaveBeenCalled();
    }
  });

  it('should correctly capitalize text on input', () => {
    for (let autocapitalize of m.autocapitalizeValues) {
      //  Render the component
      const { container } = render(
        <TestedComponent
          initialValue={m.value}
          autocapitalize={autocapitalize.option}
          label={m.customLabel}
        />
      );
      //  Search for input element
      const htmlTextArea: HTMLTextAreaElement | null = queryByLabelText(
        container as HTMLElement,
        m.customLabel
      );
      //  Verify element state
      expect(htmlTextArea).not.toBeNull();
      if (htmlTextArea) {
        enterValue(htmlTextArea, m.autocapitalizeInput);
        vi.advanceTimersByTime(5000); // debounce
        expect(htmlTextArea.value).toEqual(autocapitalize.output);
      }
    }
  });

  it('should render with correctly capitalized text', () => {
    for (let autocapitalize of m.autocapitalizeValues) {
      //  Render the component
      const { container } = render(
        <TestedComponent
          initialValue={m.autocapitalizeInput}
          autocapitalize={autocapitalize.option}
          label={m.customLabel}
        />
      );
      //  Search for input element
      const htmlTextArea: HTMLTextAreaElement | null = queryByLabelText(
        container as HTMLElement,
        m.customLabel
      );
      //  Verify element state
      expect(htmlTextArea).not.toBeNull();
      if (htmlTextArea) {
        expect(htmlTextArea.value).toEqual(autocapitalize.output);
      }
    }
  });

  //  TODO: handle with Cypress
  // it('should resize when multiline', () => {
  //   //  Render the component
  //   const { container } = render(
  //     <TestedComponent initialValue={m.value} multiline={true} />
  //   );
  //   //  Search for input element
  //   const htmlTextArea: HTMLTextAreaElement | null = queryByDisplayValue(
  //     container as HTMLElement,
  //     m.value
  //   );
  //   //  Verify element state
  //   expect(htmlTextArea).not.toBeNull();
  //   if (htmlTextArea) {
  //     enterValue(htmlTextArea, m.multilineInput2);
  //     const htmlTextAreaStyles = getComputedStyle(htmlTextArea);
  //     const initialHeightPx = htmlTextAreaStyles.getPropertyValue('height');
  //     const initialHeight: number = parseFloat(initialHeightPx);
  //   }
  // });
  // it('should not resize when singleline', () => {});
});
