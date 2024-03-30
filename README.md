# Irma's Preact form components

> [!WARNING]
> This is a work in progress. I am progressively adding more features, writing unit/integration tests and refactoring for best performance.
> It will become an NPM package once the majority of the features are in.

## Contents

- [Features](#features)
- [Installation](#installation)
- [Requirements](#requirements)
- [Use case](#use-case)
- [Future additions](#future-additions)
- [Components](#components)
  - [Date Input](#date-input)
  - [Number Input](#number-input)
  - [Text Input](#text-input)

## Features

Set of minimalistic form components with a simple premise: maximum features in minimum code.

- Independent: Preact is the only dependency.
- Modern: ES6 modules only.
- Clean: 100% in strict TypeScript.
- Easy to use: HTML Input features finally working as you would expect.
- No fighting: Formating reset to 0, ready to be injected with styles.

## Installation

// Will be added after first full release

## Requirements

I am developing in Preact version 10.19.

## Use case

// Will be added after first full release

## Future additions

Following is the list of planned features:

- Dropdown Input: options selector, potentially heavily based on current HTML tricks for the best performance.
- Button: mainly to complete the set, currently I have no special features in mind.
- Panel Switch: a panel of options to pick (no radio buttons), hopefully fully utilizing current HTML tricks to deliver the functionality.

## Components

All components provide the following features. Component-specific features are listed below in their respective sections.

<table>
  <tr>
    <th>Feature<img style=width:20em;height:1px; /></th>
    <th>Description<img style=width:40em;height:1px; /></th>
    <th>Code sample<img style=width:40em;height:1px; /></th>
  </tr>
  <tr>
    <td valign=top>Generated label</td>
    <td valign=top>

- The component generates with label if given a label caption via the `label` property.
- Automatically generates a unique ID to link the label with the control, or can be given a custom ID.
- The label inherits all classes given to the component.
    </td>
    <td valign=top>

```javascript
const TextInputSample = () => {
  const [text, setText] = useState('');
  return (
    <TextInput
      value={text}
      setValue={setText}
      label="Custom label:"
      ...
    />
  );
};
```

  </tr>
  <tr>
    <td valign=top>Customizable class list</td>
    <td valign=top>

- The component has a default internal class but can receive any number of classes via the `className` parameter.
- The default class removes all default component styling (such as border, background-color, padding etc.), and font properties are set to inherit. No more fighting with a complex set of factory styles.
- The user-defined classes have suffix based on the component they belong to, so that your styling doesn't depend on plugin internals:
  - `*__input`: the control holding the value.
  - `*__label`: the label (if displayed).
  - `*__option`: the dropdown options.
    </td>
    <td valign=top>

```javascript
const TextInputSample = () => {
  const [text, setText] = useState('');
  return (
    <TextInput
      value={text}
      setValue={setText}
      className="custom-class another-class"
      ...
    />
  );
};
```

  </tr>
  <tr>
    <td valign=top>Color inheritance</td>
    <td valign=top>

- All components can inherit color from `--bg-color` CSS variable. It applies to the border, and to the background with 25% opacity if the component is disabled.
- When applying conditional formatting, you only need to change this variable in the parent element and all the children will change color!
    </td>
    <td valign=top>

```css
.custom-class {
  border-style: solid;
}
```

```javascript
const TextInputSample = () => {
  const [text, setText] = useState('');
  return (
    <div style="--bg-color: 255, 0, 0;">
      <TextInput
        value={text}
        setValue={setText}
        className="custom-class"
        ...
      />
    </div>
  );
};
```

  </tr>
  <tr>
    <td valign=top>Replaceable input</td>
    <td valign=top>

- You can use a special parent component to display different HTML elements instead of the input control. The element will switch to the input when activated to allow editing.
- This can be used to display highly customized placeholders when the user is not editing.
- The code is offloaded into a separate component to remove any overhead when the feature is not used.
    </td>
    <td valign=top>

```javascript
const ReplaceTextInputSample = () => {
  const [text, setText] = useState('');
  return (
    <ReplaceInput
      component={(ref: Ref<HTMLElement>) => (
        <img
          ref={ref as Ref<HTMLImageElement>}
          src="https://...png"
        />
      )}
    >
      {(childRef: ForwardedRef<HTMLElement>) => (
        <TextInput
          value={value}
          setValue={setValue}
          ...
          ref={childRef}
        />
      )}
    </ReplaceInput>
  );
};
```

  </tr>
</table>

### Date Input

<table>
  <tr>
    <th>Feature<img style=width:20em;height:1px; /></th>
    <th>Description<img style=width:40em;height:1px; /></th>
    <th>Code sample<img style=width:40em;height:1px; /></th>
  </tr>
  <tr>
    <td valign=top>Numeric date input</td>
    <td valign=top>

- The component takes all date inputs as timestamps (the number of milliseconds that have passed since the beginning of 1970). No more confusion regarding date formats and no need for external libraries like moment.js.
    </td>
    <td valign=top>

```javascript
const DateInputSample = () => {
  const [date, setDate] = useState(Date.now());
  return (
    <DateInput
      value={date}
      setValue={setDate}
      ...
    />
  );
};
```

  </tr>
  <tr>
    <td valign=top>Minimum and maximum date</td>
    <td valign=top>

- You can provide the minimum and maximum date the user can enter. The component will ensure they can't go outside these boundaries.
    </td>
    <td valign=top>

```javascript
const DateInputSample = () => {
  const [date, setDate] = useState(Date.now());
  return (
    <DateInput
      value={date}
      min={Date.now() - 1000 * 3600 * 24 * 7}
      max={Date.now() + 1000 * 3600 * 24 * 40}
      setValue={setDate}
      ...
    />
  );
};
```

  </tr>
</table>

### Number Input

<table>
  <tr>
    <th>Feature<img style=width:20em;height:1px; /></th>
    <th>Description<img style=width:40em;height:1px; /></th>
    <th>Code sample<img style=width:40em;height:1px; /></th>
  </tr>
  <tr>
    <td valign=top>Protection from non-numeric values</td>
    <td valign=top>

- Provides real protection from all kinds of non-numeric inputs, as well as from infinite values of JS such as `NaN` or `Infinity`.
- Non-numeric characters are prevented already at keypress. Nonsensical combinations of valid characters are reverted when you stop typing.
- By default, the inputs are pegged between `MIN-` and `MAX_SAFE_INTEGER` but you can override this behavior with your own limits.
    </td>
    <td valign=top>

```javascript
const NumInputSample = () => {
  const [value, setValue] = useState(0);
  return (
    <NumInput
      value={value}
      setValue={setValue}
      ...
    />
  );
};
```

  </tr>
  <tr>
    <td valign=top>Minimum and maximum value</td>
    <td valign=top>

- You can provide the minimum and maximum values the user can enter. The limits are debounced when the user stops typing.
- There is weak and hard enforcement of this:
  - weak enforcement applies conditional formatting when the value goes outside the min-max boundaries by assigning to it a class you provide,
  - hard enforcement does not allow the user to enter a value outside the boundaries.
    </td>
    <td valign=top>

```javascript
const NumInputSample = () => {
  const [value, setValue] = useState(0);
  return (
    <NumInput
      value={value}
      setValue={setValue}
      min={-100}
      max={100}
      invalidClassName="invalid-value"
      ...
    />
  );
};
```

  </tr>
</table>

### Text Input

<table>
  <tr>
    <th>Feature<img style=width:20em;height:1px; /></th>
    <th>Description<img style=width:40em;height:1px; /></th>
    <th>Code sample<img style=width:40em;height:1px; /></th>
  </tr>
  <tr>
    <td valign=top>Autoresize as you type</td>
    <td valign=top>

- By default, the input is single-line, but can be changed to `multiline` via a given parameter.
- The multiline component will not resize horizontally but will increase its height as you type to fit all the contents.
    </td>
    <td valign=top>

```javascript
const TextInputSample = () => {
  const [text, setText] = useState('');
  return (
    <TextInput
      value={text}
      setValue={setText}
      multiline={true}
      ...
    />
  );
};
```

  </tr>
  <tr>
    <td valign=top>Autocapitalize on any device</td>
    <td valign=top>

- The `autocapitalize` feature of HTML elements works only on mobile devices, so I made my own that works everywhere.
- The input is capitalized after you finish typing.
- The supported capitalization is for each letter, each word, or for the first letter of every full sentence.
    </td>
    <td valign=top>

```javascript
const TextInputSample = () => {
  const [text, setText] = useState('');
  return (
    <TextInput
      value={text}
      setValue={setText}
      autocapitalize="words"
      ...
    />
  );
};
```

  </tr>
</table>
