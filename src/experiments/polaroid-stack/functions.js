const polaroids = document.querySelectorAll('.polaroid');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio === 1) {
      entry.target.classList.remove('polaroid--undeveloped');
      entry.target.classList.add('polaroid--is-developing');
    }
  });
}, {
  threshold: 1
});

polaroids.forEach(polaroid => {
  observer.observe(polaroid);
});
