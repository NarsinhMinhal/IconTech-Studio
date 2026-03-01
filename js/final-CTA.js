window.initFinalCTAAnimations = function () {

    const mm = gsap.matchMedia();

    // DESKTOP
    mm.add("(min-width: 769px)", () => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".common-final-cta",
                start: "top 80%"
            }
        });

        tl.from(".cta-banner", {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out"
        })
        .from(".cta-left > *", {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 1
        }, "-=0.5")
        .from(".founder-portrait-wrap", {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.2,
            ease: "expo.inOut"
        }, "-=1")
        .from(".founder-quote-area > *", {
            opacity: 0,
            y: 15,
            stagger: 0.2,
            duration: 1
        }, "-=0.5");
    });

    // MOBILE (lighter)
    mm.add("(max-width: 768px)", () => {

        gsap.from(".cta-banner", {
            scrollTrigger: {
                trigger: ".common-final-cta",
                start: "top 85%"
            },
            y: 40,
            opacity: 0,
            duration: 0.8
        });

        gsap.from(".cta-left > *", {
            scrollTrigger: {
                trigger: ".cta-left",
                start: "top 85%"
            },
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6
        });

        gsap.from(".cta-right-founder", {
            scrollTrigger: {
                trigger: ".cta-right-founder",
                start: "top 90%"
            },
            y: 30,
            opacity: 0,
            duration: 0.6
        });
    });
};