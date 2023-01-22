import { getDeltas } from "./get-deltas.js";

export function updatePoints(
  points,
  vectors,
  { distance = 30, speed = 0.0025 }
) {
  return points.map((point) => {
    vectors
      .filter((vector) => distanceBetweenPoints(point, vector) < distance)
      .forEach((vector) => {
        const { xDelta, yDelta } = getDeltas(vector);

        point.x += xDelta * speed;
        point.y += yDelta * speed;
      });

    return point;
  });
}

export function distanceBetweenPoints(point1, point2) {
  return fastHypotenuse(point1.x - point2.x, point1.y - point2.y);
}

function fastHypotenuse(x, y) {
  return Math.sqrt(x * x + y * y);
}
