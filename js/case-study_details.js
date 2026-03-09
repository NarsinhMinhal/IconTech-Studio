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
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    // Set initial states
    gsap.set(".proj-reveal", { y: 30, opacity: 0 });
    gsap.set(".spec-accent-bar", { scaleY: 0 });
    gsap.set(".browser-frame-container", { y: 80, opacity: 0 });

    // 1. Text entrance
    tl.to(".proj-reveal", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        delay: 0.2
    })

    // 2. Bars entrance
    .to(".spec-accent-bar", {
        scaleY: 1,
        duration: 0.7,
        ease: "expo.inOut",
        stagger: 0.1
    }, "-=0.7")

    // 3. Mockup entrance
    .to(".browser-frame-container", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out"
    }, "-=1");
}

function initChallengeSection() {
    // 0. Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Stagger Reveal the Title and Paragraphs
    // Using fromTo for absolute control over the initial hidden state
    gsap.fromTo(".chal-reveal", 
        {
            y: 40,
            opacity: 0,
            filter: "blur(12px)"
        },
        {
            scrollTrigger: {
                trigger: ".challenge-grid",
                start: "top 80%", // Triggers when top of grid is 80% from top of viewport
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.15,
            duration: 1.2,
            ease: "power3.out",
            clearProps: "filter" // Clears blur after animation for performance
        }
    );
}

function initPartnershipSection() {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".partnership-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Entrance Animation (Shutter)
    tl.to(".shutter-reveal", {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.4,
        ease: "expo.inOut"
    })

    // Staggered Text Reveal
    .from(".part-reveal", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")

    // Quote bar growth
    .from(".quote-accent-bar", {
        scaleY: 0,
        duration: 1,
        ease: "expo.out"
    }, "-=0.8");
}

function initExperienceReveal() {
    // 0. Ensure GSAP and ScrollTrigger are registered
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    // Responsive Animation Logic
    mm.add({
        isDesktop: "(min-width: 1025px)",
        isMobile: "(max-width: 1024px)"
    }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".experience-section",
                start: isDesktop ? "top 60%" : "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // 1. Staggered reveal for all content items
        tl.fromTo(".exp-reveal", 
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "power3.out" }
        )
        
        // 2. Simple fade-in reveal for the Visual UI Node
        .fromTo(".exp-img-reveal", 
            { opacity: 0 },
            { opacity: 1, duration: 1.4, ease: "power2.out" }, 
            "-=0.8"
        );

        // 3. Constant Floating Animation (Gentler for better readability)
        gsap.to(".ui-node", {
            y: isDesktop ? -20 : -10, // Less float on mobile
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
}

function initResultsAnimations() {
    // 0. Ensure GSAP is registered
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".results-section",
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });

    // 1. Reveal Header, Title & Intro
    tl.from(".results-reveal", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out"
    })
    
    // 2. Pop the Results Icon Nodes
    .from(".node-icon", {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, "-=0.4")

    // 3. Shutter reveal for the final mockup frame
    // We use clipPath to create the 'opening' effect
    tl.fromTo(".final-project-mockup", 
        { clipPath: "inset(0 0 100% 0)" },
        {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.4,
            ease: "expo.inOut"
        }, 
        "-=0.8"
    );
}

function initAdvocacyReveal() {
    // 0. Ensure Plugins are registered
    gsap.registerPlugin(ScrollTrigger);

    // 1. Staggered text reveal for all content
    // Using fromTo ensures the initial hidden state is applied correctly
    gsap.fromTo(".next-reveal", 
        { 
            y: 30, 
            opacity: 0 
        }, 
        {
            scrollTrigger: {
                trigger: ".future-advocacy-section",
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out"
        }
    );

    // 2. Animate the glowing vertical quote bar
    gsap.fromTo(".quote-bar", 
        { scaleY: 0 },
        {
            scrollTrigger: {
                trigger: ".testimonial-card",
                start: "top 85%"
            },
            scaleY: 1,
            transformOrigin: "top",
            duration: 1.5,
            ease: "expo.out"
        }
    );
}
