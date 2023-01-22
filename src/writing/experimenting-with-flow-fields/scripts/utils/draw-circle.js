const dpr = window.devicePixelRatio;

const canvasTargetWidth = 200;
const canvasAspectRatio = 2;

export function drawCircle(
  ctx,
  wrapperEl,
  { x, y, radius = 5, fill = "#00f" }
) {
  const canvasPos = relativeCanvasPosition(wrapperEl, { x, y });
  ctx.beginPath();
  ctx.arc(
    canvasPos.x,
    canvasPos.y,
    relativeSize(wrapperEl, radius),
    0,
    2 * Math.PI,
    false
  );
  ctx.fillStyle = fill;
  ctx.fill();
}

function relativeCanvasPosition(wrapperEl, { x, y }) {
  const ratio = wrapperEl.clientWidth / canvasTargetWidth;

  return {
    x: x * ratio * dpr,
    y: y * ratio * dpr,
  };
}

function relativeSize(wrapperEl, size) {
  const ratio = wrapperEl.clientWidth / canvasTargetWidth;
  return ratio * size * dpr;
}
