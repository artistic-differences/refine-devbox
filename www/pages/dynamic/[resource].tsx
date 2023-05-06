import { AntdListInferencer } from "@refinedev/inferencer/antd";
import {useRouter} from "next/router";

const DynamicLists: React.FC = () => {
    const router = useRouter();
    const {resource} = router.query

    return <AntdListInferencer resource={resource} action="list" />;
};


export default DynamicLists;
