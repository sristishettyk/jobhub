// Search jobs
const searchButton = document.getElementById("search-btn");

searchButton.addEventListener("click", function () {

    const keyword = document.getElementById("search-keyword").value.toLowerCase();
    const location = document.getElementById("search-location").value.toLowerCase();

    const jobCards = document.querySelectorAll(".job-card");

    jobCards.forEach(function (card) {

        const jobTitle = card.querySelector("h3").innerText.toLowerCase();
        const jobLocation = card.querySelector("p:nth-of-type(2)").innerText.toLowerCase();

        if (jobTitle.includes(keyword) && jobLocation.includes(location)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
});
// MAKE DYNAMIC APPLY BUTTONS WORK
document.addEventListener("click", function(event) {

    if (event.target.classList.contains("apply-btn")) {

        const jobCard = event.target.closest(".job-card");
        const jobTitle = jobCard.querySelector("h3").innerText;

        document.getElementById("application-section").scrollIntoView({
            behavior: "smooth"
        });

       document.getElementById("job-title").value = jobTitle; 
    }

});


// Submit application
const applicationForm = document.getElementById("application-form");

applicationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("applicant-name").value;
    const email = document.getElementById("applicant-email").value;
    const jobTitle = document.getElementById("job-title").value;
    const coverLetter = document.getElementById("cover-letter").value;

    fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            jobTitle: jobTitle,
            coverLetter: coverLetter
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        applicationForm.reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Application could not be submitted.");
    });
});
// Post a Job
const jobForm = document.getElementById("job-form");

jobForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("application-job-title").value;
    const company = document.getElementById("company").value;
    const location = document.getElementById("job-location").value;
    const type = document.getElementById("job-type").value;
    const description = document.getElementById("job-description").value;

    fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            company: company,
            location: location,
            type: type,
            description: description
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        jobForm.reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Job could not be posted.");
    });
});
// LOAD JOBS FROM MONGODB
async function loadJobs() {
    try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const jobs = await response.json();

        const jobContainer = document.querySelector(".job-container");

        jobContainer.innerHTML = "";

        jobs.forEach(function(job) {
            const jobCard = document.createElement("div");
            jobCard.className = "job-card";

            jobCard.innerHTML = `
                <h3>${job.title}</h3>
                <p>Company: ${job.company}</p>
                <p>Location: ${job.location}</p>
                <p>Type: ${job.type}</p>
                <p>${job.description}</p>
                <button class="apply-btn">Apply Now</button>
            `;

            jobContainer.appendChild(jobCard);
            const applyButton = jobCard.querySelector(".apply-btn");

applyButton.addEventListener("click", function () {
    document.getElementById("job-title").value = job.title;

    document.getElementById("application-section").scrollIntoView({
        behavior: "smooth"
    });
});
        });

    } catch (error) {
        console.error("Error loading jobs:", error);
    }
}

loadJobs();
document.addEventListener("click", function (event) {

    if (event.target.classList.contains("apply-btn")) {

        const jobCard = event.target.closest(".job-card");
        const jobTitle = jobCard.querySelector("h3").innerText;

        document.getElementById("job-title").value = jobTitle;

        document.getElementById("application-section").scrollIntoView({
            behavior: "smooth"
        });
    }

});
// MAKE DYNAMIC APPLY BUTTONS WORK
// Create Profile
const profileForm = document.getElementById("profile-form");

profileForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("profile-name").value;
    const email = document.getElementById("profile-email").value;
    const phone = document.getElementById("profile-phone").value;
    const skills = document.getElementById("profile-skills").value;
    const education = document.getElementById("profile-education").value;
    const experience = document.getElementById("profile-experience").value;

    fetch("http://localhost:5000/api/profiles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            skills: skills,
            education: education,
            experience: experience
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        profileForm.reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Profile could not be created.");
    });
});