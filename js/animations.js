javascript
/* =========================================================
   DEVELOPER PORTFOLIO - ANIMATIONS
   File: assets/js/animations.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // =====================================================
    // 1. CHECK REDUCED-MOTION PREFERENCE
    // =====================================================

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Avoid scroll animations for visitors who prefer less motion.
    if (prefersReducedMotion) {
        document.querySelectorAll(".js-reveal").forEach((element) => {
            element.classList.add("is-visible");
        });

        document.querySelectorAll(".skill-progress").forEach((bar) => {
            bar.style.width = bar.dataset.progress || "100%";
        });

        return;
    }


    // =====================================================
    // 2. SCROLL-REVEAL ANIMATIONS
    // =====================================================

    const revealSelectors = [
        ".section-header",
        ".about-content",
        ".about-image",
        ".skill-card",
        ".project-card",
        ".service-card",
        ".contact-info",
        ".contact-form",
        ".cta-content"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(", ")
    );

    // Only enable hidden/reveal styling if IntersectionObserver
    // is supported by the visitor's browser.
    if ("IntersectionObserver" in window) {
        revealElements.forEach((element) => {
            element.classList.add("js-reveal");
        });

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }


    // =====================================================
    // 3. STAGGERED CARD ANIMATIONS
    // =====================================================

    const cardGroups = [
        ".skills-grid",
        ".projects-grid",
        ".services-grid"
    ];

    cardGroups.forEach((groupSelector) => {
        const group = document.querySelector(groupSelector);

        if (!group) return;

        const cards = group.querySelectorAll(
            ".skill-card, .project-card, .service-card"
        );

        cards.forEach((card, index) => {
            // Keep the delay short so larger grids remain responsive.
            card.style.setProperty(
                "--reveal-delay",
                `${Math.min(index * 100, 500)}ms`
            );
        });
    });


    // =====================================================
    // 4. ANIMATED SKILL PROGRESS BARS
    // =====================================================

    const skillBars = document.querySelectorAll(".skill-progress");

    if (skillBars.length > 0) {
        skillBars.forEach((bar) => {
            const progress = Number.parseFloat(
                bar.dataset.progress || "0"
            );

            // Clamp the value to a valid percentage.
            const safeProgress = Math.min(
                100,
                Math.max(0, Number.isFinite(progress) ? progress : 0)
            );

            // Start at zero until the bar becomes visible.
            bar.style.width = "0%";
            bar.setAttribute("role", "progressbar");
            bar.setAttribute("aria-valuemin", "0");
            bar.setAttribute("aria-valuemax", "100");
            bar.setAttribute("aria-valuenow", String(safeProgress));

            if ("IntersectionObserver" in window) {
                const skillObserver = new IntersectionObserver(
                    (entries, observer) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                bar.style.width = `${safeProgress}%`;
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    { threshold: 0.3 }
                );

                skillObserver.observe(bar);
            } else {
                bar.style.width = `${safeProgress}%`;
            }
        });
    }


    // =====================================================
    // 5. ANIMATED NUMBER COUNTERS
    // =====================================================

    const counters = document.querySelectorAll("[data-counter]");

    function animateCounter(element) {
        const target = Number.parseInt(
            element.dataset.counter || "0",
            10
        );

        if (!Number.isFinite(target)) return;

        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out effect for a natural finish.
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(target * easedProgress);

            element.textContent = currentValue.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });
    }


    // =====================================================
    // 6. SUBTLE HERO PARALLAX EFFECT
    // =====================================================

    const heroVisual = document.querySelector(".hero-visual");

    if (heroVisual && window.matchMedia("(pointer: fine)").matches) {
        let animationFrame = null;

        heroVisual.addEventListener("mousemove", (event) => {
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
            }

            animationFrame = requestAnimationFrame(() => {
                const rect = heroVisual.getBoundingClientRect();

                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;

                const rotateY = (x - 0.5) * 5;
                const rotateX = (0.5 - y) * 5;

                heroVisual.style.transform =
                    `perspective(900px) ` +
                    `rotateX(${rotateX}deg) ` +
                    `rotateY(${rotateY}deg)`;

                animationFrame = null;
            });
        });

        heroVisual.addEventListener("mouseleave", () => {
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }

            heroVisual.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg)";
        });
    }


    // =====================================================
    // 7. CLEAN INITIALIZATION
    // =====================================================

    console.log("Portfolio animations initialized.");
});
