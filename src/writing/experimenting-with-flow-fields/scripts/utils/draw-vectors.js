import { getDeltas } from "./get-deltas.js";

export function drawVectors(svgEl, vectors) {
  console.log(vectors);
  svgEl.innerHTML = vectors
    .map(({ x, y, distance, rotation }, i) => {
      const { xDelta, yDelta } = getDeltas({ distance, rotation });
      return /* svg */ `
        <g id="v-${i}">
          <circle cx="${x}" cy="${y}" r="1"></circle>
          <line
            x1="${x}"
            y1="${y}"
            x2="${x + xDelta}"
            y2="${y + yDelta}"
            stroke-width="0.5"
            stroke="#000"
          />
        </g>
      `;
    })
    .join("");
}
