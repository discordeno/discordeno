// deno-lint-ignore require-await
export async function delayUntil(
  maxMs: number,
  isReady: () => boolean | undefined,
  timeoutTime = 100,
): Promise<void> {
  const maxTime = Date.now() + maxMs;

  function hackyFix(resolve: () => void) {
    if (isReady() || Date.now() >= maxTime) {
      resolve();
    } else {
      setTimeout(async () => hackyFix(resolve), timeoutTime);
    }
  }

  return new Promise((resolve) => hackyFix(resolve));
}
