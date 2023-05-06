import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import * as jsonwebtoken from "jsonwebtoken";

export const authOptions: NextAuthOptions  = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                // TODO: Request your API to check credentials
                console.log(
                    "credentials",
                    JSON.stringify(credentials, null, 2),
                );
                if (credentials?.email?.includes("admin")) {
                    return  {
                        id: "1",
                        name: "Admin",
                        email: credentials?.email,
                        image: "https://i.pravatar.cc/301",
                    }
                }

                return {
                    id: "2",
                    name: "User",
                    email: credentials?.email,
                    image: "https://i.pravatar.cc/300",
                }
            },
        }),
    ],
    secret:  process.env["JWT_SECRET"],

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

                const role = user.email?.includes("admin") ? "admin" : "user";

                console.log(role)

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
                const secret = process.env["JWT_SECRET"]?.toString()
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
