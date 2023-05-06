import { AntdEditInferencer } from "@refinedev/inferencer/antd";
import {useRouter} from "next/router";

const DynamicEdit: React.FC = () => {
    const router = useRouter();
    const {id, resource}  = router.query

    return <AntdEditInferencer resource={resource} action="edit" id={id} />;
};


export default DynamicEdit;
