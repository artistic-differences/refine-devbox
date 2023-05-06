import {getCurrentUser} from "./storage";
import resources from "./resources.json";

export const getDefaultPath = () => {
    const currentUser = getCurrentUser();
    console.log('currentUser', currentUser);

    if (!currentUser) {
        return "";
    }
    return currentUser.role == "admin" ? "accounts" : "userAccount";
}

export const getResources = () => {
    return(resources.resources)
}