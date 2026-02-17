// 1. Register Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 2. The Loading Engine
async function initSite() {
    console.log("🚀 IconTech Engine: Initializing...");

    try {
        // AWAIT both components
        await Promise.all([
            fetch('header.html').then(res => res.text()).then(html => {
                document.getElementById('header-placeholder').innerHTML = html;
            }),
            fetch('footer.html').then(res => res.text()).then(html => {
                document.getElementById('footer-placeholder').innerHTML = html;
            })
        ]);

        // Global UI Setup (Runs on every page)
        setupGlobalAnimations(); 
        setupButtonInteractions();
        setupMobileMenu();
        initLazyCTA();
        // PAGE ROUTER: Detect where we are
        if (document.querySelector(".hero-section")) {
            console.log("🏠 Logic: Home Page");
            initHomeModules();
        } 
        
        // Signal for other scripts (about.js or portfolio.js)
        document.dispatchEvent(new Event("siteReady"));

        // Final calculation refresh
        ScrollTrigger.refresh();

    } catch (error) {
        console.error("Critical Loading Error:", error);
        gsap.set(".main-header, .footer-section, main", { opacity: 1 });
    }
}

// 3. GLOBAL MODULES (Header/Footer/Buttons)
function setupGlobalAnimations() {
    const headerTl = gsap.timeline();
    headerTl.to(".main-header", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        .from(".nav-link", { y: -10, opacity: 0, stagger: 0.1 }, "-=0.5")
        .from(".main-header .btn-book", { scale: 0, opacity: 0, duration: 0.8, ease: "back.out" }, "-=0.3");

    gsap.to(".footer-section", { scrollTrigger: { trigger: ".footer-section", start: "top 80%" }, opacity: 1, duration: 1 });
    
    const brandingText = document.getElementById('footer-branding-text');
    if (brandingText) {
        gsap.from(brandingText, {
            scrollTrigger: { trigger: ".massive-branding-area", start: "top 95%" },
            y: 100, opacity: 0, duration: 1.5,
            onComplete: () => {
                gsap.to(brandingText, { backgroundPosition: "200% center", duration: 10, repeat: -1, ease: "none" });
                gsap.to(brandingText, { y: -15, scale: 1.03, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
            }
        });
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

    // Execute Home Sections
    initHorizontalScroll();
    initSpotlightMarquee();
    initServicesPinning();
    initFeaturedProjects();
    initFAQ();
    initFinalCTA();
    
    // Process Reveal
    gsap.from(".process-header", { scrollTrigger: { trigger: ".process-header", start: "top 85%" }, opacity: 0, y: 30, duration: 1 });
    gsap.from(".process-cta", { 
    scrollTrigger: { 
        trigger: ".process-cta", // WATCH THE CTA ITSELF
        start: "top 90%",        // Starts when the top of the CTA peeks into the screen
        toggleActions: "play none none none" 
    }, 
    opacity: 0, 
    y: 40, 
    duration: 2, 
    ease: "power3.out" 
});
    gsap.to(".card-reveal", { scrollTrigger: { trigger: ".process-grid", start: "top 80%" }, opacity: 1, y: 0, stagger: 0.15, duration: 1 });
}


// 5. MODULES
function initHorizontalScroll() {
    gsap.from(".how-it-works", { 
    scrollTrigger: { 
        trigger: ".how-it-works", 
        start: "top 90%",        
        toggleActions: "play none none none" 
    }, 
    opacity: 0, 
    y: 40, 
    duration: 3, 
    ease: "power3.out" 
});
    let mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
        const horizontalSection = document.querySelector(".horizontal-container");
        const heading = document.querySelector(".horizontal-heading");
        if (!horizontalSection || !heading) return;

        const workTl = gsap.timeline({
            scrollTrigger: { trigger: "#howItWorks", pin: true, scrub: 1, start: "top top", end: () => "+=" + horizontalSection.scrollWidth, invalidateOnRefresh: true }
        });

        workTl.to(horizontalSection, { x: () => -(horizontalSection.scrollWidth - window.innerWidth + 200), ease: "none" }, 0)
            .to(heading, { opacity: 0, filter: "blur(20px)", x: -80, scale: 0.9, duration: 0.15, ease: "power2.in" }, 0.02);

        gsap.from(".live-text", { scrollTrigger: { trigger: ".live-card", containerAnimation: workTl, start: "right right", toggleActions: "play none none reverse" }, scale: 0.5, opacity: 0, duration: 1, ease: "back.out(1.7)" });
    });
}

function initSpotlightMarquee() {
    
    const track = document.getElementById("marqueeTrack");
    if (!track) return;

    // 1. Clone the content to create the infinite tail
    const originalCards = Array.from(track.children);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    // 2. Calculate the exact distance to scroll
    const firstCard = track.firstElementChild;
    const gap = 40; // This must match your CSS gap

    // Total width of one set = (Card Width + Gap) * Number of original cards
    const scrollDistance = (firstCard.offsetWidth + gap) * originalCards.length;

    //  Create the Buttery Smooth Animation
    let marquee = gsap.to(track, {
        x: -scrollDistance,
        duration: 30, // Increase for slower, smoother motion
        ease: "none",
        repeat: -1,
        // force3D ensures the GPU handles the movement
        force3D: true,
        // This prevents the "jump" by ensuring GSAP resets at the exact pixel
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % scrollDistance)
        }
    });

}
function initServicesPinning() {
    gsap.from(".services-wrapper", { 
    scrollTrigger: { 
        trigger: ".services-wrapper", 
        start: "top 90%",        
        toggleActions: "play none none none" 
    }, 
    opacity: 0, 
    y: 40, 
    duration: 3, 
    ease: "power3.out" 
});
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1025px)", () => {
        const section = document.querySelector(".services-pin-section");
        const menuItems = document.querySelectorAll(".menu-item");
        const slides = document.querySelectorAll(".service-slide");
        const indicator = document.querySelector(".active-indicator");
        if (!section) return;

        let currentIndex = 0;
        let autoPlayTimer;

        function updateUI(index) {
            menuItems.forEach((item, i) => {
                const isActive = (i === index);
                item.classList.toggle("active", isActive);
                slides[i].classList.toggle("active", isActive);
            });
            const targetMenu = menuItems[index];
            if (indicator) gsap.to(indicator, { y: targetMenu.offsetTop, height: targetMenu.offsetHeight, duration: 0.4, ease: "power2.out" });
            currentIndex = index;
        }

        const st = ScrollTrigger.create({
            trigger: section, start: "top top", end: "+=200%", pin: true, scrub: 1,
            onUpdate: (self) => {
                let newIdx = self.progress < 0.20 ? 0 : self.progress < 0.70 ? 1 : 2;
                if (newIdx !== currentIndex) updateUI(newIdx);
            },
            onEnter: () => startLoop(),
            onEnterBack: () => startLoop(),
            onLeave: () => stopLoop(),
            onLeaveBack: () => stopLoop()
        });

        function startLoop() {
            if (autoPlayTimer) autoPlayTimer.kill();
            autoPlayTimer = gsap.delayedCall(3, () => {
                let nextIndex = (currentIndex + 1) % menuItems.length;
                let targetScroll = nextIndex === 0 ? st.start : st.start + ((st.end - st.start) * (nextIndex / (menuItems.length - 1))) + 5;
                gsap.to(window, { scrollTo: { y: targetScroll }, duration: 0.8, ease: "power4.inOut", onComplete: () => startLoop() });
            });
        }
        function stopLoop() { if (autoPlayTimer) autoPlayTimer.kill(); }

        window.addEventListener("wheel", () => { stopLoop(); gsap.delayedCall(3, () => { if (st.isActive) startLoop(); }); }, { passive: true });
        updateUI(0);
    });
}

function initFeaturedProjects() {
    gsap.utils.toArray(".project-card").forEach((card) => {
        gsap.from(card, { scrollTrigger: { trigger: card, start: "top 85%" }, y: 60, opacity: 0, duration: 1.2, ease: "power3.out" });
        gsap.to(card.querySelector("img"), { scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }, y: "-15%", ease: "none" });
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

function setupButtonInteractions() {
    gsap.to(".btn-book", { boxShadow: "0 0 20px rgba(165, 148, 253, 0.8)", repeat: -1, yoyo: true, duration: 1.5, overwrite: "auto" });
    const wraps = document.querySelectorAll('.magnetic-wrap');
    wraps.forEach(wrap => {
        const item = wrap.querySelector('.magnetic-item');
        if (!item) return;
        const xTo = gsap.quickTo(item, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(item, "y", { duration: 0.4, ease: "power3" });
        wrap.onmousemove = (e) => {
            const r = wrap.getBoundingClientRect();
            const x = gsap.utils.clamp(-25, 25, (e.clientX - (r.left + r.width/2))/2.5);
            const y = gsap.utils.clamp(-25, 25, (e.clientY - (r.top + r.height/2))/2.5);
            xTo(x); yTo(y);
            gsap.to(item, { rotationY: x * 0.2, rotationX: y * -0.2, duration: 0.3 });
        };
        wrap.onmouseleave = () => { xTo(0); yTo(0); gsap.to(item, { rotationY: 0, rotationX: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" }); };
    });
}

function setupMobileMenu() {
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;
    let isOpen = false;
    btn.onclick = () => {
        isOpen = !isOpen;
        gsap.to(menu, { right: isOpen ? 0 : "-100%", duration: 0.6, ease: "power4.inOut" });
    };
}

function initLazyCTA() {
    const placeholder = document.getElementById('final-CTA-placeholder');
    if (!placeholder) return;

    let isLoaded = false;

    ScrollTrigger.create({
        trigger: placeholder,
        start: "top 110%", 
        onEnter: async () => {
            if (isLoaded) return;
            isLoaded = true;

            try {
                const response = await fetch('final-CTA.html');
                const html = await response.text();
                placeholder.innerHTML = html;

                // IMPORTANT: Tell GSAP the page height has changed
                ScrollTrigger.refresh();

                // Wait for the elements to be physically rendered
                const checkExistence = setInterval(() => {
                    const hasHTML = placeholder.querySelector(".common-final-cta"); // MATCHED CLASS
                    const hasFunction = typeof window.initFinalCTAAnimations === "function";

                    if (hasHTML && hasFunction) {
                        clearInterval(checkExistence);
                        window.initFinalCTAAnimations();
                        
                        // Make the new buttons magnetic
                        if (typeof setupButtonInteractions === "function") {
                            setupButtonInteractions();
                        }
                    }
                }, 50);

            } catch (error) {
                console.error("❌ Lazy Load Error:", error);
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", initSite);