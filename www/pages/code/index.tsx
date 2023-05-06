import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form } from "antd";
import CodeEditor from "@components/editors/CodeEditor";
import JsEditor from "@components/editors/CodeMirror/JsEditor";

export const CodeEdit: React.FC<IResourceComponentsProps> = () => {

    const { formProps, saveButtonProps, queryResult } = useForm({
            //resource:"accounts",
            dataProviderName:"default",
            action:"edit",
            //id: accountId,
            redirect:false,
            queryOptions: {enabled: false}
        }
    );

    return (
        <>

        <Edit saveButtonProps={saveButtonProps} headerButtons={()=>(<></>)} >

            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Organisation Name"
                    name={["organisation_name"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <JsEditor  />
                </Form.Item>
            </Form>
        </Edit>
        </>
    );
};
export default CodeEdit

