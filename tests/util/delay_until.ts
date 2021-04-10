export function delayUntil(maxMs: number, isReady: () => boolean) {
  const maxed = Date.now() + maxMs;

  while (Date.now() < maxed) {
    if (isReady()) return;
  }
}
