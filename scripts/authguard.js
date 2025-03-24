"use strict";
let sessionTimeout;
function resetSessionTimeout() {
    if (sessionTimeout !== undefined) {
        clearTimeout(sessionTimeout);
    }
    sessionTimeout = setTimeout(() => {
        console.warn("[WARNING] session expired due to inactivity.");
        localStorage.removeItem("loggedInUser");
        window.dispatchEvent(new CustomEvent("sessionExpired"));
    }, 15 * 60 * 1000); // session timeout of 15 minutes
}
// Reset the session based on user activity
document.addEventListener("mousemove", resetSessionTimeout);
document.addEventListener("keypress", resetSessionTimeout);
export function AuthGuard() {
    const user = localStorage.getItem("loggedInUser");
    const protectedRoutes = ['/visitorstat', '/eventplanning'];
    if (!user && protectedRoutes.includes(location.hash.slice(1))) {
        console.warn("[AUTHGUARD] Unauthorized access detected. Redirected to login page.");
        window.dispatchEvent(new CustomEvent("sessionExpired"));
    }
    else {
        resetSessionTimeout();
    }
}
//# sourceMappingURL=authguard.js.map