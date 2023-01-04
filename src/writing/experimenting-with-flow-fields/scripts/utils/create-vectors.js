import { random } from "./random.js";

export function createVectors({
  width = 200,
  height = 100,
  number = 50,
  distanceRange = {
    min: 5,
    max: 50,
  },
  angleRange = {
    min: 0,
    max: 360,
  },
} = {}) {
  const vectors = [];
  for (let i = 0; i < number; i++) {
    vectors.push({
      // TODO: Pad edges?
      x: random(0, width, true),
      y: random(0, height, true),
      distance: random(distanceRange.min, distanceRange.max, true),
      rotation: random(angleRange.min, angleRange.max, true),
    });
  }
  return vectors;
}
