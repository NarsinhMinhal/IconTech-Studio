document.addEventListener("siteReady", () => {
    if (!document.querySelector(".service_details-hero")) return;
    console.log("🚀 App Dev: Initializing 3D Kinetic Showcase...");
    initAppDevAnimations();
    initPartnerSection();
    initCapabilityAnimations();
    initRoadmapModule();
    initSpecializedServices();


});

function initAppDevAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const screens = gsap.utils.toArray(".iphone-mockup");
    if (!screens.length) return;

    let mm = gsap.matchMedia();


    /* ===============================
       TABLET + DESKTOP REVEAL
    =============================== */

    mm.add("(min-width: 768px)", () => {

        gsap.to(".service_details-reveal", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.15,
            duration: 1.2,
            ease: "power4.out"
        });

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

    });


    /* ===============================
       DESKTOP ONLY (>1024px)
       Floating + Hover highlight
    =============================== */

    mm.add("(min-width: 1025px)", () => {

        // Gentle float per phone
        screens.forEach((screen, i) => {
            gsap.to(screen, {
                y: (i % 2 === 0) ? -20 : 20,
                duration: 3 + i * 0.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

        // Hover highlight
        screens.forEach(screen => {
            screen.addEventListener("mouseenter", () => {
                screens.forEach(s => s.classList.add("dimmed"));
                screen.classList.remove("dimmed");
                screen.classList.add("active-hover");
                gsap.to(screen, { scale: 1.08, duration: 0.3, ease: "power3.out" });
            });

            screen.addEventListener("mouseleave", () => {
                screens.forEach(s => {
                    s.classList.remove("dimmed", "active-hover");
                });
                gsap.to(screen, { scale: 1, duration: 0.3, ease: "power3.out" });
            });
        });

    });


    /* ===============================
       MOBILE ONLY (<768px)
       Auto-advancing carousel with dots
    =============================== */

    mm.add("(max-width: 767px)", () => {

        // Instantly show text — no scroll needed on mobile hero
        gsap.set(".service_details-reveal", {
            opacity: 1, y: 0, filter: "blur(0px)"
        });

        // Reset all phones to stacked position (CSS handles base state)
        gsap.set(screens, { opacity: 0, scale: 1, x: 0, y: 0, rotation: 0 });

        // ---- Build dot indicators ----
        const visual = document.querySelector(".service_details-hero-visual");
        let dotsWrap = document.querySelector(".carousel-dots");

        // Create only once
        if (!dotsWrap) {
            dotsWrap = document.createElement("div");
            dotsWrap.className = "carousel-dots";
            screens.forEach((_, i) => {
                const dot = document.createElement("div");
                dot.className = "carousel-dot" + (i === 0 ? " active" : "");
                dot.addEventListener("click", () => goTo(i));
                dotsWrap.appendChild(dot);
            });
            visual.appendChild(dotsWrap);
        }

        const dots = dotsWrap.querySelectorAll(".carousel-dot");

        let current  = 0;
        let timer    = null;
        let isAnimating = false;

        function goTo(index, direction) {
            if (isAnimating || index === current) return;
            isAnimating = true;

            const prev    = current;
            current       = index;
            const dir     = direction ?? (index > prev ? 1 : -1);
            const enterX  = dir * 260;  // incoming from right or left
            const exitX   = -dir * 260; // outgoing opposite direction

            // Update dots
            dots.forEach((d, i) => d.classList.toggle("active", i === current));

            const prevScreen = screens[prev];
            const nextScreen = screens[current];

            // Set incoming phone off-screen
            gsap.set(nextScreen, { opacity: 1, x: enterX, scale: 0.88 });
            nextScreen.classList.add("carousel-active");

            // Slide out current, slide in next
            const tl = gsap.timeline({
                onComplete: () => {
                    prevScreen.classList.remove("carousel-active");
                    gsap.set(prevScreen, { opacity: 0, x: 0 });
                    isAnimating = false;
                }
            });

            tl.to(prevScreen, {
                x: exitX,
                opacity: 0,
                scale: 0.88,
                duration: 0.45,
                ease: "power2.in"
            }, 0)
            .to(nextScreen, {
                x: 0,
                scale: 1,
                duration: 0.55,
                ease: "power3.out"
            }, 0.05);
        }

        function next() {
            goTo((current + 1) % screens.length, 1);
        }

        function startTimer() {
            clearInterval(timer);
            timer = setInterval(next, 3000);
        }

        // Show first phone
        gsap.set(screens[0], { opacity: 1, x: 0, scale: 1 });
        screens[0].classList.add("carousel-active");
        startTimer();

        // Touch swipe support
        const container = document.querySelector(".iphone-stack-container");
        let touchStartX = 0;

        container.addEventListener("touchstart", e => {
            touchStartX = e.touches[0].clientX;
            clearInterval(timer); // pause on touch
        }, { passive: true });

        container.addEventListener("touchend", e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                diff > 0
                    ? goTo((current + 1) % screens.length, 1)
                    : goTo((current - 1 + screens.length) % screens.length, -1);
            }
            startTimer(); // resume after swipe
        }, { passive: true });

        // Cleanup on matchMedia exit (e.g. screen rotated to desktop)
        return () => {
            clearInterval(timer);
            screens.forEach(s => {
                s.classList.remove("carousel-active");
                gsap.set(s, { opacity: 0.7, x: 0, scale: 1 });
            });
            if (dotsWrap) dotsWrap.remove();
        };

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

    const section        = document.querySelector(".roadmap-section");
    const steps          = document.querySelectorAll(".step-item");
    const visual         = document.querySelector(".visual-engine-wrapper");
    const img            = document.querySelector(".engine-main-img");
    const stepsContainer = document.querySelector(".roadmap-steps");
    const lineBg         = document.querySelector(".power-line-bg");
    const lineActive     = document.querySelector(".power-line-active");

    if (!section || !steps.length) return;


    /* =================================
       HEADING REVEAL
    ================================= */

    gsap.to(".roadmap-main-title", {
        y: 0, opacity: 1, filter: "blur(0px)",
        duration: 1.2, ease: "power4.out",
        scrollTrigger: {
            trigger: ".roadmap-header",
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });


    /* =================================
       LINE HEIGHT — JS se exact pixel
    ================================= */

    function setLineHeight() {
        if (!stepsContainer || !lineBg || !lineActive) return;
        const firstNum = steps[0].querySelector(".step-number");
        const lastNum  = steps[steps.length - 1].querySelector(".step-number");
        if (!firstNum || !lastNum) return;

        const containerTop = stepsContainer.getBoundingClientRect().top + window.scrollY;
        const firstCenter  = firstNum.getBoundingClientRect().top  + window.scrollY + firstNum.offsetHeight / 2;
        const lastCenter   = lastNum.getBoundingClientRect().top   + window.scrollY + lastNum.offsetHeight  / 2;

        [lineBg, lineActive].forEach(el => {
            el.style.top    = (firstCenter - containerTop) + "px";
            el.style.height = (lastCenter - firstCenter)   + "px";
        });
    }

    setLineHeight();


    /* =================================
       POWER LINE + STEP ACTIVATION
       — single ScrollTrigger, onUpdate se
         line progress track karke steps activate karo
    ================================= */

    // Pehle sab steps ke number ka pageY center nikaalo
    function getStepCenters() {
        return Array.from(steps).map(step => {
            const num = step.querySelector(".step-number");
            return num.getBoundingClientRect().top + window.scrollY + num.offsetHeight / 2;
        });
    }

    const lastStep = steps[steps.length - 1];

    gsap.to(".power-line-active", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
            trigger: ".roadmap-steps",
            start: "top 70%",
            endTrigger: lastStep,
            end: "center 70%",
            scrub: true,

            // Har scroll frame pe: line kitni badi hai usse pata karo
            // ki line kis step ke center tak pahunchi — aur woh activate karo
            onUpdate(self) {
                const firstNum     = steps[0].querySelector(".step-number");
                const lastNum      = lastStep.querySelector(".step-number");
                if (!firstNum || !lastNum) return;

                const firstCenter  = firstNum.getBoundingClientRect().top + firstNum.offsetHeight / 2;
                const lastCenter   = lastNum.getBoundingClientRect().top  + lastNum.offsetHeight  / 2;
                const totalHeight  = lastCenter - firstCenter;

                // Line ka current bottom kitne px neeche hai firstCenter se
                const lineFront    = firstCenter + totalHeight * self.progress;

                steps.forEach(step => {
                    const num    = step.querySelector(".step-number");
                    const center = num.getBoundingClientRect().top + num.offsetHeight / 2;

                    // Agar line ka front is step ke center se guzar chuka hai → active
                    if (lineFront >= center) {
                        step.classList.add("active");
                    } else {
                        step.classList.remove("active");
                    }
                });
            }
        }
    });


    /* =================================
       VISUAL ENTRANCE
    ================================= */

    if (visual) {
        gsap.from(visual, {
            scale: 0.9, y: 80, opacity: 0,
            duration: 1.3, ease: "power4.out",
            scrollTrigger: { trigger: visual, start: "top 80%" }
        });
    }


    /* =================================
       3D HOVER — desktop only
    ================================= */

    if (window.innerWidth > 1024 && visual) {
        visual.addEventListener("mousemove", (e) => {
            const rect = visual.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - 0.5;
            const y = (e.clientY - rect.top)  / rect.height - 0.5;

            gsap.to(visual, { rotationY: x * 18, rotationX: -y * 18, duration: 0.6 });
            if (img) gsap.to(img, { x: -x * 35, y: -y * 35, duration: 0.6 });
        });

        visual.addEventListener("mouseleave", () => {
            gsap.to([visual, img], { rotationY: 0, rotationX: 0, x: 0, y: 0, duration: 1 });
        });
    }


    /* =================================
       RESIZE
    ================================= */

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setLineHeight();
            ScrollTrigger.refresh();
        }, 200);
    });

}

function initSpecializedServices() {
    const section = document.querySelector(".specialized-services-section");
    if (!section) return;

    ScrollTrigger.refresh();

    /* =================================
       ENTRANCE REVEAL
    ================================= */
    const entranceTl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    entranceTl
        .fromTo(".special-content .reveal-item",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(".reveal-image",
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" },
            "-=0.6"
        );


    /* =================================
       VIEW MORE TOGGLE
    ================================= */
    const toggleBtn = document.getElementById("toggleServices");
    const drawer    = document.querySelector(".hidden-services-wrap");
    if (!toggleBtn || !drawer) return;

    let isExpanded = false;

    toggleBtn.addEventListener("click", () => {
        isExpanded = !isExpanded;

        toggleBtn.classList.toggle("active", isExpanded);

        // Change text — briefly remove hover state so ::after resets to scaleX(0)
        // without this, the underline stays visible after text swap
        const btnText = toggleBtn.querySelector(".btn-text");
        btnText.style.pointerEvents = "none"; // block hover re-trigger during swap
        btnText.innerText = isExpanded ? "View less services" : "Explore more services";

        // Re-enable hover after a frame so ::after transition plays fresh on next hover
        requestAnimationFrame(() => {
            btnText.style.pointerEvents = "";
        });

        gsap.to(drawer, {
            height:     isExpanded ? "auto" : 0,
            autoAlpha:  isExpanded ? 1 : 0,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => ScrollTrigger.refresh()
        });
    });
}