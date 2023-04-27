import {getResources} from "./resources";
import {getCurrentUser} from "./storage";

export const accessControlProvider = {
    can: async ({ action, params, resource }) => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            return {can: false};
        }
        const resources = getResources();

        console.log('currentUser', currentUser)
        console.log('resources', resources.length)

        const currentResource = resources.find(r=>r.name?.toLowerCase() === resource?.toLowerCase())
        const {role} = currentUser;
        return {
            can : currentResource.meta.roles.includes(role)
        };
        // const enforcer = await newEnforcer(model, adapter);
        // if (
        //     action === "delete" ||
        //     action === "edit" ||
        //     action === "show"
        // ) {
        //     return Promise.resolve({
        //         can: await enforcer.enforce(
        //             role,
        //             `${resource}/${params?.id}`,
        //             action,
        //         ),
        //     });
        // }
        // if (action === "field") {
        //     return Promise.resolve({
        //         can: await enforcer.enforce(
        //             role,
        //             `${resource}/${params?.field}`,
        //             action,
        //         ),
        //     });
        // }
        // return {
        //     can: await enforcer.enforce(
        //         role,
        //         resource,
        //         action,
        //     ),
        // };
    },
}