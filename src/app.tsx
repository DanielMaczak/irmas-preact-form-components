/**
 * Module used for testing.
 */

import { Ref } from 'preact';
import { useState } from 'preact/hooks';
import { ForwardedRef } from 'preact/compat';

//  DEVELOPMENT OF GENERIC COMPONENTS
import {
  TextInput,
  TextInputRef,
} from './components-generic/components/text-input.component';
import { DateInput } from './components-generic/components/date-input.component';
import {
  NumInput,
  NumInputRef,
} from './components-generic/components/num-input.component';
import { DropdownInput } from './components-generic/components/dropdown-input.component';
import { ReplaceInput } from './components-generic/components/replace-input.component';
import * as t from './components-generic/services/types.service';
import { SwitchInput } from './components-generic/components/switch-input.component';
import { Button } from './components-generic/components/button.component';
import { File } from './components-generic/components/file.component';

//  DEVELOPMENT OF GENERIC COMPONENTS
const TextInputSample = () => {
  const [text, setText] = useState('afsdfdfdfasd\nasdfdsfdfsd\nasdfdsfds');
  const doStuffOnInput = (newText: string) => {
    console.log('storing new text');
    setText(newText);
  };
  return (
    <TextInput
      value={text}
      setValue={doStuffOnInput}
      className="custom-class-name another-class-name"
      label="Custom label:"
      placeholder="Insert your text here..."
      // autocapitalize={CAPS_OPTIONS.WORDS}
      multiline={true}
    />
  );
};
const DateInputSample = () => {
  const [date, setDate] = useState<number | null>(Date.now());
  return (
    <DateInput
      value={date}
      name="asdf sadf df fds fg f .a;s.sfa;"
      // min={Date.now() + 1000 * 3600 * 24 * 7}
      // max={Date.now() + 1000 * 3600 * 24 * 40}
      setValue={value => {
        console.log('new value:', value);
        setDate(value);
      }}
      className="date-class"
      label="date-label:"
      // enabled={false}
    />
  );
};
const NumInputSample = () => {
  const [value, setValue] = useState(200);
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
    { id: '0', value: 'test0', color: '#ff0000' },
    { id: '1', value: 'test1', color: '#ff0000' },
    { id: '2', value: 'test2', color: '#ff0000' },
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
const SwitchInputSample = () => {
  const options: t.Option[] = [
    { id: '0', value: 'test0' },
    { id: '1', value: 'test1' },
    { id: '2', value: 'test2' },
  ];
  // const [value, setValue] = useState(new Set(['0', '2']));
  const [value, setValue] = useState<string | Set<string>>('0');
  return (
    <SwitchInput
      value={value}
      setValue={setValue}
      options={options}
      className="switch-class"
      label="switch-label:"
    />
  );
};
const ButtonSample = () => {
  const [value, setValue] = useState('fancy button');
  return (
    <Button
      value={value}
      action={() => console.log('button clicked')}
      className="button-class"
      inactiveAfterClickFor={1000}
      inactiveValue={'waiting...'}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/347/347052.png"
        width="16"
      />
    </Button>
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
          <TextInputRef
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
          <NumInputRef
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
      <div style="color: #00f;--bg-color: 255, 0, 0;--font-color: 0, 255, 0;">
        {/* DEVELOPMENT OF GENERIC COMPONENTS */}
        <TextInputSample />
        <br />
        <DateInputSample />
        <br />
        <NumInputSample />
        <br />
        <DropdownInputSample />
        <br />
        <SwitchInputSample />
        <br />
        <ButtonSample />
        <br />
        <File value="Load file" action={e => console.log(e)} />
        <br />
        <ReplaceTextInputSample />
      </div>
    </>
  );
}
