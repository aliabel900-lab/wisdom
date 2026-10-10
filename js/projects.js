javascript
/* =========================================================
   DEVELOPER PORTFOLIO - PROJECTS DATA
   File: assets/js/projects.js
   ========================================================= */

"use strict";

/*
 * Portfolio project data.
 *
 * Update the image paths and links to match your files.
 * Use real repository and live-demo URLs when available.
 */

window.portfolioProjects = [
    {
        id: 1,

        title: "School Management System",

        category: "Web Application",

        description:
            "A school management platform designed to organize student " +
            "records, teacher information, classes, attendance, and " +
            "administrative activities.",

        image: "assets/images/project-school.png",

        imageAlt: "School management system project preview",

        technologies: [
            "PHP",
            "MySQL",
            "HTML",
            "CSS",
            "JavaScript"
        ],

        features: [
            "Role-based access for administrators, teachers, students, and parents",
            "Student and teacher record management",
            "Class and attendance management",
            "Database-driven information"
        ],

        github: "",

        liveDemo: "",

        status: "In Development",

        featured: true
    },

    {
        id: 2,

        title: "CRAVE Kenya Restaurant MVP",

        category: "Business Website",

        description:
            "A restaurant website concept for CRAVE Kenya at City Mall, " +
            "featuring a digital menu, shopping cart, checkout workflow, " +
            "and an administrative order-management interface.",

        image: "assets/images/project-restaurant.png",

        imageAlt: "CRAVE Kenya restaurant website project preview",

        technologies: [
            "PHP",
            "MySQL",
            "HTML",
            "CSS",
            "JavaScript"
        ],

        features: [
            "Digital food menu",
            "Shopping cart and checkout workflow",
            "Order-management dashboard",
            "Customer and reservation management"
        ],

        github: "",

        liveDemo: "",

        status: "MVP",

        featured: true
    },

    {
        id: 3,

        title: "Authentication Security Lab",

        category: "Cybersecurity",

        description:
            "A local PHP and MySQL practice application for learning " +
            "authentication security, session management, access control, " +
            "and authorized web application testing.",

        image: "assets/images/project-auth-lab.png",

        imageAlt: "Authentication security lab project preview",

        technologies: [
            "PHP",
            "MySQL",
            "Burp Suite",
            "Kali Linux",
            "OWASP Testing"
        ],

        features: [
            "Login and registration workflows",
            "Password hashing and verification",
            "Session security testing",
            "Access-control testing in a local lab"
        ],

        github: "",

        liveDemo: "",

        status: "Learning Lab",

        featured: true
    },

    {
        id: 4,

        title: "Kajembe School Website",

        category: "Website",

        description:
            "A school website concept designed to present school information, " +
            "academic programs, admissions, news, events, and contact details.",

        image: "assets/images/project-kajembe-school.png",

        imageAlt: "Kajembe school website project preview",

        technologies: [
            "PHP",
            "MySQL",
            "HTML",
            "CSS",
            "JavaScript"
        ],

        features: [
            "Home and about pages",
            "Academic and admissions information",
            "News and events sections",
            "Administrative content management concept"
        ],

        github: "",

        liveDemo: "",

        status: "In Development",

        featured: true
    }
];


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

/**
 * Find a project by its ID.
 *
 * Example:
 * const project = getPortfolioProject(1);
 */
window.getPortfolioProject = function (id) {
    return window.portfolioProjects.find(
        (project) => project.id === Number(id)
    ) || null;
};


/**
 * Get projects marked as featured.
 *
 * Example:
 * const featured = getFeaturedPortfolioProjects();
 */
window.getFeaturedPortfolioProjects = function () {
    return window.portfolioProjects.filter(
        (project) => project.featured
    );
};


/**
 * Get projects by category.
 *
 * Example:
 * const websites = getPortfolioProjectsByCategory("Website");
 */
window.getPortfolioProjectsByCategory = function (category) {
    return window.portfolioProjects.filter(
        (project) =>
            project.category.toLowerCase() ===
            String(category).toLowerCase()
    );
};


/**
 * Get a list of all unique project technologies.
 *
 * Example:
 * const technologies = getPortfolioTechnologies();
 */
window.getPortfolioTechnologies = function () {
    const technologies = window.portfolioProjects.flatMap(
        (project) => project.technologies
    );

    return [...new Set(technologies)].sort();
};


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
    `Portfolio projects loaded: ${window.portfolioProjects.length}`
);
