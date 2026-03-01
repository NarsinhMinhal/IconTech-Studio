document.addEventListener("siteReady", () => {
    console.log("About Page: Initializing Specific Animations...");
    initAboutHero();
    initMissionReveal();
    initMonolithValues();
    initPhilosophyReveal();
    initHistoryTimeline();
    initRecognitionReveal();

});

function initAboutHero() {

    const mm = gsap.matchMedia();

    /* ==========================
        DESKTOP ANIMATION
     ========================== */
    mm.add("(min-width: 769px)", () => {

        const tl = gsap.timeline();
        tl.from(".about-hero-bg img", {
            scale: 1.1,
            duration: 2,
            ease: "power2.out"
        })
            .from(".about-hero-content > *", {
                y: 60,
                opacity: 0,
                stagger: 0.2,
                duration: 1.2,
                ease: "expo.out"
            }, "-=1.5")
            .from(".stat-item", {
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out"
            }, "-=1")
            .to(".stat-bar", {
                scaleY: 1,
                duration: 1.5,
                ease: "expo.inOut",
                stagger: 0.1
            }, "-=1");
    });

    /* ==========================
         MOBILE ANIMATION
     ========================== */
    mm.add("(max-width: 768px)", () => {

        // No heavy background zoom
        gsap.from(".about-hero-content > *", {
            y: 25,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out"
        });

        gsap.from(".stat-item", {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.7,
            delay: 0.3
        });

    });

    /* ==========================
         COUNTERS (All Devices)
     ========================== */
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute("data-target"));
        gsap.to(counter, {
            innerText: target,
            duration: 2,
            scrollTrigger: {
                trigger: counter,
                start: "top 85%"
            },
            onUpdate: function () {
                let val = this.targets()[0].innerText;
                counter.innerHTML = (target === 4.9)
                    ? parseFloat(val).toFixed(1) + "/5"
                    : Math.ceil(val) + "+";
            }
        });
    });
}

function initMissionReveal() {
    const mm = gsap.matchMedia();

    // DESKTOP
    mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".mission-section",
                start: "top 75%"
            }
        });
        tl.from(".mission-text-content .reveal-item", {
            y: 50,
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
    });

    // MOBILE
    mm.add("(max-width: 768px)", () => {
        gsap.from(".mission-text-content .reveal-item", {
            y: 25,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".mission-section",
                start: "top 85%"
            }
        });
        gsap.from(".mission-frame", {
            y: 30,
            opacity: 0,
            duration: 0.9,
            scrollTrigger: {
                trigger: ".mission-frame",
                start: "top 85%"
            }
        });
    });
}

function initMonolithValues() {

    const mm = gsap.matchMedia();

    // DESKTOP
    mm.add("(min-width: 769px)", () => {

        gsap.utils.toArray(".monolith-item").forEach((item) => {

            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%"
                },
                clipPath: "inset(0 0 100% 0)",
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: "expo.out"
            });

            const title = item.querySelector(".m-title");
            const rightSide = item.querySelector(".m-right");
            const bgGlow = item.querySelector(".monolith-bg");

            item.addEventListener("mousemove", (e) => {
                const rect = item.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(item, {
                    rotationX: -y * 8,
                    rotationY: x * 8,
                    transformPerspective: 1200,
                    duration: 0.6
                });

                gsap.to(title, { x: x * 40, y: y * 15, duration: 0.6 });
                gsap.to(rightSide, { x: x * -30, y: y * -10, duration: 0.6 });
                gsap.to(bgGlow, { opacity: 1, duration: 0.6 });
            });

            item.addEventListener("mouseleave", () => {
                gsap.to(item, { rotationX: 0, rotationY: 0, duration: 1 });
                gsap.to([title, rightSide], { x: 0, y: 0, duration: 1 });
                gsap.to(bgGlow, { opacity: 0, duration: 0.5 });
            });

        });
    });

    // MOBILE (NO 3D TILT)
    mm.add("(max-width: 768px)", () => {

        gsap.utils.toArray(".monolith-item").forEach((item) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });

    });
}

function initPhilosophyReveal() {

    const mm = gsap.matchMedia();

    // DESKTOP
    mm.add("(min-width: 769px)", () => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".philosophy-section",
                start: "top 70%"
            }
        });

        tl.from(".philo-main-title", {
            opacity: 0,
            y: 40,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out"
        })
            .from(".philo-item", {
                opacity: 0,
                x: (i) => i % 2 === 0 ? -40 : 40,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.5");

    });

    // MOBILE
    mm.add("(max-width: 768px)", () => {

        gsap.from(".philo-main-title", {
            scrollTrigger: {
                trigger: ".philosophy-section",
                start: "top 85%"
            },
            y: 30,
            opacity: 0,
            duration: 0.8
        });

        gsap.from(".philo-item", {
            scrollTrigger: {
                trigger: ".philo-list",
                start: "top 85%"
            },
            y: 25,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out"
        });
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

    const mm = gsap.matchMedia();

    // DESKTOP
    mm.add("(min-width: 769px)", () => {

        const blocks = document.querySelectorAll(".recognition-block");

        blocks.forEach((block, i) => {

            const direction = (i % 2 === 0) ? -100 : 100;

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
    });

    // MOBILE
    mm.add("(max-width: 768px)", () => {

        gsap.utils.toArray(".recognition-block").forEach((block) => {

            gsap.from(block, {
                scrollTrigger: {
                    trigger: block,
                    start: "top 90%"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    });
}