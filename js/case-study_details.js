document.addEventListener("siteReady", () => {
    // 1. Safety Check: Only run if this specific page section exists
    if (!document.querySelector(".project-hero-section")) return;

    console.log("📂 Case Study Logic: Initializing...");

    ScrollTrigger.refresh();

    initProjectDetailsAnimations();
    initChallengeSection();
    initPartnershipSection();
    initExperienceReveal();
    initResultsAnimations();
    initAdvocacyReveal();


});

function initProjectDetailsAnimations() {
    const tl = gsap.timeline();

    // A. ENTRANCE REVEAL
    tl.fromTo(".proj-reveal",
        {
            y: 40,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1.2,
            ease: "power4.out"
        }
    )

        // B. PURPLE SPEC BARS
        // Animate the vertical lines growing downwards
        .fromTo(".spec-accent-bar",
            { scaleY: 0 },
            {
                scaleY: 1,
                duration: 0.5,
                ease: "expo.inOut",
                stagger: 0.1
            }, "-=1") // Overlaps with text reveal for a fluid feel

        // C. BROWSER FRAME REVEAL
        // Mockup slides up from the bottom
        .fromTo(".browser-frame-container",
            {
                y: 150,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1.8,
                ease: "power3.out"
            }, "-=1.2");

    // D. DYNAMIC IMAGE PARALLAX
    // This creates depth as the user scrolls
    const mockupImg = document.querySelector(".mockup-img");
    if (mockupImg) {
        gsap.to(mockupImg, {
            scrollTrigger: {
                trigger: ".project-mockup-reveal",
                start: "top bottom",
                end: "bottom top",
                scrub: 1 // Ties the movement to the scroll distance
            },
            y: -100, // Move image up relative to frame
            ease: "none"
        });
    }
}

function initChallengeSection() {

    // 1. Stagger Reveal the Title and Paragraphs
    gsap.from(".chal-reveal", {
        scrollTrigger: {
            trigger: ".challenge-grid",
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        filter: "blur(10px)" // IconTech 'Inspiration' focus effect
    });
}

function initPartnershipSection() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".partnership-section",
            start: "top 70%",
        }
    });

    tl.to(".shutter-reveal", {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.5,
        ease: "expo.inOut"
    })
    .from(".part-reveal", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .from(".quote-accent-bar", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1,
        ease: "expo.out"
    }, "-=0.5");
}

function initExperienceReveal() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".experience-section",
            start: "top 70%",
        }
    });

    // 1. Reveal Content Staggered
    tl.from(".exp-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    })
    
    // 2. Reveal the Visual Node with a scale-up
    .from(".exp-img-reveal", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
    }, "-=1");

    // 3. Constant Floating Animation for the UI Node
    gsap.to(".ui-node", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

function initResultsAnimations() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".results-section",
            start: "top 75%",
        }
    });

    // 1. Reveal Header & intro
    tl.from(".results-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    })
    
    // 2. Pop the Results Nodes
    .from(".node-icon", {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.5")

    // 3. Shutter reveal for the final mockup
    tl.to(".final-project-mockup.shutter-reveal", {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.5,
        ease: "expo.inOut"
    }, "-=1");

    // Final Image Parallax - makes it feel "behind glass"
    gsap.to(".parallax-mockup", {
        scrollTrigger: {
            trigger: ".final-project-mockup",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: -100, // Move image up relative to frame
        scale: 1, // Zoom out slightly while scrolling
        ease: "none"
    });
}

function initAdvocacyReveal() {
    // 1. Staggered text reveal for titles and paragraphs
    gsap.from(".next-reveal", {
        scrollTrigger: {
            trigger: ".future-advocacy-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
    });

    // 2. Animate the glowing quote bar
    gsap.from(".quote-bar", {
        scrollTrigger: {
            trigger: ".testimonial-card",
            start: "top 85%"
        },
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "expo.out"
    });
}
