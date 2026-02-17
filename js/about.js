document.addEventListener("siteReady", () => {
    console.log("About Page: Initializing Specific Animations...");
    initAboutHero();
    initMissionReveal();
    initMonolithValues();
    initPhilosophyReveal();
    initHistoryTimeline();
    initRecognitionReveal();
    initAboutFinalCTA();


});

function initAboutHero() {
    const tl = gsap.timeline();

    // Entrance Animation
    tl.from(".about-hero-bg img", { scale: 1.1, duration: 2, ease: "power2.out" })
        .from(".about-hero-content > *", { y: 50, opacity: 0, stagger: 0.2, duration: 1.2, ease: "expo.out" }, "-=1.5")
        .from(".stat-item", { y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out" }, "-=1")
        .to(".stat-bar", { scaleY: 1, duration: 1.5, ease: "expo.inOut", stagger: 0.1 }, "-=1");

    // Counters
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute("data-target"));
        gsap.to(counter, {
            innerText: target,
            duration: 2.5,
            scrollTrigger: { trigger: counter, start: "top 90%" },
            onUpdate: function () {
                let val = this.targets()[0].innerText;
                counter.innerHTML = (target === 4.9) ? parseFloat(val).toFixed(1) + "/5" : Math.ceil(val) + "+";
            }
        });
    });
}

function initMissionReveal() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".mission-section",
            start: "top 75%"
        }
    });

    tl.from(".mission-text-content .reveal-item", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out"
    })
        .from(".mission-frame", {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.5,
            ease: "expo.inOut"
        }, "-=1")
        .from(".mission-image", {
            scale: 1.2,
            duration: 2,
            ease: "power2.out"
        }, "-=1.5");
}

function initMonolithValues() {

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".values-monolith-section",
            start: "top 75%"
        }
    });

    tl.from(".values-intro .values-title", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out"
    })

    // 1. THE INDIVIDUAL REVEAL
    // We loop through each item to give it its own trigger point
    gsap.utils.toArray(".monolith-item").forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,      // Each item is its own trigger
                start: "top 90%",   // Triggers when the top of the item hits 90% of viewport
                delay: 5,
                toggleActions: "play none none none"
            },
            clipPath: "inset(0 0 100% 0)",
            y: 100,
            skewY: 5,
            opacity: 0,
            duration: 1.5,
            ease: "expo.out"
        });

        // 2. THE INTERACTIVE KINETICS (Mouse Move Logic)
        const title = item.querySelector(".m-title");
        const rightSide = item.querySelector(".m-right");
        const bgGlow = item.querySelector(".monolith-bg");

        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // 3D TILT
            gsap.to(item, {
                rotationX: -y * 8,
                rotationY: x * 8,
                transformPerspective: 1200,
                duration: 0.6,
                ease: "power2.out"
            });

            // PARALLAX DEPTH
            gsap.to(title, {
                x: x * 50,
                y: y * 20,
                z: 40,
                duration: 0.6,
                ease: "power2.out"
            });

            gsap.to(rightSide, {
                x: x * -40,
                y: y * -10,
                duration: 0.6,
                ease: "power2.out"
            });

            // GLOW FOLLOW
            gsap.to(bgGlow, {
                opacity: 1,
                x: x * 150,
                y: y * 100,
                duration: 0.8
            });
        });

        item.addEventListener("mouseleave", () => {
            // RESET
            gsap.to(item, {
                rotationX: 0,
                rotationY: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.3)"
            });

            gsap.to([title, rightSide], {
                x: 0, y: 0, z: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.to(bgGlow, {
                opacity: 0,
                duration: 0.6
            });
        });
    });
}

function initPhilosophyReveal() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".philosophy-section",
            start: "top 70%"
        }
    });

    // 1. Reveal Titles
    tl.from(".philo-main-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
    })
        // 2. Reveal list items with a "draw-line" effect
        .from(".philo-item", {
            opacity: 0,
            x: (i) => i % 2 === 0 ? -30 : 30, // Left side slides right, right side slides left
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5");

    // 3. Animate the border-bottom width expansion (Modern Studio effect)
    gsap.from(".philo-item", {
        scrollTrigger: {
            trigger: ".philosophy-section",
            start: "top 60%"
        },
        borderBottomWidth: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out"
    });
}

function initHistoryTimeline() {
    // 1. Entrance Reveal for Left Text
    gsap.from(".history-info .reveal-item", {
        scrollTrigger: {
            trigger: ".history-info",
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    });

    // 2. Vertical Line Drawing Animation
    gsap.to(".timeline-line-progress", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".history-timeline",
            start: "top center",
            end: "bottom center",
            scrub: 1 // Ties line growth to scroll speed
        }
    });

    // 3. Dot Activation Logic
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => {
        ScrollTrigger.create({
            trigger: item,
            start: "top center",
            onEnter: () => item.classList.add("active"),
            onLeaveBack: () => item.classList.remove("active")
        });

        // Content reveal for each point
        gsap.from(item.querySelector(".timeline-content"), {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            x: 20,
            opacity: 0,
            duration: 0.8
        });
    });
}

function initRecognitionReveal() {
    const blocks = document.querySelectorAll(".recognition-block");

    blocks.forEach((block, i) => {
        const direction = (i % 2 === 0) ? -100 : 100; // Alternate slide direction

        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: direction,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        });

        // Parallax effect for the images inside the blocks
        gsap.from(block.querySelector(".rec-visual img"), {
            scrollTrigger: {
                trigger: block,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            scale: 1.1,
            y: 30,
            ease: "none"
        });
    });
}

function initAboutFinalCTA() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-final-cta",
            start: "top 70%",
        }
    });

    // 1. Reveal Banner and Left Content
    tl.from(".cta-banner", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out"
    })
    .from(".cta-left > *", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8
    }, "-=0.8")

    // 2. Cinematic Shutter Reveal for Founder Portrait
    .from(".founder-portrait-wrap", {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        scale: 1.1,
        duration: 1.5,
        ease: "expo.inOut"
    }, "-=1")

    // 3. Fade in Quote & Author
    .from(".founder-quote-area > *", {
        opacity: 0,
        y: 15,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5");
}
