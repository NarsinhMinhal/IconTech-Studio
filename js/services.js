document.addEventListener("siteReady", () => {
    if (!document.querySelector(".services-hero")) return;
    initServicesHero();
    initServicesGrid();
    initArchitectProcess();
    initWorkMarquee();

});

function initServicesHero() {
    const tl = gsap.timeline();

    // 1. Reveal Text & SVG Wrapper
    tl.from(".services-reveal", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    })
        .from(".services-visual-reveal", {
            scale: 0.8,
            autoAlpha: 0,
            duration: 1.5,
            ease: "expo.out"
        }, "-=0.8");

    // Inside your services animations function
gsap.from(".services-intro > *", {
    scrollTrigger: {
        trigger: ".services-intro",
        start: "top 85%",
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out"
});

    // 2. Animate the Code Lines inside SVG (Typewriter effect)
    gsap.from(".code-line-1, .code-line-2, .code-line-3", {
        scaleX: 0,
        stagger: 0.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
    });

    // 3. Constant Floating Animation for Tech Elements
    gsap.to(".floating-element", {
        y: "random(-15, 15)",
        x: "random(-10, 10)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // 4. Parallax Orbs
    gsap.to(".floating-orb", {
        y: -40,
        duration: 5,
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
        stagger: 0.2, // Time between card 1, 2, and 3
        ease: "power3.out",
        clearProps: "all"
    });
}


function initArchitectProcess() {
    // 1. Animate the central Progress Line
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

    // 2. Animate each Step Row
    const rows = gsap.utils.toArray(".reveal-step");

    rows.forEach((row) => {
        const title = row.querySelector(".step-title");
        const frame = row.querySelector(".shutter-frame");
        const content = row.querySelector(".step-content");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: row,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(content, {
            x: row.classList.contains("even") ? 50 : -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .to(frame, {
                clipPath: "inset(0% 0 0 0)", // Shutter open
                duration: 1.2,
                ease: "expo.inOut"
            }, "-=0.8")
            .from(title, {
                y: 30,
                opacity: 0,
                duration: 0.8
            }, "-=0.5");
    });
}

document.addEventListener("siteReady", () => {
    // Only run if the track exists on the current page
    if (document.getElementById("workTrack")) {
        // We wait 200ms after the shutter opens to let images settle
        setTimeout(initWorkMarquee, 200);
    }
});

function initWorkMarquee() {
    const track = document.getElementById("workTrack");
    if (!track) return;

    // 1. CLONE CONTENT (Triple clone for 4K stability)
    const originalHTML = track.innerHTML;
    track.innerHTML = originalHTML + originalHTML + originalHTML;

    // 2. MEASURE ONE SET
    const cards = track.querySelectorAll(".work-img-card");
    const totalCards = cards.length;
    const singleSetCount = totalCards / 3;
    
    // Width of one card + its gap
    const cardWidth = cards[0].offsetWidth;
    const gap = 30; // Matches CSS
    const scrollDist = (cardWidth + gap) * singleSetCount;

    // 3. THE ANIMATION
    const marquee = gsap.to(track, {
        x: -scrollDist,
        duration: 50, // Adjust speed (higher = slower)
        ease: "none",
        repeat: -1,
        force3D: true,
        modifiers: {
            // This is the mathematical fix for the 'jump'
            x: gsap.utils.unitize(val => parseFloat(val) % scrollDist)
        }
    });
}