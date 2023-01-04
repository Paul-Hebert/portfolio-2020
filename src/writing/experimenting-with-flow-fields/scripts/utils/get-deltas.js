import { degreesToRadians } from "./degrees-to-radians.js";

export function getDeltas({ distance, rotation }) {
  const rotationInRadians = degreesToRadians(rotation);

  return {
    xDelta: Math.cos(rotationInRadians) * distance,
    yDelta: Math.sin(rotationInRadians) * distance,
  };
}
