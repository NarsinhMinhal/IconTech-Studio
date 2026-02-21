document.addEventListener("siteReady", () => {
    if (!document.querySelector(".app-hero")) return;
    console.log("🚀 App Dev: Initializing 3D Kinetic Showcase...");
    initAppDevAnimations();
    initPartnerSection();
    initCapabilityAnimations();
    initRoadmapModule();
    initSpecializedServices();


});

function initAppDevAnimations() {
    const screens = gsap.utils.toArray(".iphone-mockup");
    const tl = gsap.timeline();

    tl.to(".app-reveal", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.15, // Delay between each item
        duration: 1.2,
        ease: "power4.out",
        // clearProps: "all" 
    });

    // 2. MOCKUP SCREENS REVEAL (Right Side)
    // Ensure this starts slightly before the text finishes
    tl.to(".mockup-screen", {
        x: 0,
        z: 0,
        rotationY: 0,
        autoAlpha: 1,
        stagger: 0.12,
        duration: 1.5,
        ease: "expo.out"
    }, "-=1"); // Overlaps with the text reveal by 1 second


    // Screens slide up and fan out from the center
    gsap.to(screens, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".iphone-stack-container",
            start: "top 80%"
        }
    });

    // 2. THE UP-DOWN FLOATING EFFECT (Idle Animation)
    screens.forEach((screen, i) => {
        gsap.to(screen, {
            y: (i % 2 === 0) ? -20 : 20, // Alternates direction for a natural look
            duration: 3 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    // 3. KINETIC HOVER (Interactive Lift)
    screens.forEach(screen => {
        screen.addEventListener("mouseenter", () => {
            gsap.to(screen, {
                scale: 1.05,
                y: "-=30", // Lifts higher on hover
                duration: 0.6,
                ease: "power3.out"
            });
        });

        screen.addEventListener("mouseleave", () => {
            gsap.to(screen, {
                scale: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });
}

function initPartnerSection() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".partner-trust-section",
            start: "top 70%",
        }
    });

    // 1. Reveal Text Items
    tl.from(".partner-reveal", {
        x: -50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    })
    // 2. Reveal Image Frame
    tl.from([".portrait-frame", ".tech-tag"], {
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out"
    }, "-=0.8")
        // 3. Slide in the Overlapping Impact Card
        .from(".impact-glass-card", {
        x: 100,
        opacity: 0,
        rotation: 5,
        duration: 1.2,
        ease: "back.out(1.2)"
    }, "-=1");

    // 4. INFINITE FLOATING TAGS
    gsap.to(".tag-ios", {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".tag-android", {
        y: 15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

function initCapabilityAnimations() {
    // 1. Reveal Section Header
    gsap.from(".capability-header .reveal-item", {
        scrollTrigger: {
            trigger: ".capability-header",
            start: "top 85%"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // 2. Animate each Row individually on scroll
    const rows = gsap.utils.toArray(".reveal-row");

    rows.forEach((row) => {
        const line = row.querySelectorAll(".row-divider");
        const title = row.querySelector(".row-title");
        const text = row.querySelector(".row-text");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: row,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });

        tl.to(line, {
            width: "100%",
            duration: 1.2,
            ease: "expo.inOut"
        })
            .from([title, text], {
                y: 20,
                opacity: 0,
                filter: "blur(10px)",
                duration: 0.8,
                stagger: 0.1
            }, "-=0.6");
    });
}

function initRoadmapModule() {
    const section = document.querySelector(".roadmap-section");
    const visual = document.querySelector(".visual-engine-wrapper");
    const img = document.querySelector(".engine-main-img");
    const steps = document.querySelectorAll(".step-item");

    if (!section || !visual) return;

    // 1. THE ENTRANCE: Shutter reveal for the visual
    const entranceTl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 75%",
        }
    });

    entranceTl
        .from(".roadmap-reveal", { y: 40, opacity: 0, stagger: 0.1, duration: 1 })
        .from(visual, {
            clipPath: "inset(0 100% 0 0)", // Slides open like a curtain
            x: 50,
            duration: 1.5,
            ease: "expo.inOut"
        }, "-=0.8")
        .from(".visual-meta-tag", { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.5");


    gsap.to(".roadmap-main-title", {
        scrollTrigger: {
            trigger: ".roadmap-header",
            start: "top 85%", // Starts when the header peeks onto the screen
            toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.2, // Delay between first and second line
        ease: "power4.out",
    });

    // 2. THE POWER LINE
    gsap.to(".power-line-active", {
        height: "100%",
        scrollTrigger: {
            trigger: ".roadmap-steps",
            start: "top center",
            // end: "bottom center",
            scrub: 1
        }
    });

    steps.forEach(step => {
        ScrollTrigger.create({
            trigger: step, start: "top center",
            onEnter: () => step.classList.add("active"),
            onLeaveBack: () => step.classList.remove("active")
        });
    });

    // 3. KINETIC MOUSE INTERACTION
    visual.addEventListener("mousemove", (e) => {
        const rect = visual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // 3D Tilt for the image frame
        gsap.to(visual, {
            rotationY: x * 20,
            rotationX: -y * 20,
            transformPerspective: 1000,
            duration: 0.6,
            ease: "power2.out"
        });

        // Subtle Parallax for the image inside
        gsap.to(img, {
            x: -x * 30,
            y: -y * 30,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    visual.addEventListener("mouseleave", () => {
        gsap.to([visual, img], { rotationY: 0, rotationX: 0, x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" });
    });
}

function initSpecializedServices() {
    const section = document.querySelector(".specialized-services-section");
    if (!section) return;

    // 1. Force a refresh so ScrollTrigger knows where these items are 
    // now that the loader has opened the 'main' tag
    ScrollTrigger.refresh();

    // 2. The Entrance Reveal
    const entranceTl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 80%", // Starts when the section enters 80% of the screen
            toggleActions: "play none none reverse"
        }
    });

    // We use fromTo to guarantee they become visible
    entranceTl.fromTo(".special-content .reveal-item",
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out"
        }
    )
        .fromTo(".reveal-image",
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" },
            "-=0.6"
        );


    gsap.to(".special-content .reveal-item", {
        scrollTrigger: {
            trigger: ".special-content",
            start: "top 85%", // Starts when the title area enters 85% of viewport
            toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.15, // Delay between "Mobile development" and "services."
        ease: "power4.out", // High-end snappy-to-smooth curve
    });

    // 3. View More Toggle Logic
    const toggleBtn = document.getElementById("toggleServices");
    const drawer = document.querySelector(".hidden-services-wrap");
    let isExpanded = false;

    toggleBtn.addEventListener("click", () => {
        isExpanded = !isExpanded;

        toggleBtn.classList.toggle("active");
        const btnText = toggleBtn.querySelector(".btn-text");
        btnText.innerText = isExpanded ? "View less services" : "Explore more services";

        gsap.to(drawer, {
            height: isExpanded ? "auto" : 0,
            autoAlpha: isExpanded ? 1 : 0,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => ScrollTrigger.refresh() // Recalculates page length
        });
    });
}
