import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    TagField,
    EmailField,
    BooleanField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import {IAccount} from "../../../src/interfaces";

export const AccountList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IAccount>({
        metaData: {
            fields: [
                "id",
                "organisation_name",
                "contact_name",
                "contact_email",
                "subdomain",
                "annual_payment",
            ],
        },
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column
                    dataIndex="organisation_name"
                    title="Organisation Name"
                />
                <Table.Column dataIndex="contact_name" title="Contact Name" />
                <Table.Column
                    dataIndex={["contact_email"]}
                    title="Contact Email"
                    render={(value: any) => <EmailField value={value} />}
                />
                <Table.Column dataIndex="subdomain" title="Subdomain" />
                <Table.Column
                    dataIndex={["annual_payment"]}
                    title="Annual Payment"
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

export default AccountList;