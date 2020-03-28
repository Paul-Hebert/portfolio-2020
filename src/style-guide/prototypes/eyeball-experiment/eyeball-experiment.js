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
        eyeball: new ElementWithDimensions(
          creature.querySelector(".js-eyeball")
        ),
        iris: new ElementWithDimensions(
          creature.querySelector(".js-eyeball-center")
        )
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

      const relativeSizes = {
        x: irisMovementRange.x / (page.width * 2),
        y: irisMovementRange.y / (page.height * 2)
      };

      const x = mouseDistanceFromEyeballCenter.x * relativeSizes.x;
      const y = mouseDistanceFromEyeballCenter.y * relativeSizes.y;

      creature.iris.element.style.transform = `translate(${x}px, ${y}px)`;
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
