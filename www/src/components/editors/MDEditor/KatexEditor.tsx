import MDEditor from "./MDEditor";
import { getCodeString } from 'rehype-rewrite';
import katex from 'katex';
import 'katex/dist/katex.css';
import React from "react";

interface KatexEditorInputProps {
    value?: string;
    onChange?: (value: string) => void;
}

const KatexEditor : React.FC<any> = ({ value = {}, onChange }) => {
    return(
        <MDEditor
            value={value}
            onChange={onChange}
            previewOptions={{
                components: {
                    code: ({ inline, children = [], className, ...props }) => {
                        const txt = children[0] || '';
                        if (inline) {
                            if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                                const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                                    throwOnError: false,
                                });
                                return <code dangerouslySetInnerHTML={{ __html: html }} />;
                            }
                            return <code>{txt}</code>;
                        }
                        const code = props.node && props.node.children ? getCodeString(props.node.children) : txt;
                        if (
                            typeof code === 'string' &&
                            typeof className === 'string' &&
                            /^language-katex/.test(className.toLocaleLowerCase())
                        ) {
                            const html = katex.renderToString(code, {
                                throwOnError: false,
                            });
                            return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
                        }
                        return <code className={String(className)}>{txt}</code>;
                    },
                },
            }}
        />

    )
}

export default  KatexEditor;