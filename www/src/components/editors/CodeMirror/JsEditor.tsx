import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const JsEditor = (props) => {

    return (
        <CodeMirror
            height="200px"
            extensions={[javascript({ jsx: true })]}

            {...props}
        />
    );
}
export default JsEditor;