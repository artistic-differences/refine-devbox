import {ThemedSiderV2} from "@refinedev/antd";
import {SiderTitle} from "./SiderTitle";

export const Sider = () => {
    return (
        <ThemedSiderV2
            Title={({ collapsed }) => (
                <SiderTitle collapsed={collapsed} />
            )}
        />
    );
};