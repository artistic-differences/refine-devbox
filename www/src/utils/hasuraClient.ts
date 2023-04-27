import dataProvider , {GraphQLClient} from "@refinedev/hasura";

const HASURA_URL = "http://localhost:8083/v1/graphql"
const client = new GraphQLClient(HASURA_URL, {
    headers: {
        "x-hasura-role": "public",
    },
});

export function setHasuraAuthToken(token) {
    if (token) {
        return client.setHeader('Authorization', 'Bearer ' + token)
    }
    return client.setHeader('Authorization', null)
}

export const hasuraProvider = dataProvider(client);