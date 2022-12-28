import type { Camelize, DiscordMessage } from '@discordeno/types'

export function c1amelize1Message (payload: DiscordMessage): Camelize<DiscordMessage> {
  return {
    id: payload.id,
    content: payload.content
  }
}

export function s1nakelize1Message (payload: Camelize<DiscordMessage>): DiscordMessage {
  return {
    id: payload.id,
    content: payload.content
  }
}
