import { createVectors } from "./create-vectors.js";
import { drawVectors } from "./draw-vectors.js";
import { updatePoints } from "./update-points.js";
import { random } from "./random.js";
import { Point } from "./Point.js";

const wrapperEl = document.querySelector(".flow-field");
const vectorEl = document.querySelector(".flow-field__vectors");
const canvasEl = document.querySelector(".flow-field__canvas");
const ctx = canvasEl.getContext("2d");

const dpr = window.devicePixelRatio;

let points = [];
const vectors = createVectors({
  angleRange: { min: -50, max: 230 },
  number: 150,
});

// drawVectors(vectorEl, vectors);

canvasEl.addEventListener("click", ({ offsetX, offsetY }) => {
  points.push(new Point(relativeClickPosition({ x: offsetX, y: offsetY })));
});

setInterval(() => {
  points.push(new Point({ x: random(0, 360), y: -10 }));
  points = updatePoints(points, vectors);
  points = points.filter((p) => p.y < 110);

  fadeOldPoints();
  points.forEach(drawCircle);
}, 1000 / 60);

function drawCircle({ x, y, radius = 5, fill = "#00f" }) {
  const canvasPos = relativeCanvasPosition({ x, y });
  ctx.beginPath();
  ctx.arc(
    canvasPos.x * dpr,
    canvasPos.y * dpr,
    radius * dpr,
    0,
    2 * Math.PI,
    false
  );
  ctx.fillStyle = fill;
  ctx.fill();
}

function fadeOldPoints() {
  ctx.globalAlpha = 0.03;

  ctx.rect(0, 0, canvasEl.width, canvasEl.height);
  ctx.fillStyle = "#000";
  ctx.fill();

  ctx.globalAlpha = 1;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// https://stackoverflow.com/a/58345223/7816145
function resizeCanvas() {
  canvasEl.width = wrapperEl.clientWidth * dpr;
  canvasEl.height = wrapperEl.clientHeight * dpr;

  canvasEl.style.width = `${wrapperEl.clientWidth}px`;
  canvasEl.style.height = `${wrapperEl.clientHeight}px`;
}

function relativeClickPosition({ x, y }) {
  return {
    x: (x / wrapperEl.clientWidth) * 200,
    y: (y / wrapperEl.clientHeight) * 100,
  };
}

function relativeCanvasPosition({ x, y }) {
  return {
    x: (x * wrapperEl.clientWidth) / 200,
    y: (y * wrapperEl.clientHeight) / 100,
  };
}
