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
    $(".product-slider").owlCarousel({
      autoplay: false,
      // autoplaySpeed: 2000,
      // autoplayTimeout: 2000,
      smartSpeed: 5000,
      items: 1,
      stagePadding: 0,
      center: true,
      nav: false,
      margin: 10,
      dots: true,
      loop: true,
      touchDrag: false,
      pullDrag: false,
      mouseDrag: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      dotsContainer: ".custom-dots",

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

    // recipe slider
    function initializeCarousel() {
      const vhMargin = window.innerHeight * 0.02; // Calculate margin based on viewport height
      $(".recipe-slider").owlCarousel({
        autoplay: false,
        autoplaySpeed: 2000,
        autoplayTimeout: 2000,
        smartSpeed: 2000,
        items: 1,
        stagePadding: 0,
        center: false,
        nav: false,
        margin: vhMargin, // Set margin dynamically
        dots: false,
        loop: false, // Disable touch dragging
        mouseDrag: false,

        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 1,
          },
          1000: {
            items: 3,
          },
          1366: {
            items: 3,
          },
        },
      });
    }

    // Initial call to set up the carousel
    initializeCarousel();

    // Reinitialize on window resize
    window.addEventListener("resize", () => {
      $(".recipe-slider").trigger("destroy.owl.carousel"); // Destroy the existing carousel
      initializeCarousel(); // Re-initialize with the new margin
    });

    $(".testimonial-slider").owlCarousel({
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

    // Custom text for each dot
    var customTexts = ["Product_1", "Product_2", "Product_3"];

    // Add custom text to each dot after Owl Carousel initializes
    $(".custom-dots .owl-dot").each(function (index) {
      $(this).text(customTexts[index]);
    });
  }
  sliders();

  function process() {
    // Get all the process items
    const processItems = gsap.utils.toArray(".process-items");

    processItems.forEach((section, i) => {
      // Animate each section
      gsap.from(section, {
        y: 100,
        // opacity: 0,
        // duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
          onEnter: () => {
            // When the current section enters, fade it in
            gsap.to(section, { opacity: 1, duration: 1 });

            // If there is a previous section, fade it out
            if (i > 0) {
              gsap.to(processItems[i - 1], { opacity: 0, duration: 0.5 });
            }
          },
          onLeave: () => {
            // When the section leaves (scrolls past), fade it out
            gsap.to(section, { opacity: 0, duration: 0.5 });
          },
          onEnterBack: () => {
            // When scrolling back, fade the section in
            gsap.to(section, { opacity: 1, duration: 1 });

            // If there is a next section, fade it out
            if (i < processItems.length - 1) {
              gsap.to(processItems[i + 1], { opacity: 0, duration: 0.5 });
            }
          },
          onLeaveBack: () => {
            // When scrolling back past the section, fade it out
            gsap.to(section, { opacity: 0, duration: 1 });
          },
        },
      });
    });

    // Pin the middle column
    const processWrapper = document.querySelector(".process-left-wrapper");

    // Calculate total height, adjusting based on viewport height
    const totalHeight = processWrapper.scrollHeight - window.innerHeight * 0.86;

    ScrollTrigger.create({
      trigger: ".pin-box2",
      pin: true,
      start: "center center",
      markers: true,
      end: `+=${totalHeight}`, // Pin until the total height of all process items
      scrub: true,
    });
  }

  // Initial call to process
  process();

  function tabs() {
    let isAnimating = false; // Animation lock

    $(".recipe-section .tab-link").on("click", function () {
      if (isAnimating) return; // Prevent click if animation is running

      var tabId = $(this).data("tab");

      // Remove active class from all buttons
      $(".recipe-section .tab-link").removeClass("active");

      // Fade out the current active tab content
      isAnimating = true; // Lock animations
      $(".recipe-section .tab-content.active")
        .css("opacity", 1)
        .animate({ opacity: 0 }, 100, function () {
          $(this).removeClass("active").css("visibility", "hidden");

          // Fade in the new tab content
          $("#" + tabId)
            .css("visibility", "visible")
            .css("opacity", 0)
            .animate({ opacity: 1 }, 100, function () {
              isAnimating = false; // Unlock animations
            })
            .addClass("active");
        });

      // Add active class to the clicked button
      $(this).addClass("active");
    });
  }

  // Initialize the tabs function
  tabs();
});
