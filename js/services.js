document.addEventListener("siteReady", () => {
    if (!document.querySelector(".services-hero")) return;
    initServicesHero();
    initServicesGrid();
    initArchitectProcess();
    initWorkMarquee();

});

function initServicesHero() {

    const tl = gsap.timeline();

    // Text reveal
    tl.from(".services-reveal", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    })
        .from(".services-visual-reveal", {
            scale: 0.85,
            autoAlpha: 0,
            duration: 1.5,
            ease: "expo.out"
        }, "-=0.8");

    // Code line animation
    gsap.from(".code-line-1, .code-line-2, .code-line-3", {
        scaleX: 0,
        stagger: 0.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
    });

    // Floating tech elements
    gsap.to(".floating-element", {
        y: "random(-10, 10)",
        x: "random(-6, 6)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Floating orbs
    gsap.to(".floating-orb", {
        y: -25,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

}

function initServicesGrid() {
    gsap.from(".reveal-card", {
        scrollTrigger: {
            trigger: ".services-main-grid",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        clearProps: "all"
    });
}

function initArchitectProcess() {

    const mm = gsap.matchMedia();

    /* =========================
       DESKTOP ANIMATION
    ========================== */
    mm.add("(min-width: 1025px)", () => {

        // Progress Line (scrub)
        gsap.to(".blueprint-line-active", {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: ".process-blueprint-area",
                start: "top 60%",
                end: "bottom 60%",
                scrub: 1
            }
        });

        gsap.utils.toArray(".reveal-step").forEach((row, index) => {

            const content = row.querySelector(".step-content");
            const frame = row.querySelector(".shutter-frame");

            const direction = index % 2 === 0 ? -60 : 60;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(content, {
                x: direction,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
            .to(frame, {
                clipPath: "inset(0% 0 0 0)",
                duration: 1.2,
                ease: "expo.inOut"
            }, "-=0.8");
        });
    });

    /* =========================
       MOBILE / TABLET ANIMATION
    ========================== */
    mm.add("(max-width: 1024px)", () => {

        // No scrub, simple grow
        gsap.to(".blueprint-line-active", {
            height: "100%",
            duration: 1.5,
            scrollTrigger: {
                trigger: ".process-blueprint-area",
                start: "top 80%"
            }
        });

        gsap.utils.toArray(".reveal-step").forEach((row) => {

            const content = row.querySelector(".step-content");
            const frame = row.querySelector(".shutter-frame");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            // Simple fade up
            tl.from(content, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            })
            .to(frame, {
                clipPath: "inset(0% 0 0 0)",
                duration: 0.9,
                ease: "power2.out"
            }, "-=0.5");
        });
    });
}

function initWorkMarquee() {
    const track = document.getElementById("workTrack");
    if (!track) return;

    // Clone once (not triple needed now)
    const originalHTML = track.innerHTML;
    track.innerHTML = originalHTML + originalHTML;

    // Wait for layout to settle
    requestAnimationFrame(() => {

        const cards = track.querySelectorAll(".work-img-card");
        const singleSetCount = cards.length / 2;

        const cardWidth = cards[0].offsetWidth;

        // Get real computed gap
        const computedStyle = window.getComputedStyle(track);
        const gap = parseFloat(computedStyle.columnGap || computedStyle.gap);

        const scrollDist = (cardWidth + gap) * singleSetCount;

        gsap.to(track, {
            x: -scrollDist,
            duration: window.innerWidth < 768 ? 35 : 50, // Faster on mobile
            ease: "none",
            repeat: -1,
            force3D: true,
            modifiers: {
                x: gsap.utils.unitize(val => parseFloat(val) % scrollDist)
            }
        });
    });
}