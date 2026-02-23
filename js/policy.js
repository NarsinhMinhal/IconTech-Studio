/**
 * policy.js - IconTech Studio Ultimate Edition
 * 3D Kinetic Reveal + Zero-Delay Logic
 */

let isPolicyInitialized = false;

document.addEventListener("siteReady", () => {
    // 1. Guard against double execution
    if (isPolicyInitialized || !document.querySelector(".policy-hero")) return;
    isPolicyInitialized = true;

    console.log("🚀 Policy Engine: Initializing 3D Architectural Logic...");

    // 2. FORCE REVEAL (Wake up the 'main' tag from the shutter)
    gsap.set("main, .footer-section", { autoAlpha: 1 });
    ScrollTrigger.refresh();

    // 3. HERO REVEAL: Cinematic Focus
    const heroTl = gsap.timeline();
    heroTl.fromTo(".policy-display-title",
        { filter: "blur(30px)", opacity: 0, scale: 0.9, y: 80 },
        { filter: "blur(0px)", opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "expo.out" }
    )
        .fromTo(".policy-intro p",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" },
            "-=1");

    // 4. THE 3D SHUFFLE REVEAL (Policy Cards)
    // Triggers the INSTANT the top of the section enters the bottom of the screen
    gsap.from(".policy-card", {
        scrollTrigger: {
            trigger: ".policy-body-section",
            start: "top bottom", // ZERO DELAY: Starts as soon as it peeks in
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 100,
        rotationX: -25, // Tilts toward the user
        transformPerspective: 1000,
        stagger: 0.2, // One-by-one slow rhythmic reveal
        duration: 1.2,
        ease: "power4.out",
        clearProps: "all" // Cleans up transforms after docking
    });

    // 5. KINETIC MOUSE INTERACTION (Magnetic Tilt + Glow)
    const cards = document.querySelectorAll(".policy-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update the Glow position
            gsap.to(card, {
                background: `radial-gradient(circle at ${x}px ${y}px, rgba(165, 148, 253, 0.08) 0%, transparent 70%)`,
                duration: 0.4
            });
        });

        // 6. CINEMATIC SCROLL TO TERMS
        const termsLink = document.querySelector('a[href="#terms-and-conditions"]');
        if (termsLink) {
            termsLink.addEventListener("click", (e) => {
                e.preventDefault();
                const target = document.querySelector("#terms-and-conditions");

                gsap.to(window, {
                    scrollTo: { y: target, offsetY: 120 },
                    duration: 1.8,
                    ease: "expo.inOut"
                });

                // Visual feedback
                gsap.timeline()
                    .to(target, { borderColor: "#A594FD", boxShadow: "0 0 30px rgba(165,148,253,0.2)", duration: 0.4 })
                    .to(target, { borderColor: "rgba(255,255,255,0.05)", boxShadow: "0 0 0px transparent", duration: 1 });
            });
        }
    });
})