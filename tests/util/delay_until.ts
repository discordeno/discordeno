export async function delayUntil(maxMs: number, isReady: () => boolean, timeoutTime= 100): Promise<void> {
  const maxTime = Date.now() + maxMs;
  return new Promise((resolve) => {
    if(Date.now() >= maxTime || isReady()) {
      resolve();
    }
    else {
      setTimeout(async () => {
        await delayUntil(maxMs, isReady);
        resolve();
      }, timeoutTime);
    }
  });
}
