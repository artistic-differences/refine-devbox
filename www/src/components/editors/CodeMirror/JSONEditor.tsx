import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

const JSONEditor = (props) => {

    return (
        <CodeMirror
            height="200px"
            extensions={[json()]}

            {...props}
        />
    );
}
export default JSONEditor;