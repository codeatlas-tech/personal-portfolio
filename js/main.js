// THEME TOGGLE + PERSIST
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
        themeIcon.textContent = "☀";
    } else {
        themeIcon.textContent = "☾";
    }
}

// Init theme from localStorage or prefers-color-scheme
(function initTheme() {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
        setTheme(stored);
    } else {
        const prefersDark = window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
    }
})();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        setTheme(current === "dark" ? "light" : "dark");
    });
}

// MOBILE NAV
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });
    });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// SCROLLSPY
const sections = document.querySelectorAll("main section");
const navAnchors = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
    let activeId = "";
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) {
            activeId = sec.id;
        }
    });
    navAnchors.forEach(a => {
        const id = a.getAttribute("href").replace("#", "");
        a.classList.toggle("active", id === activeId);
    });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// REVEAL ANIMATIONS
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.16 });

revealEls.forEach(el => observer.observe(el));
