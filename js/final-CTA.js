// final-CTA.js
window.initFinalCTAAnimations = function() {
    console.log("🎬 GSAP: Animating Common Final CTA...");

    const placeholder = document.querySelector("#final-CTA-placeholder");
    const tl = gsap.timeline();

    // 1. Reveal the Banner Wrapper
    tl.fromTo(".cta-banner", 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    
    // 2. Stagger Text items on the left
    .fromTo(".cta-left > *", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out" },
        "-=0.5"
    )

    // 3. Cinematic Shutter Reveal for the Founder Photo
    // This makes the image "unroll" from bottom to top
    .fromTo(".founder-portrait-wrap", 
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        { clipPath: "inset(0 0 0% 0)", opacity: 1, duration: 1.5, ease: "expo.inOut" },
        "-=1"
    )

    // 4. Fade in the Quote
    .fromTo(".founder-quote-area > *", 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power2.out" },
        "-=0.5"
    );
};