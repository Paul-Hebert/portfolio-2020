import { createVectors } from "./utils/create-vectors.js";
import { updatePoints } from "./utils/update-points.js";
import { random } from "./utils/random.js";
import { Point } from "./utils/Point.js";
import { initCanvas } from "./utils/init-canvas.js";
import { clearCanvas } from "./utils/clear-canvas.js";
import { drawCircle } from "./utils/draw-circle.js";

const wrapperEl = document.querySelector(".flow-field--ebb-and-flow");
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

initCanvas(canvasEl, wrapperEl, draw);

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
      const point = new Point({
        radius: 0.25,
        x: x + random(-3, 3),
        y: y + random(-3, 3),
      });

      point.h = baseHue + random(-60, 60);
      point.s = random(10, 30, true);
      point.l = random(10, 90, true);

      point.fill = `hsl(
        ${point.h},
        ${point.s}%,
        ${point.l}%
      )`;

      points.push(point);
    }
  }

  points.forEach((point) => {
    const length = random(100, 500, true);
    for (let i = 0; i <= length; i++) {
      point.h += 0.5;
      point.s += 0.1;

      if (i < length / 2) {
        point.radius += 0.01;
      } else {
        point.radius -= 0.01;
      }

      point.fill = `hsl(
        ${point.h},
        ${point.s}%,
        ${point.l}%
      )`;

      point = updatePoints([point], vectors, {
        distance: 40,
        speed: 0.001,
      })[0];
      drawCircle(ctx, wrapperEl, point);
    }
  });
}
