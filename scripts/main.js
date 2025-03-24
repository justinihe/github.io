/**
 * Name: Ubani Justin
 * Date of completion: 23/02/2025
 * Student ID: 100981036
 */
"use strict";
import { Router } from "./router.js";
import { AuthGuard } from "./authguard.js";
import { LoadHeader } from "./header.js";
import { DisplayOpportunityPage } from "./opportunity.js";
const routes = {
    "/": "views/content/home.html",
    "/home": "views/content/home.html",
    "/events": "views/content/events.html",
    "/opportunity": "views/content/opportunity.html",
    "/gallery": "views/content/gallery.html",
    "/login": "views/content/login.html",
    "/news": "views/content/news.html",
    "/contact": "views/content/contact.html",
    '/visitorstat': 'views/content/visitorstat.html',
    '/eventplanning': 'views/content/eventplanning.html',
    "/404": "views/content/404.html"
};
const pageTitle = {
    "/": "Home",
    "/home": "Home",
    "/events": "Events",
    "/gallery": "Gallery",
    "/login": "Login",
    "/news": "News",
    "/contact": "Contact",
    '/visitorstat': 'Visitorstat',
    '/eventplanning': 'EventPlanning',
    "/404": "Page Not Found",
};
const router = new Router(routes);
//IIFE - Immediately Invoked Functional Expression
(function () {
    /**
     * This is a basic authentication check that prevents
     * logged-in users from being prompted again for login credentials when they visit the login page.
     */
    function DisplayLoginPage() {
        console.log("DisplayLoginPage.......");
        if (localStorage.getItem("loggedInUser")) {
            router.navigate("/");
        }
        document.querySelector(".form-signin").addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent form from refreshing the page
            const email = document.getElementById("floatingInput").value.trim();
            const password = document.getElementById("floatingPassword").value.trim();
            try {
                const response = await fetch("data/login.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const users = await response.json();
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    alert(`Welcome, ${user.name}!`);
                    localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store user data in localStorage
                    router.navigate("/"); // Redirect to another page
                }
                else {
                    alert("Invalid email or password. Please try again.");
                }
            }
            catch (error) {
                console.error("Error fetching user data:", error);
                alert("An error occurred. Please try again later.");
            }
        });
    }
    /**
     * This function fetches a realtime news from the dedicated api gotten
     */
    async function DisplayNewsPage() {
        let displayedHtml = "";
        console.log("Display News Page......");
        const newsDiv = document.getElementById("newsDiv");
        try {
            const response = await fetch("https://api.thenewsapi.com/v1/news/top?api_token=k9jP7ThIaYYbyzKJd5MDY2PHXNdLH08qiwcHbu4r&locale=us&limit=3");
            if (!response.ok) {
                alert("Error getting news");
            }
            const data = await response.json();
            const newsData = data.data;
            newsData.forEach(element => {
                displayedHtml += `
                <div class="col-md-4 my-4">
                  <div class="card">
                    <img src="${element.image_url}" class="card-img-top" alt="${element.title}">
                    <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.description}</p>
                    </div>
                  </div>
                </div>`;
            });
            newsDiv.innerHTML = displayedHtml;
        }
        catch (err) {
            console.error("Error fetching news: ", err);
            alert("Error fetching news: " + err);
        }
    }
    /**
     * This function displays the pictures for the gallery by fetching from the json file
     *
     */
    async function DisplayGalleryPage() {
        let displayedHtml = "";
        const galleryDiv = document.getElementById("galleryDiv");
        console.log("DisplayGalleryPage called...");
        try {
            const response = await fetch("./data/gallery.json");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            displayedHtml = ``;
            data.forEach(element => {
                displayedHtml += `
            <div class="col-md-4">
              <div class="card">
                <img src="${element.image}" class="card-img-top" alt="${element.title}" data-bs-toggle="modal" data-bs-target="#imageModal" data-bs-src="${element.image}" data-bs-title="${element.title}" data-bs-description="${element.description}">
                <div class="card-body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">${element.description}</p>
                </div>
              </div>
            </div>`;
                // Add event listener to handle image click and display in modal
                const modal = document.getElementById('imageModal');
                modal.addEventListener('show.bs.modal', function (event) {
                    // Safely access the relatedTarget and make sure it's an image element
                    const img = event.target;
                    if (img) {
                        const imageSrc = img.getAttribute('data-bs-src');
                        const imageTitle = img.getAttribute('data-bs-title');
                        const imageDescription = img.getAttribute('data-bs-description');
                        // Ensure all attributes exist before proceeding
                        if (imageSrc && imageTitle && imageDescription) {
                            // Set the modal content
                            const lightboxImage = document.getElementById('lightboxImage');
                            const imageModalLabel = document.getElementById('imageModalLabel');
                            const lightboxDescription = document.getElementById('lightboxDescription');
                            lightboxImage.src = imageSrc;
                            imageModalLabel.textContent = imageTitle;
                            lightboxDescription.textContent = imageDescription;
                        }
                    }
                });
            });
            galleryDiv.innerHTML = displayedHtml;
        }
        catch (e) {
            console.error("Error fetching gallery data:", e);
        }
    }
    /**
     * Displays the home page
     */
    function DisplayHomePage() {
        console.log("Calling DisplayHomePage...");
        console.log("Calling DisplayHomePage...");
    }
    function DisplayAboutPage() {
        console.log("Calling DisplayAboutPage...");
    }
    /**
     * A function that takes the contact input and validates them to pop up a modal with appropriate details
     */
    function DisplayContactPage() {
        console.log("Calling DisplayContactPage...");
        let submitMessaage = document.getElementById("submitMessaage");
        let contactInfo = document.getElementById("contactInfo");
        let fullNameContact = document.getElementById("fullNameContact");
        let emailContact = document.getElementById("emailContact");
        let subject = document.getElementById("subject");
        let message = document.getElementById("message");
        const emailRegex = /[^\s@]+@[^\s@]+.[^\s@]+$/;
        submitMessaage.addEventListener("click", async (e) => {
            e.preventDefault();
            if (fullNameContact.value.trim().length <= 0 || emailContact.value.trim().length <= 0 || subject.value.trim().length <= 0 || message.value.trim().length <= 0) {
                contactInfo.textContent = "Please enter valid input values non should be empty";
                throw new Error("Please enter valid input values non should be empty");
            }
            else if (!emailRegex.test(emailContact.value)) {
                contactInfo.textContent = "Please enter a valid email address";
                throw new Error("Please enter a valid email address!");
            }
            else {
                contactInfo.textContent = `${fullNameContact.value.trim()},${emailContact.value.trim()} messaged received`;
                // Create HTML content to display in modal
                const modalBody = document.querySelector('.modal-body');
                // Append new content to the modal body
                modalBody.innerHTML += `
                    <p><strong>Full Name:</strong> ${fullNameContact.value}</p>
                    <p><strong>Email:</strong> ${emailContact.value}</p>
                    <p><strong>Subject:</strong> ${subject.value}</p>
                    <p><strong>Message:</strong> ${message.value}</p>
                `;
                await localStorage.setItem("contactdetails", JSON.stringify(contactInfo));
                const modalConfirmation = new window.bootstrap.Modal(document.getElementById("modalConfirmation"));
                modalConfirmation.show();
                setTimeout(() => {
                    router.navigate("/");
                }, 5000);
            }
        });
    }
    async function DisplayStatPage() {
        try {
            const response = await fetch("/data/visitorstat.json");
            const data = await response.json();
            renderChart(data);
        }
        catch (error) {
            console.error("Error fetching statistics:", error);
        }
    }
    function renderChart(data) {
        const ctx = document.getElementById("visitorChart").getContext("2d");
        new window.Chart(ctx, {
            type: "line",
            data: {
                labels: data.dates,
                datasets: [{
                        label: "Visitors",
                        data: data.visitors,
                        borderColor: "blue",
                        borderWidth: 2,
                        fill: false
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    function GetEventPage() {
        loadEvents();
        const eventForm = document.getElementById("eventForm");
        eventForm.addEventListener("submit", (e) => {
            e.preventDefault();
            createEvent();
        });
    }
    function createEvent() {
        const name = document.getElementById("eventName").value.trim();
        const date = document.getElementById("eventDate").value;
        const time = document.getElementById("eventTime").value;
        const location = document.getElementById("eventLocation").value.trim();
        const description = document.getElementById("eventDescription").value.trim();
        if (!name || !date || !time || !location || !description) {
            alert("All fields are required!");
            return;
        }
        const newEvent = { name, date, time, location, description };
        const events = JSON.parse(localStorage.getItem("events") || "[]");
        events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(events));
        loadEvents();
        document.getElementById("eventForm").reset();
    }
    function loadEvents() {
        const eventList = document.getElementById("eventList");
        eventList.innerHTML = "";
        const events = JSON.parse(localStorage.getItem("events") || "[]");
        events.forEach((event) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${event.name}</strong> - ${event.date} at ${event.time} <br> 
                        <em>${event.location}</em> <br> ${event.description}`;
            eventList.appendChild(li);
        });
    }
    /**
     * Listen for changes and update the navigation links
     */
    document.addEventListener("routeLoaded", (event) => {
        const customEvent = event;
        const newPath = customEvent.detail; //extract the route from the event passed
        console.log(`[INFO] Route Loaded: ${newPath}`);
        LoadHeader().then(() => {
            handlePageLogic(newPath);
        });
    });
    window.addEventListener("sessionExpired", () => {
        console.warn("[SESSION] Redirecting the user due to inactivity.");
        router.navigate("/login");
    });
    /**
     * Displays the events page by fetching all data from the JSON file and rendering it
     */
    async function DisplayEventsPage() {
        console.log("Calling DisplayEventsPage...");
        // Get references to DOM elements
        const searchNav = document.getElementById("searchNav");
        const calendar = document.getElementById("calendar");
        const categoryFilter = document.getElementById("categoryFilter");
        if (!calendar || !searchNav || !categoryFilter) {
            console.error("Required DOM elements not found.");
            return;
        }
        let events = [];
        try {
            const response = await fetch("./data/event.json");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            events = await response.json();
            // Debugging: Check if events are fetched
            console.log("Fetched events:", events);
        }
        catch (error) {
            console.error("Error fetching events:", error);
            alert("Error getting events. Please try again later.");
            return;
        }
        // Function to render events based on filter
        function renderEvents(filter = "all") {
            if (!calendar)
                return;
            calendar.innerHTML = ""; // Clear previous events
            // Filter events by category or title
            const filteredEvents = filter === "all"
                ? events
                : events.filter(event => event.category.toLowerCase().includes(filter.toLowerCase()) ||
                    event.title.toLowerCase().includes(filter.toLowerCase()));
            // Debugging: Check how many events are found
            console.log("Filtered events:", filteredEvents.length);
            if (filteredEvents.length === 0) {
                calendar.innerHTML = `<p class="text-muted">No events found.</p>`;
                return;
            }
            filteredEvents.forEach(event => {
                const eventElement = document.createElement("div");
                eventElement.className = "event card p-3 mb-2 shadow-sm";
                eventElement.innerHTML = `
                <h5 class="event-title">${event.title}</h5>
                <p class="event-date"><strong>Date:</strong> ${new Date(event.date).toDateString()}</p>
                <p class="event-category"><strong>Category:</strong> ${event.category}</p>
            `;
                calendar.appendChild(eventElement);
            });
        }
        // Event listeners for search and category filtering
        searchNav.addEventListener("input", (e) => {
            renderEvents(e.target.value);
        });
        categoryFilter.addEventListener("change", (e) => {
            renderEvents(e.target.value);
        });
        // Initial rendering of all events
        renderEvents();
    }
    function LoadFooter() {
        // Create the footer element
        const footer = document.createElement('footer');
        footer.className = 'footer-nav';
        // Add links for Privacy Policy and Terms of Service
        footer.innerHTML = `
  <div class="footer-content">
    <a href="#" class="footer-link">Privacy Policy</a>
    <a href="#" class="footer-link">Terms of Service</a>
  </div>
`;
        // Append the footer to the body
        document.body.appendChild(footer);
    }
    // Create the "Back to Top" button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.textContent = 'Back to Top';
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);
    // Show the button when the user scrolls down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            backToTopBtn.style.display = 'block';
        }
        else {
            backToTopBtn.style.display = 'none';
        }
    });
    // Scroll smoothly to the top when the button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    async function handlePageLogic(path) {
        const protectedRoutes = ['/visitorstat', "/eventplanning"];
        if (protectedRoutes.includes(path)) {
            AuthGuard(); //redirected to /login if not authenticated
        }
        document.title = pageTitle[path] || "Untitled Page";
        const currentPath = location.hash.slice(1) || "/";
        const navLinks = document.querySelectorAll("nav a");
        navLinks.forEach(link => {
            const linkPath = link.getAttribute("href").replace("#", "");
            if (currentPath === linkPath || currentPath === "/opportunity") {
                link.classList.add("active");
            }
            else {
                link.classList.remove("active");
            }
        });
        switch (path) {
            case "/":
                DisplayHomePage();
                break;
            case "/opportunity":
                DisplayOpportunityPage();
                break;
            case "/events":
                DisplayEventsPage();
                break;
            case "/contact":
                DisplayContactPage();
                break;
            case "/about":
                DisplayAboutPage();
                break;
            case "/gallery":
                await DisplayGalleryPage();
                break;
            case "/news":
                await DisplayNewsPage();
                break;
            case "/login":
                DisplayLoginPage();
                break;
            case '/visitorstat':
                DisplayStatPage();
                break;
            default:
                console.warn(`[WARNING] No display logic found for: ${path}`);
        }
    }
    async function Start() {
        console.log("Starting App...");
        // Load header first then run CheckLogin
        await LoadHeader();
        await LoadFooter();
        await AuthGuard();
        const currentPath = location.hash.slice(1) || "/";
        router.loadRoute(currentPath);
        await handlePageLogic(currentPath);
    }
    window.addEventListener("DOMContentLoaded", () => {
        console.log("DOM fully loaded and parsed");
        Start().then().catch(console.error);
    });
})();
//# sourceMappingURL=main.js.map