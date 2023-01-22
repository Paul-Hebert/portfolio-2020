import { createVectors } from "./utils/create-vectors.js";
import { updatePoints } from "./utils/update-points.js";
import { random } from "./utils/random.js";
import { Point } from "./utils/Point.js";
import { initCanvas } from "./utils/init-canvas.js";
import { clearCanvas } from "./utils/clear-canvas.js";
import { drawCircle } from "./utils/draw-circle.js";

const wrapperEl = document.querySelector(".flow-field--animated");
const canvasEl = wrapperEl.querySelector(".flow-field__canvas");
const refreshButton = wrapperEl.querySelector(".flow-field__refresh");
const ctx = canvasEl.getContext("2d");

let animationFrameId = null;
let points = [];
let vectors = [];

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
  points = [];
  vectors = createVectors({
    angleRange: { min: -50, max: 230 },
    number: 150,
  });
  clearCanvas(canvasEl, ctx, {});
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  animationFrameId = requestAnimationFrame(animate);
}

function animate() {
  points.push(new Point({ x: random(0, 200), y: -10 }));
  points = updatePoints(points, vectors, {});
  points = points.filter((p) => p.y < 110);

  clearCanvas(canvasEl, ctx, { opacity: 0.03 });
  points.forEach((point) => drawCircle(ctx, wrapperEl, point));

  animationFrameId = requestAnimationFrame(animate);
}
