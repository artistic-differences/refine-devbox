import {AuthBindings} from "@refinedev/core";
import {signIn, signOut} from "next-auth/react";

export const authProvider = ({to}):AuthBindings => {
    return {
        login: async ({providerName, email, password}) => {
            if (providerName) {
                signIn(providerName, {
                    callbackUrl: to ? to.toString() : "/",
                    redirect: true,
                });

                return {
                    success: true,
                };
            }

            signIn("credentials", {
                email,
                password,
                callbackUrl: to ? to.toString() : "/",
                redirect: true,
            });

            return {
                success: true,
            };
        },
        logout: async () => {
            signOut({
                redirect: true,
                callbackUrl: "/login",
            });

            return {
                success: true,
            };
        },
        onError: async (error) => {
            console.error(error);
            return {
                error,
            };
        },
        check: async () => {
            if (status === "unauthenticated") {
                return {
                    authenticated: false,
                    redirectTo: "/login",
                };
            }

            return {
                authenticated: true,
            };
        },
        getPermissions: async () => {
            return null;
        },
        getIdentity: async () => {
            if (data?.user) {
                const {user} = data;
                return {
                    name: user.name,
                    avatar: user.image,
                };
            }

            return null;
        },
    }
};
