import type { EventHandlers } from '@discordeno/bot'

export const event: EventHandlers['ready'] = () => {
  console.log('Ready!')
}
