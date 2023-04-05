import { createRestManager } from '@discordeno/rest'

export const REST = createRestManager({
  token: process.env.TOKEN,
})
