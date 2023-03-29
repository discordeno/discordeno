import type { DiscordGatewayPayload } from '@discordeno/types'
import fs from 'node:fs/promises'

export const events: Array<{
  shardId: number
  payload: DiscordGatewayPayload
}> = []

const files = await fs.readdir('db/events')

for await (const file of files) {
  const eventsInFile: Array<
    | {
        shardId: number
        payload: DiscordGatewayPayload
      }
    | string
  > = Object.values(await fs.readFile(`db/events/${file}`, 'utf8').then((text) => JSON.parse(text)))
  eventsInFile.forEach((eventInFile) => {
    if (typeof eventInFile === 'string') return
    events.push(eventInFile)
  })
}
