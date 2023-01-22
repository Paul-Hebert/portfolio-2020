export function clearCanvas(canvasEl, ctx, { fill = "#000", opacity = 1 }) {
  ctx.globalAlpha = opacity;

  ctx.rect(0, 0, canvasEl.width, canvasEl.height);
  ctx.fillStyle = fill;
  ctx.fill();

  ctx.globalAlpha = 1;
}
