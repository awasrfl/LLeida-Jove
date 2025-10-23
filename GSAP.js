// Animacions GSAP: Hero Section
gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1, ease: "power2.out" });
gsap.from(".event-highlight", { opacity: 0, scale: 0.8, duration: 1, delay: 0.5, ease: "elastic.out(1, 0.3)" });

// Animació GSAP: Cercles decoratius
gsap.to("#circle1", { x: 50, y: -50, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to("#circle2", { x: -30, y: 30, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to("#circle3", { x: 20, y: -20, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });

gsap.from(".event-card", {
    opacity: 0,
    y: 50,
    duration: 0.6,
    stagger: 0.2, 
   
});

window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
        // Fons negre sòlid al fer scroll
        gsap.to("#mainNavbar", { backgroundColor: "rgba(0, 0, 0, 1)", duration: 0.3 }); 
    } else {
        // Fons lleugerament transparent a dalt de tot
        gsap.to("#mainNavbar", { backgroundColor: "rgba(0, 0, 0, 0.9)", duration: 0.3 }); 
    }
});

