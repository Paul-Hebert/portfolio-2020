let creatures;
let page;
const wrapper = document.querySelector(".js-creature-container");

window.addEventListener("load", () => {
  generateCreatures({
    canvasHeight: 150,
    canvasWidth: 600
  });

  creatures = fetchCreatures();
  page = fetchPage();

  addEyeTracking();
});

window.addEventListener("resize", () => {
  creatures = fetchCreatures();
  page = fetchPage();
});

function fetchCreatures() {
  return (creatures = [...document.querySelectorAll(".js-creature")].map(
    creature => {
      return {
        eye: new ElementWithDimensions(creature.querySelector(".js-eye")),
        eyeball: new ElementWithDimensions(
          creature.querySelector(".js-eyeball")
        ),
        iris: new ElementWithDimensions(creature.querySelector(".js-iris")),
        body: new ElementWithDimensions(creature.querySelector(".js-body"))
      };
    }
  ));
}

function fetchPage() {
  return new ElementWithDimensions(document.body);
}

function addEyeTracking() {
  document.addEventListener("mousemove", debounce(moveEyes), 25);
}

function moveEyes(e) {
  const mousePosition = {
    x: e.clientX,
    y: e.clientY
  };

  creatures.forEach(creature => {
    const mouseDistanceFromEyeballCenter = {
      x: mousePosition.x - creature.eyeball.center.x,
      y: mousePosition.y - creature.eyeball.center.y
    };

    // The radius of the eyeball minus the radius of the iris
    const irisMovementRange = {
      x: (creature.eyeball.width - creature.iris.width) / 2,
      y: (creature.eyeball.height - creature.iris.height) / 2
    };

    // The radius of the body minus the radius of the eye
    const eyeMovementRange = {
      x: (creature.body.width - creature.eye.width) / 2,
      y: (creature.body.height - creature.eye.height) / 2
    };

    const relativeIrisSizes = {
      x: irisMovementRange.x / (page.width * 2),
      y: irisMovementRange.y / (page.height * 2)
    };

    const relativeEyeSizes = {
      x: eyeMovementRange.x / (page.width * 2),
      y: eyeMovementRange.y / (page.height * 2)
    };

    const irisX =
      (mouseDistanceFromEyeballCenter.x * relativeIrisSizes.x * 4) / 5;
    const irisY =
      (mouseDistanceFromEyeballCenter.y * relativeIrisSizes.y * 4) / 5;

    creature.iris.element.style.transform = `translate(${irisX}px, ${irisY}px)`;

    const eyeX = mouseDistanceFromEyeballCenter.x * relativeEyeSizes.x;
    const eyeY = mouseDistanceFromEyeballCenter.y * relativeEyeSizes.y;

    creature.eye.element.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
  });
}

const ElementWithDimensions = function(element) {
  const boundingClient = element.getBoundingClientRect();

  const width = boundingClient.width;
  const height = boundingClient.height;

  const x = boundingClient.x;
  const y = boundingClient.y;

  return {
    element,
    width,
    height,
    position: {
      x,
      y
    },
    center: {
      x: x + width / 2,
      y: y + height / 2
    }
  };
};

function generateCreatures({ canvasHeight, canvasWidth }) {
  const size = 42;

  let x = (size / 2) * -1;

  const columns = Math.round((canvasWidth + size) / size);
  const rows = Math.round((canvasHeight + size) / size);

  for (let c = 0; c < columns; c++) {
    let y = 0 + size * Math.random();

    for (let r = 0; r < rows; r++) {
      y += size;

      const speed = 100 + Math.random() * 200;
      createCreature({ x, y, speed });
    }

    x += size;
  }
}

function createCreature({ x, y, speed }) {
  wrapper.innerHTML += `
    <g class="creature js-creature" style="transform: translate(${x}px, ${y}px)">
      <g class="js-body">
        <circle cx="30" cy="30" r="29" class="body-main" />
        <path
          d="M13.8 54.1c2.8 1.9 5.1 3.6 13.4 2.9 14.3-1.1 24.6-9.6 27.4-24.1 1.7-8.8 2-16.9-3.6-22.9h-.1c6.3 6.6 9.4 16 7.5 25.7-3.1 15.7-18.3 26-34 22.9-3.9-.8-7.5-2.3-10.6-4.4"
          fill="#ba6060"
        />
        <path
          d="M46.1 6C43.3 4.1 41 2.4 32.7 3.1c-14.3 1.1-24.6 9.6-27.4 24C3.5 36 3.3 44 8.9 50H9C2.7 43.4-.4 34 1.5 24.3c3.1-15.7 18.3-26 34-22.9 3.9.8 7.5 2.3 10.6 4.4"
          fill="#f47676"
        />
      </g>

      <g class="eye js-eye">
        <g class="js-eyeball">
          <circle cx="30" cy="30" r="10.8" class="eye-white" />

          <g class="js-iris">
            <circle cx="30" cy="30" r="4.5" class="iris" />
            <circle cx="30" cy="30" r="3.2" fill="pupil" />
          </g>

          <path
            class="eye-skin"
            d="M30.5,12.5c-7.7,0-14,7.2-14,16s6.3,16,14,16s14-7.2,14-16S38.2,12.5,30.5,12.5z M30.6,39.8
                  c-6,0.2-11-4.5-11.2-10.4c-0.2-6,4.5-11,10.4-11.2c6-0.2,11,4.5,11.2,10.4C41.2,34.5,36.5,39.6,30.6,39.8z"
          />

          <path
            class="wrinkle"
            d="M41 28.6c.4 2.8-.5 5.9-2.4 8.2-1.9 2.3-4.9 3.7-8 3.8-1.5 0-3.1-.2-4.5-.8-1.4-.6-2.7-1.4-3.8-2.5-2.1-2.1-3.3-5.1-3-8 .4 2.8 1.8 5.4 3.9 7.1 2 1.7 4.7 2.7 7.3 2.6 2.6-.1 5.2-1.2 7.1-3.1 2-1.9 3.2-4.5 3.4-7.3z"
          />
          <path
            class="wrinkle"
            d="M19.3 29.3c-.4-2.8.5-5.9 2.4-8.2 1.9-2.3 4.9-3.7 8-3.8 1.5 0 3.1.2 4.5.8 1.4.6 2.7 1.4 3.8 2.5 2.1 2.1 3.3 5.1 3 8-.4-2.8-1.8-5.4-3.9-7.1-2-1.7-4.7-2.7-7.3-2.6-2.6.1-5.2 1.2-7.1 3.1-1.9 1.9-3.1 4.5-3.4 7.3z"
          />
          <path
            class="wrinkle"
            d="M19.2 25.2c-.1-1.3.2-2.6.8-3.7.6-1.2 1.5-2.1 2.5-3 2.1-1.6 4.7-2.4 7.2-2.5 2.6-.1 5.2.6 7.4 2 1.1.7 2 1.7 2.7 2.8.7 1.1 1 2.4 1.1 3.7-.2-2.6-1.9-4.8-4-6.1-2.1-1.3-4.7-1.9-7.2-1.9-2.5.1-5 .9-7 2.3-2 1.5-3.5 3.8-3.5 6.4z"
          />
          <path
            class="wrinkle"
            d="M19.8 20.9c.3-1 .8-2 1.4-2.8.7-.8 1.5-1.5 2.4-2 1.9-1.1 4-1.4 6.1-1.5 2.1 0 4.3.4 6.1 1.4 1.9 1 3.3 2.7 4.3 4.5-1.1-1.8-2.6-3.3-4.4-4.3-1.8-1-3.9-1.4-6-1.3-2.1.1-4.1.4-6 1.4-1.7 1-3.1 2.6-3.9 4.6z"
          />
          <path
            class="wrinkle"
            d="M21.6 17c1.2-1 2.3-2.1 3.8-2.7 1.5-.6 3.1-.7 4.6-.7 1.6 0 3.2.1 4.6.8 1.4.7 2.6 1.7 3.8 2.7-1.3-.9-2.5-1.8-3.9-2.5-1.4-.6-3-.8-4.5-.7-1.5 0-3.1.1-4.5.7-.7.3-1.4.7-2 1.1L21.6 17zM41.2 32.7c.1 1.3-.2 2.6-.8 3.7-.6 1.2-1.5 2.1-2.5 3-2.1 1.6-4.7 2.4-7.2 2.5-2.6.1-5.2-.6-7.4-2-1.1-.7-2-1.7-2.7-2.8-.7-1.1-1-2.4-1.1-3.7.2 2.6 1.9 4.8 4 6.1 2.1 1.3 4.7 1.9 7.2 1.9 2.5-.1 5-.9 7-2.3 1.9-1.5 3.5-3.8 3.5-6.4z"
          />
          <path
            class="wrinkle"
            d="M40.5 37c-.3 1-.8 2-1.4 2.8-.7.8-1.5 1.5-2.4 2-1.9 1.1-4 1.4-6.1 1.5-2.1 0-4.3-.4-6.1-1.4-1.9-1-3.3-2.7-4.3-4.5 1.1 1.8 2.6 3.3 4.4 4.3 1.8 1 3.9 1.4 6 1.3 2.1-.1 4.1-.4 6-1.4 1.7-1 3.2-2.6 3.9-4.6z"
          />
          <path
            class="wrinkle"
            d="M38.7 40.9c-1.2 1-2.3 2.1-3.8 2.7-1.5.6-3.1.7-4.6.7-1.6 0-3.2-.1-4.6-.8-1.4-.7-2.6-1.7-3.8-2.7 1.3.9 2.5 1.8 3.9 2.5 1.4.6 3 .8 4.5.7 1.5 0 3.1-.1 4.5-.7.7-.3 1.4-.7 2-1.1l1.9-1.3z"
          />
        </g>
      </g>
    </g>
  `;
}

// TODO: Use an npm import
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
