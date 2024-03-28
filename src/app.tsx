/**
 * Module used for testing.
 */

import { useState } from 'preact/hooks';
import { ForwardedRef } from 'preact/compat';

//  DEVELOPMENT OF GENERIC COMPONENTS
// import { TextInput } from './components-generic/components/text-input.component';
import { DateInput } from './components-generic/components/date-input.component';
// import { NumInput } from './components-generic/components/num-input.component';
// import { ReplaceInput } from './components-generic/components/replace-input.component';
// import { Ref } from 'preact';

//  DEVELOPMENT OF GENERIC COMPONENTS
// const TextInputSample = () => (
//   <TextInput
//     value="text-val"
//     setValue={() => {}}
//     className="text-class"
//     label="text-label:"
//     placeholder="text-placeholder"
//     autocapitalize="words"
//     multiline={true}
//   />
// );
const DateInputSample = () => (
  <DateInput
    value={Date.now()}
    min={Date.now() - 1000 * 3600 * 24 * 7}
    max={Date.now() + 1000 * 3600 * 24 * 40}
    setValue={() => {}}
    className="date-class"
    label="date-label:"
    // enabled={false}
  />
);
// const NumInputSample = () => {
//   const [value, setValue] = useState(1234);
//   return (
//     <NumInput
//       value={value}
//       setValue={setValue}
//       className="num-class"
//       label="num-label:"
//       max={100}
//       invalidClassName="invalid-value"
//     />
//   );
// };

const ReplaceTextInputSample = () => {
  const [value, setValue] = useState('1234');
  // return (
  // <ReplaceInput
  // component={(ref: Ref<HTMLElement>) => (
  //   <img
  //     ref={ref as Ref<HTMLImageElement>}
  //     src="https://cdn-icons-png.flaticon.com/512/347/347052.png"
  //   />
  // )}
  // >
  //   {(childRef: ForwardedRef<HTMLElement>) => (
  //     <TextInput
  //       value={value}
  //       setValue={setValue}
  //       className="text-class"
  //       label="text-label:"
  //       placeholder="text-placeholder"
  //       autocapitalize="sentences"
  //       multiline={true}
  //       ref={childRef}
  //     />
  //   )}
  // </ReplaceInput>
  // ----------------------------------------------------------
  // <ReplaceInput>
  //   {(childRef: ForwardedRef<HTMLElement>) => (
  //     <NumInput
  //       value={value}
  //       setValue={setValue}
  //       className="num-class"
  //       label="num-label:"
  //       max={100}
  //       invalidClassName="invalid-value"
  //       ref={childRef}
  //     />
  //   )}
  // </ReplaceInput>
  // );
};

export function App() {
  const counter: number[] = Array.from(Array(1).keys());
  return (
    <>
      {/* DEVELOPMENT OF GENERIC COMPONENTS */}
      {/* <TextInputSample /> */}
      {/* <DateInputSample /> */}
      {/* <NumInputSample /> */}
      {counter.map((_: number, i: number) => {
        // return <ReplaceTextInputSample key={i} />;
        return <DateInputSample key={i} />;
      })}
    </>
  );
}
