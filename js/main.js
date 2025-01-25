/**
 * Name: Ubani Justin
 * Date of completion: 25/01/2025
 */
"use strict";

//IIFE - Immediately Invoked Functional Expression
(function () {

    function DisplayHomePage() {
        console.log("Calling DisplayHomePage...")
    }
    function DisplayOpportunityPage(){
        console.log("Calling DisplayOpportunityPage...")
        const opportunities = [
            {
                title: "Community Clean-Up",
                description: "Join us in cleaning up local parks and public spaces to make our community beautiful and sustainable.",
                datetime: "2025-02-10 09:00:00",
            },
            {
                title: "Food Drive Assistance",
                description: "Help us organize and distribute food donations to families in need.",
                datetime: "2025-02-15 13:00:00",
            },
            {
                title: "Youth Mentorship Program",
                description: "Be a mentor to young individuals, guiding them in their education and personal growth.",
                datetime: "2025-02-20 17:00:00",
            },
            {
                title: "Animal Shelter Support",
                description: "Assist in caring for animals and helping with adoptions at the local shelter.",
                datetime: "2025-02-25 10:00:00",
            },
            {
                title: "Beach Cleanup",
                description: "Help us keep our beaches clean and safe for everyone to enjoy.",
                datetime: "2025-03-05 08:00:00",
            },
            {
                title: "Hospital Volunteer Program",
                description: "Provide support to patients and staff by volunteering in non-clinical roles.",
                datetime: "2025-03-12 09:00:00",
            },
            {
                title: "Tree Planting Event",
                description: "Join us in planting trees to promote a greener and healthier environment.",
                datetime: "2025-03-20 14:00:00",
            },
            {
                title: "Senior Assistance Program",
                description: "Spend time with seniors, helping with daily tasks and providing companionship.",
                datetime: "2025-03-28 15:00:00",
            },
            {
                title: "Fundraising Event Support",
                description: "Assist with organizing and running a fundraising event to support local initiatives.",
                datetime: "2025-04-02 10:00:00",
            },
            {
                title: "Library Volunteer Assistance",
                description: "Help organize books, run events, and assist visitors at the community library.",
                datetime: "2025-04-10 12:00:00",
            },
        ];
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
    function DisplayEventsPage(){
        console.log("Calling DisplayServicesPage...")
        // Mock data for events
        const events = [
            { id: 1, title: "Charity Walk", date: "2025-01-26", category: "Fundraisers" },
            { id: 2, title: "Coding Workshop", date: "2025-01-27", category: "Workshops" },
            { id: 3, title: "Beach Cleanup", date: "2025-01-28", category: "Cleanups" },
            { id: 4, title: "Art Fundraiser", date: "2025-01-29", category: "Fundraisers" },
            { id: 5, title: "Photography Workshop", date: "2025-01-30", category: "Workshops" },
        ];

        // Get references to DOM elements
        const calendar = document.getElementById("calendar");
        const categoryFilter = document.getElementById("categoryFilter");

        // Function to render events
        function renderEvents(filter = "all") {
            calendar.innerHTML = ""; // Clear previous events

            // Filter events by selected category
            const filteredEvents = filter === "all" ? events : events.filter(event => event.category === filter);

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
    function DisplayContactPage(){
        console.log("Calling DisplayContactPage...")
        let submitMessaage = document.getElementById("submitMessaage");
        let contactInfo = document.getElementById("contactInfo");
        const emailRegex = /[^\s@]+@[^\s@]+.[^\s@]+$/;
        submitMessaage.addEventListener("click", e => {
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
                fullNameContact.value = "";
                emailContact.value = "";
                subject.value = "";
                message.value = "";
                const modalConfirmation = new bootstrap.Modal(document.getElementById("modalConfirmation"));
                modalConfirmation.show();
                setTimeout(()=>{
                    window.location.href = "index.html";
                }, 5000)
            }
        })

    }
    // Select the navbar element
    const navbar = document.querySelector('.navbar-nav');

// Add the "Donate" link
    const donateLink = document.createElement('a');
    const donateLink2 = document.createElement('li');
    donateLink2.className = "nav-item";
    donateLink.href = '/donate.html';
    donateLink.textContent = 'Donate';
    donateLink.className = 'nav-link';
    donateLink2.appendChild(donateLink);
    navbar.appendChild(donateLink2);

// Update the "Opportunities" link text to "Volunteer Now"
    const opportunitiesLink = document.getElementById('opportune')
    if (opportunitiesLink) {
        opportunitiesLink.textContent = 'Volunteer Now';
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

    function start() {
        console.log("Starting Application");

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
        }
    }
    window.addEventListener("load", start);

})()