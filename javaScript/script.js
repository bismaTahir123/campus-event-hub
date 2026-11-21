
document.addEventListener("DOMContentLoaded", function() {

    const navbar = document.createElement("nav");
    navbar.className = "navbar navbar-expand-lg navbar-dark";

    navbar.innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand" href="index.html">
                Campus Events Hub
            </a>

            <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="mainNavbar">

                <ul class="navbar-nav ms-auto">

                    <li class="nav-item">
                         <a class="nav-link" href="index.html">Home</a>
                    </li>

                    <li class="nav-item">
                         <a class="nav-link" href="news.html">Department News</a>
                    </li>

                    <li class="nav-item">
                         <a class="nav-link" href="events.html">Upcoming Events</a>
                    </li>

                    <li class="nav-item">
                         <a class="nav-link" href="clubs.html">Clubs & Societies</a>
                    </li>

                    <li class="nav-item">
                         <a class="nav-link" href="resources.html">Resources</a>
                    </li>

                    <li class="nav-item">
                         <a class="nav-link" href="contact.html">Contact Us</a>
                    </li>

                </ul>

            </div>
        </div>
    `;
    document.body.insertBefore(navbar, document.body.firstChild);


    const themeButton = document.createElement("button");

    themeButton.textContent = "Dark Mode";
    themeButton.className = "btn btn-light ms-3";
    themeButton.id = "themeButton";

    navbar.querySelector(".container-fluid").appendChild(themeButton);
 let savedTheme = localStorage.getItem("websiteTheme");

    if (savedTheme === "dark") {
        document.body.setAttribute("data-theme", "dark");
        themeButton.textContent = "Light Mode";
    }


    themeButton.addEventListener("click", function() {

        if (document.body.getAttribute("data-theme") === "dark") {
            document.body.removeAttribute("data-theme");
            themeButton.textContent = "Dark Mode";
            localStorage.setItem("websiteTheme", "light");
        }
        else {
            document.body.setAttribute("data-theme", "dark");
            themeButton.textContent = "Light Mode";
            localStorage.setItem("websiteTheme", "dark");
        }
    });



    if (window.location.pathname.endsWith("index.html") ||
        window.location.pathname.endsWith("/")) {
    const countdown = document.createElement("section");
    countdown.className = "container my-4 p-3 text-center rounded";
  countdown.style.backgroundColor = "var(--surface)";
countdown.style.color = "var(--text)";
    countdown.innerHTML = `
        <h2>Next Major Event: Annual Dinner</h2>
        <p>12 December 2026</p>
        <h3 id="timer">Loading countdown...</h3>
    `;

    const introduction = document.querySelector("body > p");
    if (introduction) {
        introduction.insertAdjacentElement("afterend", countdown);
    }
    else {
        navbar.insertAdjacentElement("afterend", countdown);
    }

    const eventDate = new Date(2026, 11, 12, 0, 0, 0);

 function updateCountdown() {
        const now = new Date();
        const difference = eventDate.getTime() - now.getTime();
        const timer = document.getElementById("timer");
        if (difference <= 0) {
            timer.textContent = "The Annual Dinner is here!";
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );
        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );
        const seconds = Math.floor(
            (difference / 1000) % 60
        );


        timer.textContent =
            days + " days : " +
            hours + " hours : " +
            minutes + " minutes : " +
            seconds + " seconds";
    }

    updateCountdown();

    const countdownInterval = setInterval(updateCountdown, 1000);
        }


const categoryButtons = document.querySelectorAll(".category-btn");
const eventCards = document.querySelectorAll(".event-card");

categoryButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const selectedCategory = button.getAttribute("data-category");
        categoryButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        if (selectedCategory === "all") {
            eventCards.forEach(function(event) {
                event.parentElement.style.display = "block";
            });
        return;
        }
        let firstEvent = null;

               eventCards.forEach(function(event) {
            const eventCategory = event.getAttribute("data-category");
            const wrapper = event.parentElement;   // the .col-md-6 div
            if (eventCategory === selectedCategory) {
                wrapper.style.display = "block";
                if (firstEvent === null) {
                    firstEvent = event;
                }
            } else {
                wrapper.style.display = "none";
            }
        });

        if (firstEvent !== null) {

            firstEvent.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    });
});
});
