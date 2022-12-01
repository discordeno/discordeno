/** Pause the execution for a given amount of milliseconds. */
export async function delay (ms: number): Promise<void> {
  return await new Promise((resolve): NodeJS.Timeout =>
    setTimeout((): void => {
      resolve()
    }, ms)
  )
}
