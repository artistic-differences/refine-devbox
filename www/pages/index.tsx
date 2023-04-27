import { NavigateToResource } from "@refinedev/nextjs-router";
import { ExtendedNextPage } from "./_app";
import {getDefaultPath} from "../src/utils/resources";

const Home: ExtendedNextPage = () => {
    return <NavigateToResource resource={getDefaultPath()} />;
};

export default Home;

Home.noLayout = true;
