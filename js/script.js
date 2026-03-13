// 1. REGISTER PLUGINS
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Load Initial Assets
async function initSite() {
    try {
        await Promise.all([
            fetch('header.html').then(res => res.text()).then(html => {
                document.getElementById('header-placeholder').innerHTML = html;
            }),
            fetch('footer.html').then(res => res.text()).then(html => {
                document.getElementById('footer-placeholder').innerHTML = html;
            })
        ]);

        // Global UI Setup (Runs on every page load)
        setupGlobalAnimations();
        setupButtonInteractions();
        setupMobileMenu();
        initLazyCTA();
        setupFormSubmission();

        if (document.querySelector(".hero-section")) {
            initHomeModules();
        }

        // Signal for dynamic page modules
        document.dispatchEvent(new Event("siteReady"));

        // Final calculation refresh to ensure ScrollTriggers are accurate
        ScrollTrigger.refresh();

    } catch (error) {
        console.error("Critical Loading Error:", error);
        // Fallback: Show content if fetch fails
        gsap.set(".main-header, .footer-section, main", { autoAlpha: 1 });
    }
}

// 3. GLOBAL MODULES (Header/Footer/Dropdown)
function setupGlobalAnimations() {
    /* ==========================
       HEADER ANIMATION
    ========================== */

    gsap.from(".main-header", {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".nav-link", {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.4
    });

    gsap.from(".main-header .btn-book", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
        ease: "back.out(1.7)"
    });

    /* ==========================
       MOBILE MENU
    ========================== */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    let menuOpen = false;
    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            if (!menuOpen) {
                gsap.set(mobileMenu, { visibility: "visible" });
                gsap.to(mobileMenu, {
                    right: 0,
                    duration: 0.5,
                    ease: "power3.out"
                });
                menuOpen = true;
            } else {
                gsap.to(mobileMenu, {
                    right: "-100%",
                    duration: 0.5,
                    ease: "power3.in",
                    onComplete: () => {
                        gsap.set(mobileMenu, { visibility: "hidden" });
                    }
                });
                menuOpen = false;
            }
        });
    }

    /* ==========================
       MOBILE DROPDOWN
    ========================== */

    const toggle = document.getElementById("mobileServicesToggle");
    const submenu = document.getElementById("mobileSubMenu");
    let subOpen = false;
    if (toggle) {
        toggle.addEventListener("click", () => {
            if (!subOpen) {
                gsap.to(submenu, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.4
                });
                subOpen = true;
            } else {
                gsap.to(submenu, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4
                });
                subOpen = false;
            }
        });
    }

    /* ==========================
       DESKTOP DROPDOWN
    ========================== */
    document.querySelectorAll(".nav-dropdown").forEach(drop => {
        const menu = drop.querySelector(".dropdown-content");
        drop.addEventListener("mouseenter", () => {
            gsap.to(menu, {
                autoAlpha: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        drop.addEventListener("mouseleave", () => {
            gsap.to(menu, {
                autoAlpha: 0,
                y: 10,
                duration: 0.3,
                ease: "power2.in"
            });
        });
    });

    /* ==========================
       FOOTER (UNCHANGED)
    ========================== */

    const footer = document.querySelector(".footer-section");
    if (footer) {
        gsap.to(footer, {
            scrollTrigger: {
                trigger: footer,
                start: "top 90%"
            },
            opacity: 1,
            duration: 1
        });

        const brandingText = document.getElementById("footer-branding-text");
        if (brandingText) {
            gsap.from(brandingText, {
                scrollTrigger: {
                    trigger: ".massive-branding-area",
                    start: "top 95%"
                },
                y: 100,
                opacity: 0,
                duration: 1.5,
                onComplete: () => {
                    gsap.to(brandingText, {
                        backgroundPosition: "200% center",
                        duration: 10,
                        repeat: -1,
                        ease: "none"
                    });
                }
            });
        }
    }
}

// 4. HOME PAGE ONLY MODULES
function initHomeModules() {
    const heroTl = gsap.timeline();
    heroTl.to(".hero-main-title", { opacity: 1, y: 0, duration: 1.2, delay: 0.5 })
        .from(".hero-btns .btn-book", { scale: 0, opacity: 0, duration: 0.8, ease: "back.out" }, "-=0.3")
        .from(".phone-frame-container", { y: 150, opacity: 0, scale: 0.9, duration: 1.2, ease: "expo.out" }, "-=0.5")
        .to(".phone-card", { opacity: 1, x: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" }, "-=0.8");

    gsap.to(".phone-frame-container", { y: "+=15", duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Client Logos Reveal
    gsap.to(".client-logo", {
        scrollTrigger: { trigger: ".logo-grid", start: "top 85%" },
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out"
    });

    // Run sections if they exist on the page
    if (document.getElementById("howItWorks")) initHorizontalScroll();
    if (document.getElementById("marqueeTrack")) initSpotlightMarquee();
    if (document.querySelector(".services-pin-section")) initServicesPinning();
    if (document.querySelector(".project-card")) initFeaturedProjects();
    if (document.querySelector(".faq-list")) initFAQ();
    if (document.querySelector(".final-cta")) initFinalCTA();

    // Process Reveal
    gsap.from(".process-header", { scrollTrigger: { trigger: ".process-header", start: "top 85%" }, opacity: 0, y: 30, duration: 1 });
    gsap.from(".process-cta", { scrollTrigger: { trigger: ".process-cta", start: "top 90%" }, opacity: 0, y: 40, duration: 2, ease: "power3.out" });
    gsap.to(".card-reveal", { scrollTrigger: { trigger: ".process-grid", start: "top 80%" }, opacity: 1, y: 0, stagger: 0.15, duration: 1 });
}

// 5. HELPER MODULES (Horizontal Scroll, Marquee, Pinning, etc.)
function initHorizontalScroll() {

    const mm = gsap.matchMedia();

    /* ===============================
       DESKTOP (KEEP EXACT BEHAVIOUR)
       =============================== */
    mm.add("(min-width: 901px)", () => {

        const container = document.querySelector(".horizontal-container");
        const heading = document.querySelector(".horizontal-heading");

        if (!container || !heading) return;

        const workTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#howItWorks",
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => "+=" + container.scrollWidth,
                invalidateOnRefresh: true
            }
        });

        workTl.to(container, {
            x: () => -(container.scrollWidth - window.innerWidth + 200),
            ease: "none"
        }, 0)

            .to(heading, {
                opacity: 0,
                filter: "blur(20px)",
                x: -80,
                scale: 0.9,
                duration: 0.15,
                ease: "power2.in"
            }, 0.02);

        // Live card animation (same as yours)
        gsap.from(".live-text", {
            scrollTrigger: {
                trigger: ".live-card",
                containerAnimation: workTl,
                start: "right right",
                toggleActions: "play none none reverse"
            },
            scale: 0.5,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        });

    });


    /* ===============================
       TABLET & MOBILE
       =============================== */
    mm.add("(max-width: 900px)", () => {

        const cards = gsap.utils.toArray(".work-card");

        cards.forEach((card, index) => {

            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "top 60%",
                    toggleActions: "play none none reverse"
                },

                y: 80,
                opacity: 0,
                scale: 0.95,

                duration: 0.8,
                ease: "power3.out",

                delay: index * 0.05
            });

        });


        // Live text animation for mobile
        gsap.from(".live-text", {
            scrollTrigger: {
                trigger: ".live-card",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            scale: 0.7,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        });

    });

}

function initSpotlightMarquee() {
    const track = document.getElementById("marqueeTrack");
    if (!track) return;
    const originalCards = Array.from(track.children);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    const firstCard = track.firstElementChild;
    const gap = 40;
    const scrollDistance = (firstCard.offsetWidth + gap) * originalCards.length;
    gsap.to(track, { x: -scrollDistance, duration: 30, ease: "none", repeat: -1, force3D: true, modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % scrollDistance) } });
}

function initServicesPinning() {

    const mm = gsap.matchMedia();

    /* ===============================
       DESKTOP PIN SYSTEM
       =============================== */
    mm.add("(min-width: 1025px)", () => {
        const section = document.querySelector(".services-pin-section");
        const items = document.querySelectorAll(".menu-item");
        const slides = document.querySelectorAll(".service-slide");
        const indicator = document.querySelector(".active-indicator");
        if (!section) return;

        let currentIndex = 0;
        let autoPlayTimer;

        function updateUI(index) {
            items.forEach((item, i) => {
                item.classList.toggle("active", i === index);
                slides[i].classList.toggle("active", i === index);
            });
            const targetMenu = items[index];

            if (indicator) {
                gsap.to(indicator, {
                    y: targetMenu.offsetTop,
                    height: targetMenu.offsetHeight,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
            currentIndex = index;
        }

        const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,

            onUpdate: (self) => {

                let newIdx =
                    self.progress < 0.33 ? 0 :
                        self.progress < 0.66 ? 1 : 2;

                if (newIdx !== currentIndex)
                    updateUI(newIdx);
            }
        });
        updateUI(0);
    });

    /* ===============================
       MOBILE & TABLET ANIMATIONS
       =============================== */
    mm.add("(max-width: 1024px)", () => {
        // Animate left content
        gsap.from(".services-intro", {
            scrollTrigger: {
                trigger: ".services-intro",
                start: "top 85%"
            },
            opacity: 0,
            y: 40,
            duration: 1
        });

        // Animate menu items
        gsap.utils.toArray(".menu-item").forEach(item => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%"
                },
                opacity: 0,
                y: 30,
                duration: 0.6
            });
        });

        // Animate slides
        gsap.utils.toArray(".service-slide").forEach(slide => {
            gsap.from(slide, {
                scrollTrigger: {
                    trigger: slide,
                    start: "top 85%"
                },
                opacity: 0,
                y: 60,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    });
}

function initFeaturedProjects() {
    gsap.utils.toArray(".project-card").forEach((card) => {
        gsap.from(card, { scrollTrigger: { trigger: card, start: "top 85%" }, y: 60, opacity: 0, duration: 1.2, ease: "power3.out" });
        const img = card.querySelector("img");
        if (img) gsap.to(img, { scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }, y: "-15%", ease: "none" });
    });
}

function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");
    gsap.from(".faq-item", { scrollTrigger: { trigger: ".faq-list", start: "top 85%" }, opacity: 0, y: 20, stagger: 0.1, duration: 0.8 });
    faqItems.forEach(item => {
        item.querySelector(".faq-question").addEventListener("click", () => {
            const isOpen = item.classList.contains("active");
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove("active");
                    gsap.to(other.querySelector(".faq-answer"), { height: 0, duration: 0.4 });
                }
            });
            item.classList.toggle("active");
            gsap.to(item.querySelector(".faq-answer"), { height: isOpen ? 0 : "auto", duration: 0.5, ease: "power3.inOut" });
        });
    });
}

function initFinalCTA() {
    gsap.from(".cta-visual-side, .cta-form-side", {
        scrollTrigger: { trigger: ".final-cta", start: "top 85%" },
        y: 100, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power4.out"
    });
    gsap.from(".stagger-form > *", {
        scrollTrigger: { trigger: ".final-cta", start: "top 85%" },
        y: 20, opacity: 0, stagger: 0.1, duration: 0.6, delay: 0.4
    });
}

// 6. INTERACTIONS (Magnetism & Mobile)
function setupButtonInteractions() {
    gsap.to(".btn-book", { boxShadow: "0 0 20px rgba(165, 148, 253, 0.8)", repeat: -1, yoyo: true, duration: 1.5, overwrite: "auto" });
    
    const wraps = document.querySelectorAll('.magnetic-wrap');
    wraps.forEach(wrap => {
        const item = wrap.querySelector('.magnetic-item');
        if (!item) return;
        const xTo = gsap.quickTo(item, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(item, "y", { duration: 0.4, ease: "power3" });

        wrap.onmousemove = (e) => {
            const r = item.getBoundingClientRect(); // ← button bounds, not wrap
            const centerX = r.left + r.width / 2;
            const centerY = r.top + r.height / 2;

            const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
            if (dist > 80) { xTo(0); yTo(0); return; } // ← dead zone

            const x = gsap.utils.clamp(-25, 25, (e.clientX - centerX) / 2.5);
            const y = gsap.utils.clamp(-25, 25, (e.clientY - centerY) / 2.5);
            xTo(x); yTo(y);
            gsap.to(item, { rotationY: x * 0.2, rotationX: y * -0.2, duration: 0.3 });
        };

        wrap.onmouseleave = () => {
            xTo(0); yTo(0);
            gsap.to(item, { rotationY: 0, rotationX: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        };
    });
}

/**
 * ICONTECH MOBILE MENU - SMART NAVIGATION VERSION
 */
function setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('mobileBackdrop');
    const bars = document.querySelectorAll('.bar');
    const servicesToggle = document.getElementById('mobileServicesToggle');
    const subMenu = document.getElementById('mobileSubMenu');
    const chevron = document.querySelector('.mobile-chevron');

    if (!menuBtn || !mobileMenu || !backdrop) return;

    let isMenuOpen = false;
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'; 
            gsap.set([mobileMenu, backdrop], { visibility: "visible" });
            
            gsap.to(backdrop, { opacity: 1, duration: 0.4 });
            gsap.to(mobileMenu, { right: 0, duration: 0.5, ease: "power3.out" });

            gsap.to(bars[0], { rotation: 45, y: 4, duration: 0.3 });
            gsap.to(bars[1], { rotation: -45, y: -4, duration: 0.3 });
        } else {
            closeEverything();
        }
    }

    function closeEverything() {
        isMenuOpen = false;
        document.body.style.overflow = ''; 

        gsap.to(mobileMenu, { right: "-100%", duration: 0.4, ease: "power3.in" });
        gsap.to(backdrop, { 
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => gsap.set([mobileMenu, backdrop], { visibility: "hidden" }) 
        });

        gsap.to(bars, { rotation: 0, y: 0, duration: 0.3 });

        if (subMenu) {
            gsap.to(subMenu, { height: 0, opacity: 0, marginTop: 0, duration: 0.3 });
            if (chevron) gsap.to(chevron, { rotation: 0 });
        }
    }

    // --- LISTENERS ---
    menuBtn.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', closeEverything);

    // ACCORDION LOGIC
    if (servicesToggle) {
        servicesToggle.addEventListener('click', () => {
            const isAccordionOpen = subMenu.offsetHeight > 0;
            if (!isAccordionOpen) {
                gsap.to(subMenu, { height: "auto", opacity: 1, marginTop: 15, duration: 0.4 });
                if(chevron) gsap.to(chevron, { rotation: 180 });
            } else {
                gsap.to(subMenu, { height: 0, opacity: 0, marginTop: 0, duration: 0.3 });
                if(chevron) gsap.to(chevron, { rotation: 0 });
            }
        });
    }

    // --- THE FIX: SMART LINK REDIRECTION ---
    const allLinks = document.querySelectorAll('a'); // Selects all links on page
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const linkHref = link.getAttribute('href');
            const isSamePage = linkHref === currentPath || linkHref === window.location.hash || linkHref === "#";

            if (isSamePage) {
                if (linkHref !== "#") {
                    if (!linkHref.includes('#')) e.preventDefault(); 
                }

                if (isMenuOpen) {
                    if (link.parentElement.classList.contains('mobile-dropdown-header')) {
                        return;
                    }
                    closeEverything();
                }
            } else {
                if (isMenuOpen && !link.parentElement.classList.contains('mobile-dropdown-header')) {
                    closeEverything();
                }
            }
        });
    });
}

function initLazyCTA() {
    const placeholder = document.getElementById('final-CTA-placeholder');
    if (!placeholder) return;
    let isLoaded = false;
    ScrollTrigger.create({
        trigger: placeholder, start: "top 110%",
        onEnter: async () => {
            if (isLoaded) return;
            isLoaded = true;
            try {
                const response = await fetch('final-CTA.html');
                placeholder.innerHTML = await response.text();
                ScrollTrigger.refresh();
                if (window.initFinalCTAAnimations) window.initFinalCTAAnimations();
                setupButtonInteractions();
            } catch (error) { console.error("Lazy Load Error:", error); }
        }
    });
}

function setupFormSubmission() {

    const form = document.getElementById("iconTechForm");
    if (!form) return;

    const submitBtn = form.querySelector(".submit-btn");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";

        try {
            const response = await fetch("send-email.php", {
                method: "POST",
                body: new FormData(form)
            });

            const result = await response.json();

            if (result.success) {
                submitBtn.innerText = "✓ SENT";
                submitBtn.style.background = "#00ff88";
                form.reset();
            } else {
                submitBtn.innerText = "❌ ERROR";
                submitBtn.style.background = "#ff4d4d";
            }

        } catch (error) {
            submitBtn.innerText = "❌ ERROR";
            submitBtn.style.background = "#ff4d4d";
        }

        setTimeout(() => {
            submitBtn.innerText = "SUBMIT PROJECT";
            submitBtn.style.background = "";
            submitBtn.disabled = false;
        }, 3000);
    });
}

// 7. START UP
document.addEventListener("DOMContentLoaded", initSite);