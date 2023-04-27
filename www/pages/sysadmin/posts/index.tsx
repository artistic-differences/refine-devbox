import { GetServerSideProps } from "next";
import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { getServerSession } from "next-auth";

import { authOptions } from "../../api/auth/[...nextauth]";
import {useSession} from "next-auth/react";

const BlogPostList: React.FC = () => {
    const { data: session, status } = useSession();
    console.log(status)
    console.log(session.encodedClaims)

    return <AntdListInferencer />;
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    console.log(session)

    if (!session) {
        return {
            redirect: {
                destination: "/login?to=/posts",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};

export default BlogPostList;
