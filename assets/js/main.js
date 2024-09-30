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
  // lenis();

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
      margin: 0,
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
          nav: true,
        },
        1000: {
          items: 1,
        },
      },
    });

    const vhMargin = window.innerHeight * 0.02; // Calculate margin based on viewport height
    // recipe slider
    function initializeCarousel() {
      $(".recipe-slider").owlCarousel({
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 1000,
        smartSpeed: 1000,
        items: 1,
        stagePadding: 0,
        center: false,
        nav: true,
        margin: vhMargin, // Set margin dynamically
        dots: true,
        loop: true, // Disable touch dragging
        mouseDrag: false,

        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 3,
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

    initializeCarousel();
    window.addEventListener("resize", () => {
      $(".recipe-slider").trigger("destroy.owl.carousel"); // Destroy the existing carousel
      initializeCarousel(); // Re-initialize with the new margin
    });

    // recipe small slider
    $(".sm-recipe-slider").owlCarousel({
      autoplay: false,
      autoplaySpeed: 1000,
      autoplayTimeout: 1000,
      smartSpeed: 1000,
      items: 1,
      stagePadding: 0,
      center: false,
      nav: true,
      margin: vhMargin, // Set margin dynamically
      dots: false,
      loop: true, // Disable touch dragging
      mouseDrag: false,
    });

    $(".testimonial-slider").owlCarousel({
      autoplay: false,
      autoplaySpeed: 1000,
      autoplayTimeout: 1000,
      smartSpeed: 1000,
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
      // markers: true,
      end: `+=${totalHeight}`, // Pin until the total height of all process items
      scrub: true,
    });
  }

  // Initial call to process
  process();

  function recipeTabs(containerSelector) {
    // Target only the specific container (like for desktop or mobile)
    var $container = $(containerSelector);


    
    // Show corresponding content when clicking carousel item
    if ($container.attr('id') == 'desktop-section') {
      $container.find(".item").on("click", function () {
        var itemId = $(this).data("item");
        
        // Deactivate all items in this container and activate the clicked item
        $container.find(".content-item").removeClass("active-item");
        $container.find("#content-" + itemId).addClass("active-item");
        
        // Hide all button contents in this container and reset active states
        $container.find(".content-item .btn-content").removeClass("active"); // Reset all button states
        $container.find(".content-item [id^='btn-content']").hide(); // Hide all contents
    
        // Show the first button's content by default for the activated item
        $container.find("#btn-content-" + itemId + "-1").show(); // Show the first button content for the active item
        $container.find(".active-item .btn-content").first().addClass("active"); // Make the first button active
      });
    }
 
    
  
  
    // Show content based on button click within the selected item
    $container.on("click", ".active-item .btn-content", function () {
      var btnId = $(this).data("btn");
  
      // Remove active class from buttons within the active content item
      $(this).closest('.content-item').find(".btn-content").removeClass("active");
      $(this).addClass("active");
  
      // Hide all content in the active item and show the corresponding content
      $(this).closest('.content-item').find('[id^="btn-content"]').hide();
      $(this).closest('.content-item').find("#btn-content-" + btnId).show();
    });
  
    // Ensure the first button's content is shown by default on page load
    $container.find(".content-item").first().addClass("active-item"); // Ensure first item is active on load
    $container.find(".content-item").first().find(".btn-content").first().addClass("active"); // Ensure first button is active
    $container.find("#btn-content-1-1").show(); // Show the first button content by default
  }
  
  // Initialize the tabs for both desktop and mobile sections
  recipeTabs("#desktop-section"); // For desktop
  recipeTabs("#mobile-section"); // For small screens (or mobile)
  
  
  
  


  function mobileMenu() {
    const menu = document.getElementById("mobile-menu");
    const menuToggle = document.getElementById("menuToggle");
    let menuOpen = false;

    menuToggle.addEventListener("click", () => {
      if (!menuOpen) {
        gsap.to(menu, { x: "0%", duration: 0.7 });
        // gsap.to("body", { overflowY: 'hidden', duration: 0.7 },);
      } else {
        gsap.to(menu, { x: "-100%", duration: 0.5 });
        // gsap.to("body", { overflowY: 'scroll', duration: 0.7 },);
      }
      menuOpen = !menuOpen;
    });
  }
  mobileMenu();

  function accordian($parentClass) {
    // Show the first content by default
    $(`${$parentClass} .accordion-content`).first().slideDown();
    $(`${$parentClass} .accordion-header i`).first().addClass("rotate"); // Rotate the first icon by default

    $(`${$parentClass} .accordion-header`).click(function () {
      // Slide up all content and remove rotation from all icons
      $(`${$parentClass} .accordion-content`).slideUp();
      $(`${$parentClass} .accordion-header i`).removeClass("rotate");

      // If the clicked header's content is not visible, show it
      if (!$(this).next(`${$parentClass} .accordion-content`).is(":visible")) {
        $(this).next(`${$parentClass} .accordion-content`).slideDown();
        $(this).find("i").addClass("rotate"); // Rotate the icon of the clicked header
      }
    });
  }

  // Apply the accordion to a specific section
  accordian(".process-section");
});
