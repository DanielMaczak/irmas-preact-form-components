import './app.css';

//  DEVELOPMENT OF GENERIC COMPONENTS
import { TextInput } from './components-generic/text-input.component';

export function App() {
  return (
    <>
      {/* DEVELOPMENT OF GENERIC COMPONENTS */}
      <TextInput
        value="test-val"
        setValue={() => {}}
        className="test-class"
        label="test-label:"
        placeholder="asdfsdf"
        autocapitalize="words"
        multiline={true}
      />
    </>
  );
}
