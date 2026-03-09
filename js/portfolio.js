let isWorkInitialized = false;

document.addEventListener("siteReady", () => {
    if (isWorkInitialized || !document.querySelector(".project-grid")) return;
    
    isWorkInitialized = true;
    initWorkAnimations();
    initWhyIconTech();
    initWorkPage();

});

function initWorkAnimations() {

    /* ======================
       HEADER REVEAL
       ====================== */
    gsap.from(".work-header-content > *", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    });


    /* ======================
       CARDS REVEAL
       — stagger by row on desktop (3 cols),
         simple stagger on mobile (1 col)
       ====================== */
    const cards = gsap.utils.toArray(".project-card");

    gsap.from(cards, {
        scrollTrigger: {
            trigger: ".project-grid",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 50,
        autoAlpha: 0,
        stagger: {
            amount: 0.5,    // total stagger time spread across all cards
            from: "start"
        },
        duration: 0.9,
        ease: "power3.out",
        clearProps: "all"
    });

}

function initWhyIconTech() {
    // Check if section exists to avoid errors
    if (!document.querySelector(".why-icontech-section")) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".why-icontech-section",
            start: "top 75%", // Triggers when section is 75% from top
            toggleActions: "play none none reverse"
        }
    });

    // 1. Reveal Content (Title, Tags, List)
    tl.from(".why-content .reveal-item", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out"
    })
    // 2. Open the Image Shutter
    .to(".shutter-reveal", {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.4,
        ease: "expo.inOut"
    }, "-=0.6")
    // 3. Subtle Zoom In on the image
    .from(".why-img", {
        scale: 1.15,
        duration: 1.8,
        ease: "power2.out"
    }, "-=1.2");
}

function initWorkPage() {
    // 1. Register ScrollTrigger if not already done
    gsap.registerPlugin(ScrollTrigger);

    // 2. Refresh ScrollTrigger to catch new layout positions
    ScrollTrigger.refresh();

    // 3. Reveal for text elements (Heading, Tag, Subtitle)
    gsap.fromTo(".partners-reveal", 
        { opacity: 0, y: 30 },
        {
            scrollTrigger: {
                trigger: ".partners-section",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out"
        }
    );

    // 4. Reveal Logo Tiles with a "Pop" effect
    gsap.fromTo(".tile-reveal", 
        { opacity: 0, scale: 0.8, y: 20 },
        {
            scrollTrigger: {
                trigger: ".partners-grid",
                start: "top 90%",
                toggleActions: "play none none none" 
            },
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: {
                amount: 0.6, // Total time for all items to stagger
                grid: "auto", // Optimized stagger based on grid columns
                from: "start"
            },
            duration: 0.8,
            ease: "back.out(1.4)",
            onComplete: () => {
                // Remove GSAP styles after animation to let CSS Hover take over cleanly
                gsap.set(".tile-reveal", { clearProps: "transform, opacity, scale" });
            }
        }
    );
}