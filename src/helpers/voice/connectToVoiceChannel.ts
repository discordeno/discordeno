import type { UpdateVoiceState } from "../../types/voice/updateVoiceState.ts";
import type { AtLeastOne } from "../../types/util.ts";
import type { Bot } from "../../bot.ts";
import { GatewayOpcodes } from "../../types/codes/gatewayOpcodes.ts";

/** Connect or join a voice channel inside a guild. By default, the "selfDeaf" option is true. Requires `CONNECT` and `VIEW_CHANNEL` permissions. */
export async function connectToVoiceChannel(
  bot: Bot,
  guildId: bigint,
  channelId: bigint,
  options?: AtLeastOne<Omit<UpdateVoiceState, "guildId" | "channelId">>
) {
  bot.gateway.sendShardMessage(bot.gateway, bot.utils.calculateShardId(bot.gateway, guildId), {
    op: GatewayOpcodes.VoiceStateUpdate,
    d: {
      guild_id: guildId.toString(),
      channel_id: channelId.toString(),
      self_mute: Boolean(options?.selfMute),
      self_deaf: options?.selfDeaf ?? true,
    },
  });
}
