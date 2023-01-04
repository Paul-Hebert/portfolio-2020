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

initCanvas(canvasEl);

let interval = null;

draw();

refreshButton.addEventListener("click", draw);

function draw() {
  let points = [];
  const vectors = createVectors({
    angleRange: { min: -50, max: 230 },
    number: 150,
  });

  clearCanvas(canvasEl, ctx, {});
  clearInterval(interval);

  // TODO: rAF
  interval = setInterval(() => {
    points.push(new Point({ x: random(0, 200), y: -10 }));
    points = updatePoints(points, vectors, {});
    points = points.filter((p) => p.y < 110);

    clearCanvas(canvasEl, ctx, { opacity: 0.03 });
    points.forEach((point) => drawCircle(ctx, wrapperEl, point));
  }, 1000 / 60);
}

// canvasEl.addEventListener("click", ({ offsetX, offsetY }) => {
//   points.push(new Point(relativeClickPosition({ x: offsetX, y: offsetY })));
// });

// function relativeClickPosition({ x, y }) {
//   return {
//     x: (x / wrapperEl.clientWidth) * 200,
//     y: (y / wrapperEl.clientHeight) * 100,
//   };
// }
