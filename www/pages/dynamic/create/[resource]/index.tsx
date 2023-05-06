import { AntdCreateInferencer } from "@refinedev/inferencer/antd";
import {useRouter} from "next/router";

const DynamicCreate: React.FC = () => {
    const router = useRouter();
    const {id, resource}  = router.query

    return <AntdCreateInferencer resource={resource} action="create" />;
};


export default DynamicCreate;
