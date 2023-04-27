import NextAuth, { Awaitable, User, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";
import KeycloakProvider from "next-auth/providers/keycloak";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import * as jsonwebtoken from "jsonwebtoken";

export const authOptions: NextAuthOptions  = {
    // Configure one or more authentication providers
    providers: [
        // !!! Should be stored in .env file.
        GoogleProvider({
            clientId: `1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com`,
            clientSecret: `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`,
        }),
        Auth0Provider({
            clientId: `Be5vsLunFvpzPf4xfXtaMxrZUVBjjNPO`,
            clientSecret: `08F9X84FvzpsimV16CQvlQuwJOlqk-GqQgEdcq_3xzrn1K3UHnTCcRgMCwBW7api`,
            issuer: `https://dev-qg1ftdys736bk5i3.us.auth0.com`,
        }),
        KeycloakProvider({
            clientId: `refine-demo`,
            clientSecret: `refine`,
            issuer: `https://lemur-0.cloud-iam.com/auth/realms/refine`,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name ?? profile.preferred_username,
                    email: profile.email,
                    image: `https://faces-img.xcdn.link/thumb-lorem-face-6312_thumb.jpg`,
                };
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                // TODO: Request your API to check credentials
                console.log(
                    "credentials",
                    JSON.stringify(credentials, null, 2),
                );
                if (credentials.email==="sysadmin@keyzo.com") {
                    return  {
                        id: "1",
                        name: "Sys Admin",
                        email: "sysadmin@keyzo.com",
                        image: "https://i.pravatar.cc/301",
                    }
                }

                return {
                    id: "2",
                    name: "John Doe",
                    email: "demo@refine.dev",
                    image: "https://i.pravatar.cc/300",
                }


                // const user: Awaitable<User> = {
                //     id: "1",
                //     name: "John Doe",
                //     email: "demo@refine.dev",
                //     image: "https://i.pravatar.cc/300",
                // };
                // return user;
            },
        }),
    ],
    secret: `UItTuD1HcGXIj8ZfHUswhYdNd40Lc325R8VlxQPUoR0=`,

    theme: {
        colorScheme: "auto",
    },
    // Use JWT strategy so we can forward them to Hasura
    session: { strategy: "jwt" },
    // Encode and decode your JWT with the HS256 algorithm
    jwt: {
        encode: ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign(token!, secret, {
                algorithm: "HS256",
            });
            return encodedToken;
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret, {
                algorithms: ["HS256"],
            });
            return decodedToken as JWT;
        },
    },
    callbacks: {
        // Add the required Hasura claims
        // https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#the-spec
        async jwt({ token, session, profile, user, account }) {

            if (user || profile || account) {
                //query data to find out our additional claims and add them here.
                //search based on user.email, profile.email or account.email

                const role = user.email === "sysadmin@keyzo.com" ? "admin" : "user";

                token.hasuraClaims = {
                    "https://hasura.io/jwt/claims": {
                        "x-hasura-allowed-roles": ["public, user, admin"],
                        "x-hasura-default-role": "public",
                        "x-hasura-role": role,
                        "x-hasura-user-id": token.sub,
                    },
                }
            }
            return token;

        },
        // Add user ID to the session
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.sub!;
                session.user.role = token.hasuraClaims["https://hasura.io/jwt/claims"]["x-hasura-role"];
                const secret = `UItTuD1HcGXIj8ZfHUswhYdNd40Lc325R8VlxQPUoR0=`;
                //add the encoded hasura claims into the session so we can use these on the client
                //or server when making a request to hasura
                session.encodedToken =  jsonwebtoken.sign(token.hasuraClaims, secret, {
                    algorithm: "HS256",
                });
            }
            return session;
        },
    },

};
export default NextAuth(authOptions);
