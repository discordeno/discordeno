import type { UpdateVoiceState } from "../../types/voice/update_voice_state.ts";
import type { AtLeastOne } from "../../types/util.ts";
import type { Bot } from "../../bot.ts";
import { DiscordGatewayOpcodes } from "../../types/codes/gateway_opcodes.ts";

/** Connect or join a voice channel inside a guild. By default, the "selfDeaf" option is true. Requires `CONNECT` and `VIEW_CHANNEL` permissions. */
export async function connectToVoiceChannel(
  bot: Bot,
  guildId: bigint,
  channelId: bigint,
  options?: AtLeastOne<Omit<UpdateVoiceState, "guildId" | "channelId">>
) {
  await bot.utils.requireBotChannelPermissions(bot, channelId, ["CONNECT", "VIEW_CHANNEL"]);

  bot.gateway.sendShardMessage(bot.gateway, bot.utils.calculateShardId(bot.gateway, guildId), {
    op: DiscordGatewayOpcodes.VoiceStateUpdate,
    d: {
      guild_id: guildId.toString(),
      channel_id: channelId.toString(),
      self_mute: Boolean(options?.selfMute),
      self_deaf: options?.selfDeaf ?? true,
    },
  });
}
