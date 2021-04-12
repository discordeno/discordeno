export async function delayUntil(
  maxMs: number,
  isReady: () => boolean,
  timeoutTime = 100,
): Promise<void> {
  const maxTime = Date.now() + maxMs;

  function hackyFix(resolve: () => void) {
    if (isReady() || Date.now() >= maxTime) {
      resolve();
    } else {
      setTimeout(async () => {
        await hackyFix(resolve);
        resolve();
      }, timeoutTime);
    }
  }

  return new Promise((resolve) => hackyFix(resolve));
}
