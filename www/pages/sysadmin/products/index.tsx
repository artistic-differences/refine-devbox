import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ImageField,
    UrlField,
    TagField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ProductsList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex={["image_url"]}
                    title="Image Url"
                    render={(value: any, record: any) => {
                        console.log(record);
                        const {background_colour} = record;
                            return (
                                <div style={{display: "flex", justifyContent: "center", height: "80px"}}>
                                    <img
                                        style={{
                                            borderRadius: "5px",
                                            maxWidth: "150px",
                                            margin: "10px",
                                            padding: "10px",
                                            backgroundColor: background_colour
                                        }}
                                        src={value}
                                    />
                                </div>
                            )
                        }
                    }
                />
                <Table.Column dataIndex="name" title="Name" />
                <Table.Column dataIndex="description" title="Description" />
                <Table.Column
                    dataIndex={["product_url"]}
                    title="Product Url"
                    render={(value: any) => <UrlField value={value} />}
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

export default ProductsList;