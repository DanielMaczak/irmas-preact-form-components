import { useState } from 'preact/hooks';

import './app.css';

//  DEVELOPMENT OF GENERIC COMPONENTS
import { TextInput } from './components-generic/text-input.component';
import { DateInput } from './components-generic/date-input.component';
import { NumInput } from './components-generic/num-input.component';

//  DEVELOPMENT OF GENERIC COMPONENTS
const TextInputSample = () => (
  <TextInput
    value="text-val"
    setValue={() => {}}
    className="text-class"
    label="text-label:"
    placeholder="text-placeholder"
    autocapitalize="words"
    multiline={true}
  />
);
const DateInputSample = () => (
  <DateInput
    value={Date.now()}
    setValue={() => {}}
    className="date-class"
    label="date-label:"
    // enabled={false}
  />
);
const NumInputSample = () => {
  const [value, setValue] = useState(1234);
  return (
    <NumInput
      value={value}
      setValue={setValue}
      className="num-class"
      label="num-label:"
      max={100}
      invalidClassName="invalid-value"
    />
  );
};

export function App() {
  return (
    <>
      {/* DEVELOPMENT OF GENERIC COMPONENTS */}
      <TextInputSample />
      <DateInputSample />
      <NumInputSample />
    </>
  );
}
