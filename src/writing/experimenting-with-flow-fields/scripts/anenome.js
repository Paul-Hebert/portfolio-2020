import { createVectors } from "./utils/create-vectors.js";
import { updatePoints } from "./utils/update-points.js";
import { random } from "./utils/random.js";
import { Point } from "./utils/Point.js";
import { initCanvas } from "./utils/init-canvas.js";
import { clearCanvas } from "./utils/clear-canvas.js";
import { drawCircle } from "./utils/draw-circle.js";

const wrapperEl = document.querySelector(".flow-field--anenome");
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
    number: 300,
  });

  const baseHue = random(0, 360, true);
  const bg = `hsl(
    ${baseHue},
    70%,
    20%
  )`;

  clearCanvas(canvasEl, ctx, {
    fill: bg,
  });

  for (let x = 0; x < 200; x += 10) {
    for (let y = 0; y < 100; y += 10) {
      points.push(
        new Point({
          radius: random(8, 10),
          x: x + random(-3, 3),
          y: y + random(-3, 3),
          fill: `hsl(
            ${baseHue + random(-10, 10)},
            ${random(60, 90, true)}%,
            ${random(70, 80, true)}%
          )`,
        })
      );
    }
  }

  for (let i = 0; i <= 100; i++) {
    points = updatePoints(points, vectors, { distance: 40, speed: 0.001 });

    clearCanvas(canvasEl, ctx, { opacity: 0.05, fill: bg });

    points.forEach((point) => {
      point.radius *= 0.988;
      drawCircle(ctx, wrapperEl, point);
    });
  }
}
