export function random(min, max, rounded = false) {
  const diff = max - min;
  const number = Math.random() * diff + min;

  if (rounded) return Math.round(number);

  return number;
}
