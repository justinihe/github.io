"use strict";

let sessionTimeout: number | undefined;

function resetSessionTimeout(): void {
    if (sessionTimeout !== undefined) {
        clearTimeout(sessionTimeout);
    }
    sessionTimeout = setTimeout((): void => {
        console.warn("[WARNING] session expired due to inactivity.");
        localStorage.removeItem("loggedInUser");
        window.dispatchEvent(new CustomEvent("sessionExpired"));
    }, 15 * 60 * 1000); // session timeout of 15 minutes
}

// Reset the session based on user activity
document.addEventListener("mousemove", resetSessionTimeout);
document.addEventListener("keypress", resetSessionTimeout);

export function AuthGuard(): void {

    const user: string | null = localStorage.getItem("loggedInUser");
    const protectedRoutes: string[] = ['/visitorstat', '/eventplanning'];

    if (!user && protectedRoutes.includes(location.hash.slice(1) as string)) {
        console.warn("[AUTHGUARD] Unauthorized access detected. Redirected to login page.");

        window.dispatchEvent(new CustomEvent("sessionExpired"));
    } else {
        resetSessionTimeout();
    }
}
