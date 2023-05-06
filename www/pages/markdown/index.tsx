import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form } from "antd";
import KatexEditor from "@components/editors/MDEditor/KatexEditor";

export const MarkdownEdit: React.FC<IResourceComponentsProps> = () => {

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
        "question" : [{
            "id": 2,
            "title": "short title",
            "content": ""
        }]
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <>

        <Edit saveButtonProps={saveButtonProps} headerButtons={()=>(<></>)} >


            <Form onFinish={onFinish} {...formProps} layout="vertical">
                <Form.Item
                    initialValue={""}
                    label="Question"
                    name={["content"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <KatexEditor  />
                </Form.Item>
            </Form>
        </Edit>
        </>
    );
};
export default MarkdownEdit

