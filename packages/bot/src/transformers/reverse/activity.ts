import type { DiscordActivity, DiscordActivityAssets } from '@discordeno/types';
import type { Bot } from '../../bot.js';
import type { Activity, ActivityAssets } from '../types.js';

export function transformActivityToDiscordActivity(bot: Bot, payload: Activity): DiscordActivity {
  return {
    name: payload.name,
    type: payload.type,
    url: payload.url ?? undefined,
    created_at: payload.createdAt,
    application_id: payload.applicationId?.toString(),
    details: payload.details ?? undefined,
    state: payload.state ?? undefined,
    emoji: payload.emoji
      ? {
          name: payload.emoji.name,
          animated: payload.emoji.animated,
          id: payload.emoji.id?.toString(),
        }
      : undefined,
    assets: payload.assets ? bot.transformers.reverse.activityAssets(bot, payload.assets) : undefined,
    details_url: payload.detailsUrl ?? undefined,
    state_url: payload.stateUrl ?? undefined,
    party: payload.party,
    timestamps: payload.timestamps,
    status_display_type: payload.statusDisplayType,
    secrets: payload.secrets,
    instance: payload.instance,
    flags: payload.flags,
    buttons: payload.buttons,
  };
}

export function transformActivityAssetsToDiscordActivityAssets(bot: Bot, payload: ActivityAssets): DiscordActivityAssets {
  return {
    large_image: payload.largeImage,
    large_text: payload.largeText,
    large_url: payload.largeUrl,
    small_image: payload.smallImage,
    small_text: payload.smallText,
    small_url: payload.smallUrl,
    invite_cover_image: payload.inviteCoverImage,
  };
}
