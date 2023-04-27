import {getCurrentUser} from "./storage";

export const getDefaultPath = () => {
    const currentUser = getCurrentUser();
    console.log('currentUser', currentUser);

    if (!currentUser) {
        return "";
    }
    return currentUser.role == "admin" ? "accounts" : "userAccount";
}

export const getResources = () => {
    return([
        {
            name: "accounts",
            list: "/sysadmin/accounts",
            create: "/sysadmin/accounts/create",
            edit: "/sysadmin/accounts/edit/:id",
            meta: {
                dataProviderName: "hasura",
                roles: ["admin"]
            },
        },
        {
            name: "userAccount",
            //list: {component: AccountEdit, path:"/account"},
            list: "/account",
            meta: {
                label:"Account",
                //dataProviderName: "hasura",
                roles: ["user"]
            },
        },

        {
            name: "plans",
            list: "/sysadmin/plans",
            create: "/sysadmin/plans/create",
            edit: "/sysadmin/plans/edit/:id",
            meta: {
                roles: ["admin"]
            }
        },
        {
            name: "products",
            list: "/sysadmin/products",
            create: "/sysadmin/products/create",
            edit: "/sysadmin/products/edit/:id",
            meta: {
                roles: ["admin"]
            }
        },
        {
            name: "modules",
            list: "/sysadmin/modules",
            create: "/sysadmin/modules/create",
            edit: "/sysadmin/modules/edit/:id",
            meta: {
                roles: ["admin"]
            }
        },
        {
            name: "posts",
            list: "/sysadmin/posts",
            create: "/sysadmin/posts/create",
            edit: "/sysadmin/posts/edit/:id",
            show: "/sysadmin/posts/show/:id",
            meta: {
                roles: ["admin"]
            }
        },
    ])
}