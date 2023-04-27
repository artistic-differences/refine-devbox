export interface ICategory {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    category: ICategory;
    category_id: string;
}

export interface IAccount {
    id: bigint;
    organisation_name: string;
    contact_name: string;
    contact_email: string;
    subdomain: string;
    annual_payment: boolean
}