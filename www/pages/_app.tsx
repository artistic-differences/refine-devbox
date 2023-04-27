import React from "react";
import { AppProps } from "next/app";
import {SessionProvider, useSession} from "next-auth/react";

import {CanAccess, Refine} from "@refinedev/core";
import {
    ThemedLayoutV2,
    notificationProvider,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";

import routerProvider, {
    UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import "@refinedev/antd/dist/reset.css";

import { ConfigProvider } from "antd";
import "@styles/global.css";

import { API_URL } from "src/constants";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {Sider} from "@components/sider/Sider";
import {hasuraProvider, setHasuraAuthToken} from "src/utils/hasuraClient"
import {authProvider} from "../src/utils/authProvider";
import {getResources} from "../src/utils/resources";
import {accessControlProvider} from "../src/utils/accessControlProvider";
import {setCurrentUser} from "../src/utils/storage";
export type ExtendedNextPage = NextPage & {
    noLayout?: boolean;
};

type ExtendedAppProps = AppProps & {
    Component: ExtendedNextPage;
};

const App = (props: React.PropsWithChildren) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { to } = router.query;

    if (status === "loading") {
        return <span>loading...</span>;
    }

    if (status === "authenticated") {
        setCurrentUser(session.user)
        setHasuraAuthToken(session.encodedToken)
    }

    if (status === "unauthenticated") {
        setCurrentUser(null)
        setHasuraAuthToken(null);
    }

    return (
        <>
            <ConfigProvider theme={RefineThemes.Blue} >
                <Refine
                    routerProvider={routerProvider}
                    authProvider={authProvider({to})}
                    dataProvider={{
                        default: dataProvider(API_URL),
                        hasura: hasuraProvider
                    }}
                    accessControlProvider={accessControlProvider}
                    resources={getResources()}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                    notificationProvider={notificationProvider}
                >
                    {props.children}
                    <UnsavedChangesNotifier />
                </Refine>
            </ConfigProvider>
        </>
    );
};

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: ExtendedAppProps): JSX.Element {
    const renderComponent = () => {
        if (Component.noLayout) {
            return <Component {...pageProps} />;
        }

        return (
            <ThemedLayoutV2 Sider={() => (<Sider></Sider>)}>
                <CanAccess>
                    <Component {...pageProps} />
                </CanAccess>
            </ThemedLayoutV2>
        );
    };

    return (
        <SessionProvider session={session}>
            <App>{renderComponent()}</App>
        </SessionProvider>
    );
}

export default MyApp;
