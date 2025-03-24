"use strict";

/**
 * Loads the navbar into the current page
 * @returns {Promise<void>}
 */

/**
 * This function loads the navbar to all parts of the webpage
 */
export async function LoadHeader(){
    console.log("[INFO]  LoadHeader called...");

    return fetch("views/components/header.html")
        .then(response => response.text())
        .then(data => {
            (document.querySelector("header")as HTMLElement).innerHTML = data;
            console.log(data);
            CheckLogin();
            updateActiveNavLink();
        })
        .catch(error => console.log("[ERROR] unable to load header"));

}

/**
 * A function that automatically updates the links
 * based on conditions like if the user is logged in or not
 */
function updateActiveNavLink(){
    console.log("[INFO] updateActiveNavLink called.....");

    // Select the navbar element
    const navbar = document.querySelector('.navbar-nav') as HTMLElement;
    // Add the "Donate" link
    const donateLink = document.createElement('a') as HTMLAnchorElement;
    const donateLink2 = document.createElement('li') as HTMLElement;
    donateLink2.className = "nav-item";
    donateLink.href = '#';
    donateLink.textContent = 'Donate';
    donateLink.className = 'nav-link';
    donateLink2.appendChild(donateLink);
    navbar.appendChild(donateLink2);

    // Update the "Opportunities" link text to "Volunteer Now"
    const opportunitiesLink = document.getElementById('opportune') as HTMLElement;
    if (opportunitiesLink) {
        opportunitiesLink.textContent = 'Volunteer Now';
    }

}


function handleLogout(event:Event){
    event.preventDefault();
    localStorage.removeItem("loggedInUser");
    console.log("[INFO] User logged out. Update UI...");

    LoadHeader().then(()=> {
        location.hash = "/";
    })
}
/**
 * Checks if the user is logged in already to update the nav link to log out
 *
 */
export function CheckLogin(){
    console.log("[INFO] Checking user login status");

    const loginNav = document.querySelector('nav a[href="#/login"]') as HTMLAnchorElement;
    console.log(loginNav);
    if(!loginNav){
        console.warn("[WARNING] loginNav element not found. skipping CheckLogin().")
        return;
    }

    const userSession:string|null = localStorage.getItem("loggedInUser");

    if(userSession){
        loginNav.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
        loginNav.href = "#";
        loginNav.removeEventListener("click", handleLogout);
        loginNav.addEventListener("click", handleLogout);
    }else{
        loginNav.innerHTML = `<i class="fas fa-sign-out-alt"></i> Login`;
        loginNav.removeEventListener("click", handleLogout);
        loginNav.addEventListener("click", ()=> location.hash ="/login" );
    }
}