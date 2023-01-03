import { random } from "./random.js";

export class Point {
  constructor({ x = 0, y = 0 }) {
    this.fill = `hsl(${random(0, 360, true)}, 60%, 70%)`;
    this.radius = random(2, 20, true);

    this.x = x;
    this.y = y;
  }
}
