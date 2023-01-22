export function initCanvas(canvasEl, wrapperEl, drawFunc) {
  resizeCanvas(canvasEl, wrapperEl, drawFunc);

  const resizeObserver = new ResizeObserver(() =>
    resizeCanvas(canvasEl, wrapperEl, drawFunc)
  );

  resizeObserver.observe(wrapperEl);
}

function resizeCanvas(canvasEl, wrapperEl, drawFunc) {
  const width = wrapperEl.clientWidth * window.devicePixelRatio;
  canvasEl.width = width;
  canvasEl.height = width / 2;

  drawFunc();
}
