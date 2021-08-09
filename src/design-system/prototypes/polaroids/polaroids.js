initWindowStack();

function initWindowStack() {
  const stack = document.querySelector('.window-stack');
  const windows = stack.querySelectorAll('.window');

  let zIndex = 1;

  windows.forEach(windowEl => {
    windowEl.addEventListener('mousedown', () => activateWindow(windowEl));
    windowEl.addEventListener('focusin', () => activateWindow(windowEl));

    let lastX = 0;
    let lastY = 0;
    let animationFrame;

    const dragWindow = (e) => {
      e.preventDefault();

      if (animationFrame) cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const xDiff = e.clientX - lastX;
        const yDiff = e.clientY - lastY;

        lastX = e.clientX;
        lastY = e.clientY;

        // TODO: Request animation frame stuff
        const oldX = Number(windowEl.style.getPropertyValue('--window-left').replace('px', ''));
        const oldY = Number(windowEl.style.getPropertyValue('--window-top').replace('px', ''));

        windowEl.style.setProperty('--window-left', `${oldX + xDiff}px`);
        windowEl.style.setProperty('--window-top', `${oldY + yDiff}px`);
      });
    }

    function beginWindowDrag(e) {
      document.addEventListener('mousemove', dragWindow);
      lastX = e.clientX;
      lastY = e.clientY;
      windowEl.classList.add('is-dragging');
    }

    function endWindowDrag() {
      document.removeEventListener('mousemove', dragWindow);
      windowEl.classList.remove('is-dragging');
    }

    const header = windowEl.querySelector('.window__header');
    const closeButton = windowEl.querySelector('.window__close-button');

    // TODO: Touch Events
    // TODO: Handle mouse leaving screen
    closeButton.addEventListener('click', (e) => closeWindow(e, windowEl));
    header.addEventListener('mousedown', beginWindowDrag);
    document.addEventListener('mouseup', endWindowDrag);
  });

  function activateWindow(windowEl) {
    // TODO: use custom prop?
    windowEl.style.zIndex = zIndex;
    zIndex++;
  }

  function closeWindow(e, windowEl) {
    e.preventDefault();
    e.stopPropagation();

    windowEl.classList.add('is-closing');
  }
}
