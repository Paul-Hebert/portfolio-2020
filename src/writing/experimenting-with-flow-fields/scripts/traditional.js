import { createVectors } from "./utils/create-vectors.js";
import { updatePoints } from "./utils/update-points.js";
import { random } from "./utils/random.js";
import { Point } from "./utils/Point.js";
import { initCanvas } from "./utils/init-canvas.js";
import { clearCanvas } from "./utils/clear-canvas.js";
import { drawCircle } from "./utils/draw-circle.js";

const wrapperEl = document.querySelector(".flow-field--traditional");
const canvasEl = wrapperEl.querySelector(".flow-field__canvas");
const refreshButton = wrapperEl.querySelector(".flow-field__refresh");
const ctx = canvasEl.getContext("2d");

let isPlayed = false;
let observer = new IntersectionObserver((entries) => {
  if (!isPlayed && entries[0].isIntersecting) {
    isPlayed = true;
    initCanvas(canvasEl, wrapperEl, draw);
  }
});
observer.observe(wrapperEl);

refreshButton.addEventListener("click", draw);

function draw() {
  let points = [];

  const vectors = createVectors({
    number: 200,
  });

  const baseHue = random(0, 360, true);

  clearCanvas(canvasEl, ctx, {
    fill: `hsl(
      ${baseHue},
      ${random(10, 30, true)}%,
      ${random(5, 8, true)}%
    )`,
  });

  for (let x = 0; x <= 200; x += 5) {
    for (let y = 0; y <= 100; y += 5) {
      points.push(
        new Point({
          radius: 0.25,
          x: x + random(-3, 3),
          y: y + random(-3, 3),
          fill: `hsl(
            ${baseHue + random(-60, 60)},
            ${random(10, 30, true)}%,
            ${random(10, 90, true)}%
          )`,
        })
      );
    }
  }

  points.forEach((point) => {
    for (let i = 0; i <= 350; i++) {
      point = updatePoints([point], vectors, {
        distance: 40,
        speed: 0.001,
      })[0];
      drawCircle(ctx, wrapperEl, point);
    }
  });
}
