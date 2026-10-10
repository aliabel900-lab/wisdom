javascript
/* =========================================================
   DEVELOPER PORTFOLIO - MAIN JAVASCRIPT
   File: assets/js/main.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // =====================================================
    // 1. SELECT HTML ELEMENTS
    // =====================================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const currentYear = document.getElementById("currentYear");
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");


    // =====================================================
    // 2. UPDATE FOOTER YEAR AUTOMATICALLY
    // =====================================================

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================================
    // 3. MOBILE NAVIGATION MENU
    // =====================================================

    function closeMobileMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }

    function openMobileMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.add("is-open");
        menuToggle.setAttribute("aria-expanded", "true");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }
    }

    if (menuToggle && navMenu) {
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.contains("is-open");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close the menu after selecting a navigation link.
        navLinks.forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        // Close the menu when the Escape key is pressed.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });

        // Close the mobile menu when returning to desktop width.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 850) {
                closeMobileMenu();
            }
        });

        // Close the menu if the user clicks outside it.
        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMobileMenu();
            }
        });
    }


    // =====================================================
    // 4. HIGHLIGHT THE ACTIVE NAVIGATION LINK
    // =====================================================

    function updateActiveLink() {
        const currentHash = window.location.hash || "#home";

        navLinks.forEach((link) => {
            const href = link.getAttribute("href");

            if (href === currentHash) {
                link.classList.add("active");
                link.setAttribute("aria-current", "location");
            } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            }
        });
    }

    updateActiveLink();

    window.addEventListener("hashchange", updateActiveLink);


    // =====================================================
    // 5. SMOOTH SCROLLING FOR PAGE SECTIONS
    // =====================================================

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

                // Keep the URL hash in sync with the selected section.
                if (window.location.hash !== targetId) {
                    window.history.replaceState(null, "", targetId);
                    updateActiveLink();
                }
            }
        });
    });


    // =====================================================
    // 6. CONTACT FORM VALIDATION
    // =====================================================

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nameInput = contactForm.querySelector(
                '[name="name"]'
            );

            const emailInput = contactForm.querySelector(
                '[name="email"]'
            );

            const subjectInput = contactForm.querySelector(
                '[name="subject"]'
            );

            const messageInput = contactForm.querySelector(
                '[name="message"]'
            );

            // Check that the expected fields exist.
            if (
                !nameInput ||
                !emailInput ||
                !messageInput
            ) {
                formStatus.textContent =
                    "The contact form is missing a required field.";

                formStatus.setAttribute("role", "alert");
                return;
            }

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput
                ? subjectInput.value.trim()
                : "Portfolio contact message";
            const message = messageInput.value.trim();

            // Check required values.
            if (!name || !email || !message) {
                formStatus.textContent =
                    "Please complete your name, email, and message.";

                formStatus.setAttribute("role", "alert");
                return;
            }

            // Validate email format.
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                formStatus.textContent =
                    "Please enter a valid email address.";

                formStatus.setAttribute("role", "alert");
                emailInput.focus();
                return;
            }

            // Prepare an email draft in the visitor's email application.
            // Replace this address with your own portfolio email.
            const recipient = "your-email@example.com";

            const emailBody = [
                `Name: ${name}`,
                `Email: ${email}`,
                "",
                "Message:",
                message
            ].join("\n");

            const mailtoLink =
                `mailto:${recipient}` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(emailBody)}`;

            formStatus.textContent =
                "Opening your email application to prepare the message. " +
                "You must send the email there.";

            formStatus.setAttribute("role", "status");

            // This opens an email draft; it does not send the message.
            window.location.href = mailtoLink;
        });
    }


    // =====================================================
    // 7. CURRENT YEAR AND PORTFOLIO INITIALIZATION
    // =====================================================

    document.documentElement.classList.add("js-enabled");

    console.log("Developer portfolio JavaScript initialized.");
});
