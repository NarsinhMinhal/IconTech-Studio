 document.addEventListener("siteReady", () => {
    if (!document.querySelector(".contact-hero")) return;
    
    console.log("Contact Page: Initializing Animations...");
    initContactAnimations();
    initBookingAnimations();


});

function initContactAnimations() {
    const tl = gsap.timeline();

    // 1. Reveal Text & Image on the left
    tl.fromTo(".contact-visual-side .contact-reveal", 
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1.2,
            ease: "power4.out"
        }
    )
    // 2. Reveal the Form Card on the right
    .fromTo(".contact-form-card", 
        { x: 50, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
    // 3. Stagger reveal form elements inside
    .from(".contact-form > *", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6
    }, "-=0.4");
}

function initBookingAnimations() {
    const tl = gsap.timeline();

    // 1. Reveal Header items
    tl.fromTo(".booking-reveal", {
        y: 40,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out"
    })
    
    // 2. Cinematic Shutter Reveal for the Calendly Card
    .to(".calendly-glass-frame", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "expo.out"
    }, "-=0.8");

    /*
    // 3. 3D PERSPECTIVE INTERACTION
    const frame = document.querySelector(".calendly-glass-frame");
    const wrapper = document.querySelector(".calendly-card-wrapper");

    wrapper.addEventListener("mousemove", (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(frame, {
            rotationY: x * 8, // Very subtle tilt
            rotationX: -y * 8,
            transformPerspective: 1500,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    wrapper.addEventListener("mouseleave", () => {
        gsap.to(frame, {
            rotationY: 0,
            rotationX: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)"
        });
    });  */
}