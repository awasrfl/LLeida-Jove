document.addEventListener('DOMContentLoaded', function(){

  if (window.gsap && window.ScrollTrigger) {
    try { gsap.registerPlugin(ScrollTrigger); }
    catch(e){ console.warn('gsap.registerPlugin error', e); }
  } 
  

  // Hero intro (suau) -- no depèn de ScrollTrigger
  if (document.querySelector('.hero-title')) {
    gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1, ease: "power2.out" });
  }

  //Mou la imatge de fons 80px cap avall.
  if (document.querySelector('.hero-bg-img') && window.ScrollTrigger) {
    gsap.to(".hero-bg-img", {
      y: 80,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 0.6
      }
    });
  }

  // Fade-up per seccions amb ScrollTrigger (amb guard i excloent .hero-section)
  if (window.ScrollTrigger) {
    gsap.utils.toArray("section").forEach((sec) => {
      if (sec.classList.contains('hero-section')) return; 
      gsap.from(sec, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 85%",   // Quan la part superior de la secció entra a un 85\% de la finestra de visualització, l'animació es dispara. Si l'usuari puja i la secció torna a sortir de l'àrea visible, l'animació es desfà.
          toggleActions: "play reverse play reverse"
        }
      });
    });
  }

  // Utilitza els valors calculats per rotar la targeta en 3D i augmentar-ne lleugerament la mida, simulant un efecte d'immersió que millora l'experiència d'usuari.
  const cards = gsap.utils.toArray('.event-card .card');
  if (cards.length === 0) {
    console.info('No s\'han trobat cards per aplicar 3D tilt (.event-card .card).');
  }
  cards.forEach(card => {
    if (card.dataset.tiltInit) return;
    card.dataset.tiltInit = '1';
    card.style.transformStyle = 'preserve-3d';
    card.style.willChange = 'transform, box-shadow';
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(card, { rotationY: dx * 8, rotationX: -dy * 8, scale: 1.03, boxShadow: "0 18px 45px rgba(0,0,0,0.18)", duration: 0.25, ease: "power1.out" });
    };
    const reset = () => gsap.to(card, { rotationY: 0, rotationX: 0, scale: 1, boxShadow: "0 6px 16px rgba(0,0,0,0.08)", duration: 0.5, ease: "power2.out" });
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
    card.addEventListener('touchstart', () => gsap.to(card, { scale: 1.02, boxShadow: "0 14px 40px rgba(0,0,0,0.14)", duration: 0.2 }));
    card.addEventListener('touchend', reset);
  });

 
  if (window.ScrollTrigger) {
    let resizeTO;
    window.addEventListener("resize", ()=> {
        clearTimeout(resizeTO);
        resizeTO = setTimeout(()=> ScrollTrigger.refresh(), 200);
    });
  }

}); 

