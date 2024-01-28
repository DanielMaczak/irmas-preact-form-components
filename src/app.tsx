import { useState } from 'preact/hooks';

import './app.css';

//  DEVELOPMENT OF GENERIC COMPONENTS
import { TextInput } from './components-generic/text-input.component';
import { DateInput } from './components-generic/date-input.component';
import { NumInput } from './components-generic/num-input.component';

export function App() {
  const [value, setValue] = useState(1234);

  return (
    <>
      {/* DEVELOPMENT OF GENERIC COMPONENTS */}
      <TextInput
        value="text-val"
        setValue={() => {}}
        className="text-class"
        label="text-label:"
        placeholder="text-placeholder"
        autocapitalize="words"
        multiline={true}
      />
      <DateInput
        value={Date.now()}
        setValue={() => {}}
        className="date-class"
        label="date-label:"
        // enabled={false}
      />
      <NumInput
        value={value}
        setValue={setValue}
        className="num-class"
        label="num-label:"
        min={-30}
        invalidClassName="invalid-value"
      />
    </>
  );
}
