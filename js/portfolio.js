let isWorkInitialized = false;

document.addEventListener("siteReady", () => {
    if (isWorkInitialized || !document.querySelector(".project-grid")) return;
    
    isWorkInitialized = true;
    initWorkAnimations();
    initWhyIconTech();
    initWorkPage();
    initCommonFinalCTA();

});

function initWorkAnimations() {
    console.log("Portfolio Reveal Active");

    // 1. Reveal Intro Text
    gsap.from(".work-header-content > *", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    });

    // 2. Reveal Project Cards
    // We target the .project-card directly
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".project-grid",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 60,
        autoAlpha: 0, // This hides then reveals them
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        clearProps: "all" 
    });
}

function initWhyIconTech() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".why-icontech-section",
            start: "top 70%",
        }
    });

    // 1. Reveal Text Items (Staggered)
    tl.from(".why-content .reveal-item", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    })
    // 2. Cinematic Shutter Reveal for Image
    .to(".shutter-reveal", {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.5,
        ease: "expo.inOut"
    }, "-=1")
    // 3. Subtle Image Scale
    .from(".why-img", {
        scale: 1.2,
        duration: 2,
        ease: "power2.out"
    }, "-=1.5");
}

function initWorkPage() {
    // 1. Reset all reveal items to 0 instantly so they are ready to animate
    gsap.set(".tile-reveal, .work-reveal, .partners-reveal", { opacity: 0, y: 30 });

    // 2. Refresh again just to be absolutely safe
    ScrollTrigger.refresh();

    // 3. Simple reveal for text
    gsap.to(".partners-reveal", {
        scrollTrigger: {
            trigger: ".partners-section",
            start: "top 90%", // Triggers as soon as it peeks in
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1
    });

    // 4. Reveal Logo Tiles
    gsap.to(".tile-reveal", {
        scrollTrigger: {
            trigger: ".partners-grid",
            start: "top 90%",
            // This is the safety net: if the user scrolls fast, 
            // the logos will "catch up"
            toggleActions: "play none none none" 
        },
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "back.out(1.5)",
        // This ensures they stay visible forever after animating
        onComplete: () => gsap.set(".tile-reveal", { clearProps: "all" })
    });
}

