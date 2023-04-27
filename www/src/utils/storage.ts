
export function setCurrentUser(user) {
    if (typeof window !== 'undefined') {
        window.sessionStorage.setItem("CurrentUser", JSON.stringify(user));
    }
}

export function getCurrentUser() {
    if (typeof window !== 'undefined') {
        let currentUser = window.sessionStorage.getItem("CurrentUser");
        return currentUser ? JSON.parse(currentUser) : null;
    }
    return null;
}
