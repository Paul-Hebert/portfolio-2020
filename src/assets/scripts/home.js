import "squiggles-and-dots/src/hidden/animated-snow-flakes/animated-snow-flakes.js";
import "squiggles-and-dots/src/art/forests/forests.js";

setInterval(() => {
  document.querySelector('sq-forests').draw();
}, 1500)
