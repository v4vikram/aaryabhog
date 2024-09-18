  // Register the ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
// Create a simple animation
  gsap.from(".box", {
    scrollTrigger: {
      trigger: ".box", // Element that triggers the animation
      start: "top 80%", // Trigger point (top of the box, 80% of the viewport)
      end: "bottom 20%", // End point of the trigger (bottom of the box, 20% of the viewport)
      scrub: true, // Smooth scroll animation
      markers: true, // Debug markers (remove in production)
    },
    x: -200, // Move the element 200px to the left
    rotation: 360, // Rotate the element
    duration: 2, // Duration of the animation
  });
});
