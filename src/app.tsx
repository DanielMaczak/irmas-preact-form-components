/**
 * Module used for testing.
 */

import { Ref } from 'preact';
import { useState } from 'preact/hooks';
import { ForwardedRef } from 'preact/compat';

//  DEVELOPMENT OF GENERIC COMPONENTS
import { TextInput } from './components-generic/components/text-input.component';
import { DateInput } from './components-generic/components/date-input.component';
import { NumInput } from './components-generic/components/num-input.component';
import { DropdownInput } from './components-generic/components/dropdown-input.component';
import { ReplaceInput } from './components-generic/components/replace-input.component';
import * as t from './components-generic/services/types.service';

//  DEVELOPMENT OF GENERIC COMPONENTS
const TextInputSample = () => {
  const [text, setText] = useState('');
  return (
    <TextInput
      value={text}
      setValue={setText}
      className="custom-class-name another-class-name"
      label="Custom label:"
      placeholder="Insert your text here..."
      // autocapitalize="words"
      multiline={true}
    />
  );
};
const DateInputSample = () => {
  const [date, setDate] = useState(Date.now());
  return (
    <DateInput
      value={date}
      min={Date.now() + 1000 * 3600 * 24 * 7}
      max={Date.now() + 1000 * 3600 * 24 * 40}
      setValue={setDate}
      className="date-class"
      label="date-label:"
      // enabled={false}
    />
  );
};
const NumInputSample = () => {
  const [value, setValue] = useState(0);
  return (
    <NumInput
      value={value}
      setValue={setValue}
      className="num-class"
      label="num-label:"
      min={-100}
      max={100}
      invalidClassName="invalid-value"
    />
  );
};
const DropdownInputSample = () => {
  const options: t.Option[] = [
    { id: '0', value: 'test0' },
    { id: '1', value: 'test1' },
    { id: '2', value: 'test2' },
  ];
  const [value, setValue] = useState(options[0]);
  return (
    <DropdownInput
      value={value}
      setValue={setValue}
      options={options}
      className="dropdown-class"
      label="dropdown-label:"
    />
  );
};

const ReplaceTextInputSample = () => {
  const [valueText, setValueText] = useState('1234');
  const [valueNum, setValueNum] = useState(1234);
  return (
    <>
      <ReplaceInput
        component={(ref: Ref<HTMLElement>) => (
          <img
            ref={ref as Ref<HTMLImageElement>}
            src="https://cdn-icons-png.flaticon.com/512/347/347052.png"
            width="16"
          />
        )}
      >
        {(childRef: ForwardedRef<HTMLElement>) => (
          <TextInput
            value={valueText}
            setValue={setValueText}
            className="text-class"
            label="text-label:"
            placeholder="text-placeholder"
            // autocapitalize="sentences"
            multiline={true}
            ref={childRef}
          />
        )}
      </ReplaceInput>
      <br />
      <ReplaceInput>
        {(childRef: ForwardedRef<HTMLElement>) => (
          <NumInput
            value={valueNum}
            setValue={setValueNum}
            className="num-class"
            label="num-label:"
            max={100}
            invalidClassName="invalid-value"
            ref={childRef}
          />
        )}
      </ReplaceInput>
    </>
  );
};

export function App() {
  return (
    <>
      {/* DEVELOPMENT OF GENERIC COMPONENTS */}
      <TextInputSample />
      <br />
      <DateInputSample />
      <br />
      <NumInputSample />
      <br />
      <DropdownInputSample />
      <br />
      <ReplaceTextInputSample />
    </>
  );
}
