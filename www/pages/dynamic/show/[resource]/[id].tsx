import { AntdShowInferencer } from "@refinedev/inferencer/antd";
import {useRouter} from "next/router";

const DynamicShow: React.FC = () => {
    const router = useRouter();
    const {id, resource}  = router.query

    return <AntdShowInferencer resource={resource} action="show" id={id} />;
};


export default DynamicShow;
