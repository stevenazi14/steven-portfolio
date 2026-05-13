const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");
const progressBar = document.querySelector(".scroll-progress");
const revealItems = document.querySelectorAll(".reveal");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const counters = document.querySelectorAll(".stat-number");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const typingElement = document.querySelector(".typing");

const typedWords = [
    "Backend systems that stay maintainable",
    "Product builds that feel investor-ready",
    "Execution with strong engineering discipline",
    "APIs and interfaces designed to scale"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function handleNavbarState() {
    navbar.classList.toggle("scrolled", window.scrollY > 24);

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}

function toggleMobileNav() {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeMobileNav() {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
}

function smoothScroll(event) {
    const targetId = event.currentTarget.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) {
        return;
    }

    event.preventDefault();
    closeMobileNav();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function revealOnScroll() {
    const trigger = window.innerHeight - 110;

    revealItems.forEach((item) => {
        const top = item.getBoundingClientRect().top;
        if (top < trigger) {
            item.classList.add("active");
        }
    });
}

function typeEffect() {
    if (!typingElement) {
        return;
    }

    const currentWord = typedWords[wordIndex];

    if (isDeleting) {
        charIndex -= 1;
    } else {
        charIndex += 1;
    }

    typingElement.textContent = currentWord.slice(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typedWords.length;
    }

    setTimeout(typeEffect, isDeleting ? 40 : 65);
}

function animateCounter(counter) {
    const target = Number(counter.dataset.target || 0);
    const duration = 1200;
    const start = performance.now();

    function update(timestamp) {
        const progress = Math.min((timestamp - start) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = String(value);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.textContent = String(target);
        }
    }

    requestAnimationFrame(update);
}

function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.45 });

    counters.forEach((counter) => observer.observe(counter));
}

function setActiveNavLink() {
    const sections = [...navAnchors].map((anchor) => {
        const section = document.querySelector(anchor.getAttribute("href"));
        return { anchor, section };
    });

    let activeId = "";

    sections.forEach(({ section }) => {
        if (!section) {
            return;
        }

        const rect = section.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
            activeId = `#${section.id}`;
        }
    });

    navAnchors.forEach((anchor) => {
        anchor.classList.toggle("active", anchor.getAttribute("href") === activeId);
    });
}

function initProjectFilters() {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            projectCards.forEach((card) => {
                const category = card.dataset.category;
                const shouldShow = filter === "all" || category === filter;
                card.classList.toggle("hidden", !shouldShow);
            });
        });
    });
}

function initTiltEffect() {
    projectCards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            if (window.innerWidth < 761 || card.classList.contains("hidden")) {
                return;
            }

            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 10;
            const rotateX = ((y / rect.height) - 0.5) * -10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

function initParticles() {
    if (typeof tsParticles === "undefined") {
        return;
    }

    tsParticles.load("particles-js", {
        background: { color: "transparent" },
        fpsLimit: 60,
        particles: {
            number: {
                value: 38,
                density: { enable: true, area: 900 }
            },
            color: {
                value: ["#7dd3fc", "#f59e0b", "#34d399"]
            },
            links: {
                enable: true,
                distance: 140,
                color: "#7dd3fc",
                opacity: 0.18,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.8,
                outModes: { default: "bounce" }
            },
            opacity: {
                value: 0.45
            },
            size: {
                value: { min: 1, max: 4 }
            }
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab"
                }
            },
            modes: {
                grab: {
                    distance: 160,
                    links: {
                        opacity: 0.32
                    }
                }
            }
        },
        detectRetina: true
    });
}

navToggle?.addEventListener("click", toggleMobileNav);
navAnchors.forEach((anchor) => anchor.addEventListener("click", smoothScroll));

window.addEventListener("scroll", () => {
    handleNavbarState();
    revealOnScroll();
    setActiveNavLink();
});

window.addEventListener("load", () => {
    handleNavbarState();
    revealOnScroll();
    setActiveNavLink();
});

typeEffect();
initCounters();
initProjectFilters();
initTiltEffect();
initParticles();
