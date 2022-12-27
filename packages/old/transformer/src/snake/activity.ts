import type { Camelize, DiscordActivity } from '@discordeno/types'

export function s1nakelize1Activity (payload: Camelize<DiscordActivity>): DiscordActivity {
  return {
    url: payload.url,
    name: payload.name,
    type: payload.type,
    state: payload.state,
    flags: payload.flags,
    buttons: payload.buttons,
    details: payload.details,
    instance: payload.instance,
    created_at: payload.createdAt,
    application_id: payload.applicationId,

    timestamps: payload.timestamps && {
      start: payload.timestamps.start,
      end: payload.timestamps.end
    },
    emoji: payload.emoji && {
      name: payload.emoji.name,
      id: payload.emoji.id,
      animated: payload.emoji.animated
    },
    party: payload.party && {
      id: payload.party.id,
      size: payload.party.size
    },
    assets: payload.assets && {
      large_image: payload.assets.largeImage,
      large_text: payload.assets.largeText,
      small_image: payload.assets.smallImage,
      small_text: payload.assets.smallText
    },
    secrets: payload.secrets && {
      join: payload.secrets.join,
      spectate: payload.secrets.spectate,
      match: payload.secrets.match
    }
  }
}
