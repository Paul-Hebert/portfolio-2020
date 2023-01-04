const dpr = window.devicePixelRatio;

export function drawCircle(
  ctx,
  wrapperEl,
  { x, y, radius = 5, fill = "#00f" }
) {
  const canvasPos = relativeCanvasPosition(wrapperEl, { x, y });
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

function relativeCanvasPosition(wrapperEl, { x, y }) {
  return {
    x: (x * wrapperEl.clientWidth) / 200,
    y: (y * wrapperEl.clientHeight) / 100,
  };
}
