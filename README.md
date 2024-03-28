

<p align=center>
  <img src=https://github.com/DanielMaczak/irmas-preact-form-components/assets/145442574/982da384-52cb-4163-8e2d-b2fd29288987 style=width:1em;padding:0; /> 
  !!! This is work in progress. It will become an NPM package once majority of the features are in. !!!
  <img src=https://github.com/DanielMaczak/irmas-preact-form-components/assets/145442574/982da384-52cb-4163-8e2d-b2fd29288987 style=width:1em;padding:0; /> 
</p>

# Irma's Preact form components

Set of minimalistic form components with simple premise: maximum features in minimum code.

- Independent: Preact is the only dependency.
- Modern: ES6 modules only.
- Clean: 100% in strict TypeScript.
- Easy to use: HTML Input features finally working as you would expect.
- No fighting: Formating reset to 0, ready to be injected with styles.

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
- Automatically generates unique ID to link the label with the control, or can be given custom ID.
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
      
- The component has default internal class, but can receive any number of classes via `className` parameter.
- The default class removes all default component styling (such as border, background-color, padding etc.), and font properties are set to inherit. No more fighting with complex set of factory styles.
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
      
- All components can inherit color from `--bg-color` CSS variable. It applies to border, and to background with 25% opacity if the component is disabled.
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
      
- You can use special parent component to display different HTML element instead of the input control. The element will switch to the input when activated to allow editing.
- This can be used to display customized placeholder when the user is not editing.
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

### Number Input

### Text Input

### Replace Input
