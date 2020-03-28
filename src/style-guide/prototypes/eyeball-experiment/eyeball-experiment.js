let creatures;
let page;

window.addEventListener("load", () => {
  creatures = fetchCreatures();
  page = fetchPage();

  addClickBlinking();
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
  document.addEventListener("mousemove", e => {
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

      const irisX = mouseDistanceFromEyeballCenter.x * relativeIrisSizes.x;
      const irisY = mouseDistanceFromEyeballCenter.y * relativeIrisSizes.y;

      creature.iris.element.style.transform = `translate(${irisX}px, ${irisY}px)`;

      const eyeX = mouseDistanceFromEyeballCenter.x * relativeEyeSizes.x;
      const eyeY = mouseDistanceFromEyeballCenter.y * relativeEyeSizes.y;

      creature.eye.element.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
    });
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

function addClickBlinking() {
  let creature = document.querySelector(".js-creature");

  creature.addEventListener("click", () => {
    creature.classList.toggle("is-blinking");
  });
}
