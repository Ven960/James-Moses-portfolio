/* ==============================
   MOBILE NAVIGATION
============================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.textContent = isOpen ? "✕" : "☰";

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* ==============================
   TYPING EFFECT
============================== */

const typingText = document.getElementById("typing-text");

const words = [
    "Software Developer",
    "Web Developer",
    "IT Professional",
    "Problem Solver"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingText) {
        return;
    }

    const currentWord = words[wordIndex];

    if (deleting) {

        characterIndex--;

        typingText.textContent =
            currentWord.substring(0, characterIndex);

    } else {

        characterIndex++;

        typingText.textContent =
            currentWord.substring(0, characterIndex);

    }

    let typingSpeed = deleting ? 60 : 100;


    if (!deleting &&
        characterIndex === currentWord.length) {

        typingSpeed = 1500;

        deleting = true;

    }


    if (deleting &&
        characterIndex === 0) {

        deleting = false;

        wordIndex++;

        if (wordIndex >= words.length) {
            wordIndex = 0;
        }

        typingSpeed = 500;

    }

    setTimeout(typeEffect, typingSpeed);

}

typeEffect();


/* ==============================
   SMOOTH SCROLLING
============================== */

const allLinks =
    document.querySelectorAll('a[href^="#"]');

allLinks.forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* ==============================
   CONTACT FORM - FORMSPREE
============================== */

const contactForm =
    document.getElementById("contact-form");

const formMessage =
    document.getElementById("form-message");

if (contactForm && formMessage) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const submitButton =
                contactForm.querySelector(".submit-btn");

            if (!submitButton) {
                return;
            }


            submitButton.disabled = true;

            submitButton.textContent =
                "⏳ Sending Message...";


            formMessage.textContent =
                "Sending your message...";

            formMessage.style.display =
                "block";


            const formData =
                new FormData(contactForm);


            try {

                const response = await fetch(
                    "https://formspree.io/f/xjykjerl",
                    {
                        method: "POST",

                        body: formData,

                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


                if (response.ok) {

                    formMessage.textContent =
                        "✅ Message sent successfully! Thank you for contacting me. I will get back to you soon.";

                    formMessage.style.display =
                        "block";


                    contactForm.reset();


                    submitButton.textContent =
                        "✓ Message Sent";


                    setTimeout(() => {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Send Message";

                    }, 4000);

                } else {

                    formMessage.textContent =
                        "❌ Something went wrong. Please try again.";

                    formMessage.style.display =
                        "block";

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Send Message";

                }

            } catch (error) {

                formMessage.textContent =
                    "❌ Unable to send your message. Please check your internet connection and try again.";

                formMessage.style.display =
                    "block";

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Send Message";

            }

        }
    );

}


/* ==============================
   ACTIVE NAVIGATION LINK
============================== */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionBottom =
            sectionTop + section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach((link) => {

        link.classList.remove("active-link");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active-link");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* Set active link when page first loads */
updateActiveNavigation();


/* ==============================
   BACK TO TOP BUTTON
============================== */

const backToTop =
    document.getElementById("back-to-top");


if (backToTop) {

    function updateBackToTop() {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateBackToTop();

}