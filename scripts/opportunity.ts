/**
 * Displays the opportunity page details by fetching the details from the json file
 */
export async function DisplayOpportunityPage(){
    console.log("Calling DisplayOpportunityPage...")
    type opportunityPage = {title: string, description: string, datetime: string};
    let opportunities:opportunityPage[] = [];
    try {
        const response = await fetch("./data/opportunity.json");
        if (!response.ok) {
            alert("Error getting opportunity data...");
        }
        opportunities = await response.json()
    }catch(err){
        alert("Error fetching opportunity data...");
    }
    let opportunityMain = document.getElementById("opportunityMain") as HTMLDivElement;
    let card:string =``;
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
    let signUpModalButton = document.getElementById("signUpModalButton") as HTMLButtonElement;
    let signUpInfo = document.getElementById("signUpInfo") as HTMLDivElement;
    signUpModalButton.addEventListener("click", (e:Event):void => {
        e.preventDefault();
        const fullName = document.getElementById("fullName") as HTMLInputElement;
        const email = document.getElementById("email") as HTMLInputElement;
        const preferredRole = document.getElementById("preferredRole") as HTMLInputElement;
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
        const customEvent = event as CustomEvent<string>;
        const currentPath:string = customEvent.detail
        console.log('Modal has been closed.', customEvent.detail);
        signUpInfo.textContent = ``;
    });

}