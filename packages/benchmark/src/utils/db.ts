import fs from 'node:fs/promises'

export const events: any[] = []

const files = await fs.readdir('db/events')

await Promise.all(
  files.map(async (file) => {
    const eventsInFile = Object.values(await fs.readFile(`db/events/${file}`, 'utf8').then((text) => JSON.parse(text)))
    eventsInFile.forEach((eventInFile) => {
      if (typeof eventInFile === 'string') return
      events.push(eventInFile)
    })
  }),
)
