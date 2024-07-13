import fs from 'node:fs/promises'
import type { DiscordGatewayPayload } from '@discordeno/types'

export const events: Array<{
  shardId: number
  payload: DiscordGatewayPayload
}> = []

try {
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
} catch {
  const event = await fetch('https://raw.githubusercontent.com/discordeno/benchmarks/main/db/events/10.json')
    .then(async (res) => await res.json())
    .then((eventsInFile: any) => eventsInFile['0'])
  for (let i = 0; i < 10; i++) {
    events.push(event)
  }
}
