import type { Bot } from "../../bot.ts";
import { GatewayOpcodes } from "../../types/codes/gatewayOpcodes.ts";
import type { StatusUpdate } from "../../types/gateway/statusUpdate.ts";

export function editBotStatus(bot: Bot, data: Omit<StatusUpdate, "afk" | "since">) {
  bot.gateway.shards.forEach((shard) => {
    bot.events.debug(`Running forEach loop in editBotStatus function.`);

    bot.gateway.sendShardMessage(bot.gateway, shard, {
      op: GatewayOpcodes.PresenceUpdate,
      d: {
        since: null,
        afk: false,
        activities: data.activities.map((activity) => ({
          name: activity.name,
          type: activity.type,
          url: activity.url,
          created_at: activity.createdAt,
          timestamps: activity.timestamps
            ? {
                start: activity.timestamps.start,
                end: activity.timestamps.end,
              }
            : undefined,
          applicationId: activity.applicationId?.toString(),
          details: activity.details,
          state: activity.state,
          emoji: activity.emoji
            ? {
                name: activity.emoji.name,
                id: activity.emoji.id?.toString(),
                animated: activity.emoji.animated,
              }
            : undefined,
          party: activity.party
            ? {
                id: activity.party.id?.toString(),
                size: activity.party.size,
              }
            : undefined,
          assets: activity.assets
            ? {
                large_image: activity.assets.largeImage,
                large_text: activity.assets.largeText,
                small_image: activity.assets.smallImage,
                small_text: activity.assets.smallText,
              }
            : undefined,
          secrets: activity.secrets,
          instance: activity.instance,
          flags: activity.flags,
          buttons: activity.buttons,
        })),
        status: data.status,
      },
    });
  });
}
