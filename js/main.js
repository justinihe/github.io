/**
 * Name: Ubani Justin
 * Date of completion: 23/02/2025
 * Student ID: 100981036
 */
"use strict";

//IIFE - Immediately Invoked Functional Expression
(function () {

    /**
     * This is a basic authentication check that prevents
     * logged-in users from being prompted again for login credentials when they visit the login page.
     */
    function DisplayLoginPage(){
        console.log("DisplayLoginPage.......");
        if(localStorage.getItem("loggedInUser")){
            location.href = "index.html";
        }
        document.querySelector(".form-signin").addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent form from refreshing the page

            const email = document.getElementById("floatingInput").value.trim();
            const password = document.getElementById("floatingPassword").value.trim();

            try {
                const response = await fetch("./data/login.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const users = await response.json();
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    alert(`Welcome, ${user.name}!`);
                    localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store user data in localStorage
                    window.location.href = "index.html"; // Redirect to another page
                } else {
                    alert("Invalid email or password. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert("An error occurred. Please try again later.");
            }
        });
    }

    /**
     * This function fetches a realtime news from the dedicated api gotten
     */
    async function DisplayNewsPage(){
        let displayedHtml = ""
        console.log("Display News Page......");
        const newsDiv = document.getElementById("newsDiv");
        try{
            const response = await fetch("https://api.thenewsapi.com/v1/news/top?api_token=k9jP7ThIaYYbyzKJd5MDY2PHXNdLH08qiwcHbu4r&locale=us&limit=3")
            if(!response.ok){
                alert("Error getting news")
            }
            const data = await response.json();
            const newsData = data.data
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
        } catch(err){
            console.error("Error fetching news: ", err);
            alert("Error fetching news: " + err);
        }
    }

    /**
     * This function displays the pictures for the gallery by fetching from the json file
     *
     */
    async function DisplayGalleryPage(){
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

            displayedHtml = ``

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
                    // Get the image that was clicked
                    const img = event.relatedTarget;
                    const imageSrc = img.getAttribute('data-bs-src');
                    const imageTitle = img.getAttribute('data-bs-title');
                    const imageDescription = img.getAttribute('data-bs-description');

                    // Set the modal content
                    document.getElementById('lightboxImage').src = imageSrc;
                    document.getElementById('imageModalLabel').textContent = imageTitle;
                    document.getElementById('lightboxDescription').textContent = imageDescription;
                });

            });

            galleryDiv.innerHTML = displayedHtml;
        } catch (e) {
            console.error("Error fetching gallery data:", e);
        }
    }

    /**
     * This function loads the navbar to all parts of the webpage
     */
    async function LoadHeader(){
        console.log("[INFO]  LoadHeader called...");

        return fetch("header.html")
            .then(response => response.text())
            .then(data => {
                document.querySelector("header").innerHTML = data;
                console.log(data);
                updateActiveNavLink();
            })
            .catch(error => console.log("[ERROR] unable to load header"));

    }

    /**
     * Displays the home page
     * @constructor
     */
    function DisplayHomePage() {
        console.log("Calling DisplayHomePage...")
    }

    /**
     * Displays the opportunity page details by fetching the details from the json file
     * @returns {Promise<void>}
     */
    async function DisplayOpportunityPage(){
        console.log("Calling DisplayOpportunityPage...")
        let opportunities = [];
        try {
            const response = await fetch("./data/opportunity.json");
            if (!response.ok) {
                alert("Error getting opportunity data...");
            }
            opportunities = await response.json()
        }catch(err){
            alert("Error fetching opportunity data...");
        }
        let opportunityMain = document.getElementById("opportunityMain");
        let card =``;
        opportunities.map((eachCard) => {
            return card += `<div class="card text-bg-info mx-2 mb-3" style="max-width: 23rem;">
                              <h5 class="card-header">${eachCard.title}</h5>
                              <div class="card-body">
                                <p class="card-text">${eachCard.description}</p>
                                <h6 class="card-title">${eachCard.datetime}</h6>
                                <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Sign Up</a>
                              </div>
                            </div>`
        })
        opportunityMain.innerHTML = card;
        let signUpModalButton = document.getElementById("signUpModalButton");
        let signUpInfo = document.getElementById("signUpInfo");
        signUpModalButton.addEventListener("click", (e) => {
            e.preventDefault();
            const emailRegex = /[^\s@]+@[^\s@]+.[^\s@]+$/;
            if(fullName.value.trim().length <= 0 || email.value.trim().length <= 0 || preferredRole.value.trim().length <= 0) {
                signUpInfo.textContent = "Please enter valid input values non should be empty";
                throw new Error("Please enter valid input values non should be empty")
            }
            else if(!emailRegex.test(email.value)){
                signUpInfo.textContent = "Please enter a valid email address";
                throw new Error("Please enter a valid email address!");
            }else {
                signUpInfo.textContent = `${fullName.value.trim()},${email.value.trim()},${preferredRole.value.trim()} is registered`;
                fullName.value = "";
                email.value = "";
                preferredRole.value = "";
            }

        })
        // Event handler for modal close
        document.addEventListener('hide.bs.modal', (event) => {
            console.log('Modal has been closed.', event.detail);
            signUpInfo.textContent = ``;
        });

    }

    /**
     * Displays the events page by fetching all data from the json file to load the page
     */
    async function DisplayEventsPage(){
        console.log("Calling DisplayServicesPage...")
        const searchNav = document.getElementById("searchNav");
        // Mock data for events
        let events = [];
        try {
            const response = await fetch("./data/event.json");
            if (!response.ok) {
                alert("Error getting events...");
            }
            events = await response.json();
        }catch (err){
            alert("Error getting events...");
        }

        searchNav.addEventListener("input", async (e) => {
            await renderEvents(e.target.value);
        })
        // Get references to DOM elements
        const calendar = document.getElementById("calendar");
        const categoryFilter = document.getElementById("categoryFilter");

        // Function to render events
        function renderEvents(filter = "all") {
            calendar.innerHTML = ""; // Clear previous events

            // Filter events by selected category
            const filteredEvents = filter === "all" ? events : events.filter(event => event.category.toLowerCase().includes(filter.toLowerCase()) || event.title.toLowerCase().includes(filter.toLowerCase()));

            filteredEvents.forEach(event => {
                const eventElement = document.createElement("div");
                eventElement.className = "event";
                eventElement.innerHTML = `
              <div class="event-title">${event.title}</div>
              <div class="event-date">${event.date}</div>
              <div class="event-category">Category: ${event.category}</div>
                `;
                calendar.appendChild(eventElement);
            });
        }

// Event listener for filter change
        categoryFilter.addEventListener("change", e => {
            renderEvents(e.target.value);
        });

// Initial render
        renderEvents();

    }
    function DisplayAboutPage(){
        console.log("Calling DisplayAboutPage...")
    }

    /**
     * A function that takes the contact input and validates them to pop up a modal with appropriate details
     */
    function DisplayContactPage(){
        console.log("Calling DisplayContactPage...")
        let submitMessaage = document.getElementById("submitMessaage");
        let contactInfo = document.getElementById("contactInfo");
        const emailRegex = /[^\s@]+@[^\s@]+.[^\s@]+$/;
        submitMessaage.addEventListener("click", async e => {
            e.preventDefault();
            if(fullNameContact.value.trim().length <= 0 || emailContact.value.trim().length <= 0 || subject.value.trim().length <= 0 || message.value.trim() <=0) {
                contactInfo.textContent = "Please enter valid input values non should be empty";
                throw new Error("Please enter valid input values non should be empty")
            }
            else if(!emailRegex.test(emailContact.value)){
                contactInfo.textContent = "Please enter a valid email address";
                throw new Error("Please enter a valid email address!");
            }else {
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
                const modalConfirmation = new bootstrap.Modal(document.getElementById("modalConfirmation"));
                modalConfirmation.show();
                setTimeout(()=>{
                    window.location.href = "index.html";
                }, 5000)
            }
        })

    }


    /**
     * A function that automatically updates the links
     * based on conditions like if the user is logged in or not
     */
    function updateActiveNavLink(){
        console.log("[INFO] updateActiveNavLink called.....");
        const loginLink = document.querySelector('nav a[href="./login.html"]');
        if(localStorage.getItem("loggedInUser")){
            loginLink.textContent = "Logout";
        }
        loginLink.addEventListener("click", e => {
            localStorage.removeItem("loggedInUser");
            location.href="index.html";
        })
        // Select the navbar element
        const navbar = document.querySelector('.navbar-nav');
        // Add the "Donate" link
        const donateLink = document.createElement('a');
        const donateLink2 = document.createElement('li');
        donateLink2.className = "nav-item";
        donateLink.href = '#';
        donateLink.textContent = 'Donate';
        donateLink.className = 'nav-link';
        donateLink2.appendChild(donateLink);
        navbar.appendChild(donateLink2);

        // Update the "Opportunities" link text to "Volunteer Now"
        const opportunitiesLink = document.getElementById('opportune')
        if (opportunitiesLink) {
            opportunitiesLink.textContent = 'Volunteer Now';
        }


        const currentPage = document.title.trim();
        const navLinks = document.querySelectorAll("nav a");

        navLinks.forEach(link => {

            if(link.textContent.trim() === currentPage || document.title === "Opportunity"){
                link.classList.add("active");
            }else {
                link.classList.remove("active");
            }
        })
    }


    // Create the footer element
    const footer = document.createElement('footer');
    footer.className = 'footer-nav';

// Add links for Privacy Policy and Terms of Service
    footer.innerHTML = `
  <div class="footer-content">
    <a href="/privacy-policy.html" class="footer-link">Privacy Policy</a>
    <a href="/terms-of-service.html" class="footer-link">Terms of Service</a>
  </div>
`;

// Append the footer to the body
    document.body.appendChild(footer);

// Create the "Back to Top" button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.textContent = 'Back to Top';
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);

// Show the button when the user scrolls down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            backToTopBtn.style.display = 'block';
        } else {
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

    async function start() {
        console.log("Starting Application");
        await LoadHeader();
        switch (document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Opportunity":
                DisplayOpportunityPage();
                break;
            case "Events":
                DisplayEventsPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "About":
                DisplayAboutPage();
                break;
            case "Gallery":
                DisplayGalleryPage();
                break;
            case "News":
                DisplayNewsPage();
                break;
            case "Login":
                DisplayLoginPage();

        }
    }
    window.addEventListener("load", start);

})()