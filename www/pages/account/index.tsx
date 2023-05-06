import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox } from "antd";

export const AccountEdit: React.FC<IResourceComponentsProps> = () => {

    const accountId = 1;

    const { formProps, saveButtonProps, queryResult } = useForm({
            resource:"accounts",
            dataProviderName:"default",
            action:"edit",
            id: accountId,
            redirect:false,
            queryOptions: {enabled: !!accountId}
        }
    );

    const accountData = queryResult?.data?.data;

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
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Contact Name"
                    name={["contact_name"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Contact Email"
                    name={["contact_email"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Subdomain"
                    name={["subdomain"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Annual Payment"
                    valuePropName="checked"
                    name={["annual_payment"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Checkbox>Annual Payment</Checkbox>
                </Form.Item>
            </Form>
        </Edit>
        </>
    );
};
export default AccountEdit

