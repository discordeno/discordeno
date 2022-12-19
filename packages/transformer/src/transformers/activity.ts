import type { Camelize, DiscordActivity } from '@discordeno/types'

export function c1amelize1Activity (
  payload: DiscordActivity
): Camelize<DiscordActivity> {
  return {
    name: payload.name,
    type: payload.type,
    url: payload.url,
    createdAt: payload.created_at,
    timestamps: payload.timestamps && {
      start: payload.timestamps.start,
      end: payload.timestamps.end
    },
    applicationId: payload.application_id,
    details: payload.details,
    state: payload.state,
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
      largeImage: payload.assets.large_image,
      largeText: payload.assets.large_text,
      smallImage: payload.assets.small_image,
      smallText: payload.assets.small_text
    },
    secrets: payload.secrets && {
      join: payload.secrets.join,
      spectate: payload.secrets.spectate,
      match: payload.secrets.match
    },
    instance: payload.instance,
    flags: payload.flags,
    buttons: payload.buttons?.map((button) => ({
      label: button.label,
      url: button.url
    }))
  }
}
