// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
  // Create a simple animation
  // gsap.from(".box", {
  //   scrollTrigger: {
  //     trigger: ".box", // Element that triggers the animation
  //     start: "top 80%", // Trigger point (top of the box, 80% of the viewport)
  //     end: "bottom 20%", // End point of the trigger (bottom of the box, 20% of the viewport)
  //     scrub: true, // Smooth scroll animation
  //     markers: true, // Debug markers (remove in production)
  //   },
  //   x: -200, // Move the element 200px to the left
  //   rotation: 360, // Rotate the element
  //   duration: 2, // Duration of the animation
  // });

  function lenis() {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2, // Scrolling duration (in seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      smoothWheel: true, // Smooth scrolling for the mouse wheel
      smoothTouch: true, // Smooth scrolling for touch devices
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
  lenis();

  function sliders() {
    $("#banner-slider").owlCarousel({
      autoplay: false,
      autoplaySpeed: 2000,
      autoplayTimeout: 2000,
      smartSpeed: 2000,
      items: 1,
      stagePadding: 0,
      center: true,
      nav: false,
      margin: 10,
      dots: true,
      loop: true,

      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
  }
  sliders();

  const processItems = gsap.utils.toArray(".process-items");

  // Select the first item
  const firstItem = processItems[0];

  // Animate the first item immediately on page load
  // gsap.to(firstItem,
  //   {
  //     opacity: 1,
  //     background: "green",
  //     scale: 0.7,
  //     transformOrigin: "center center",
  //   }
  // );

  processItems.forEach((item, index) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 20%", // Adjust this to match both sides
        // endTrigger: ".container",
        end: "bottom top",
        pin: true,
        pinSpacing: false,   // Removes the pin space
        scrub: true,
        markers: true,       // Enable markers to debug if necessary
      },
    });
  
    // Animate the current item
    tl.to(item, {
      opacity: 0,
      scale: 0,
      duration: 1,
      ease: "power1.out",
      background: "rgba(0, 0, 0, 0)"
      // transform: "rotateY(90deg)",
    });
  });
  

  ScrollTrigger.create({
    trigger: ".process-section",
    start: "10% 0%",
    endTrigger: ".container2",
    end: "top bottom",
    pin: ".pin-box2",
    // pinSpacing: false,
    markers: true,
  });
});
