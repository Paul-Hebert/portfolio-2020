import { random } from "./random.js";

export class Point {
  constructor({ x = 0, y = 0, fill, radius }) {
    this.fill =
      fill ||
      `hsl(
        ${random(0, 360, true)},
        ${random(50, 80, true)}%,
        ${random(50, 80, true)}%
      )`;
    this.radius = radius || random(0.2, 5, true);

    this.x = x;
    this.y = y;
  }
}
