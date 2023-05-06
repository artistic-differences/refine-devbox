import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form } from "antd";
import JsonEditor from "@components/editors/CodeMirror/JSONEditor";

export const DBEdit: React.FC<IResourceComponentsProps> = () => {

    const { formProps, saveButtonProps, queryResult } = useForm({
            //resource:"accounts",
            dataProviderName:"default",
            action:"edit",
            //id: accountId,
            redirect:false,
            queryOptions: {enabled: false}
        }
    );

    //const data = queryResult?.data?.data;
    const data = {
        "accounts" : [{
            "id": 2,
            "name": "acme"
        }]
    }

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
                    <JsonEditor />

                    />
                </Form.Item>
            </Form>
        </Edit>
        </>
    );
};
export default DBEdit

