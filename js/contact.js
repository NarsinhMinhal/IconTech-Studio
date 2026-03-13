 document.addEventListener("siteReady", () => {
    if (!document.querySelector(".contact-hero")) return;
    
    initContactAnimations();
    initBookingAnimations();


});

function initContactAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    gsap.set(".contact-reveal", { opacity: 0, y: 30 });
    gsap.set(".contact-form-card", { opacity: 0, x: window.innerWidth > 1024 ? 50 : 0, y: window.innerWidth > 1024 ? 0 : 50 });

    tl.to(".contact-visual-side .contact-reveal", {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
        delay: 0.2
    })
    .to(".contact-form-card", {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
    }, "-=0.8")
    .from(".form-group, .form-services, .form-action", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.6");

    if (window.innerWidth > 1024) {
        const frame = document.querySelector(".contact-image-frame");
        const img = frame.querySelector("img");

        frame.addEventListener("mousemove", (e) => {
            const { width, height, left, top } = frame.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to(img, {
                x: x * 20,
                y: y * 20,
                scale: 1.05,
                duration: 0.6,
                ease: "power2.out"
            });
        });

        frame.addEventListener("mouseleave", () => {
            gsap.to(img, { x: 0, y: 0, scale: 1, duration: 1 });
        });
    }
}

function initBookingAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const bookingSection = document.querySelector(".booking-section");
    let mm = gsap.matchMedia();

    mm.add({
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)"
    }, (context) => {
        let { isDesktop } = context.conditions;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: bookingSection,
                start: isDesktop ? "top 75%" : "top 90%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(".booking-reveal", 
            { 
                y: isDesktop ? 40 : 20, 
                opacity: 0,
                filter: "blur(10px)"
            }, 
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                stagger: 0.15,
                duration: 1,
                ease: "power3.out"
            }
        );
        
        tl.to(".calendly-glass-frame", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out"
        }, "-=0.6");
    });
}