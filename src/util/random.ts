export function chooseRandom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}
