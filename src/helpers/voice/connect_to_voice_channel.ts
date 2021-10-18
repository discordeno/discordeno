import type { UpdateVoiceState } from "../../types/voice/update_voice_state.ts";
import type { AtLeastOne } from "../../types/util.ts";
import { Bot } from "../../bot.ts";

/** Connect or join a voice channel inside a guild. By default, the "selfDeaf" option is true. Requires `CONNECT` and `VIEW_CHANNEL` permissions. */
export async function connectToVoiceChannel(
  bot: Bot,
  guildId: bigint,
  channelId: bigint,
  options?: AtLeastOne<Omit<UpdateVoiceState, "guildId" | "channelId">>
) {
  await bot.utils.requireBotChannelPermissions(bot, channelId, ["CONNECT", "VIEW_CHANNEL"]);

  bot.ws.sendShardMessage(bot.utils.calculateShardId(guildId), {
    op: bot.constants.DiscordGatewayOpcodes.VoiceStateUpdate,
    d: {
      guild_id: guildId,
      channel_id: channelId,
      self_mute: Boolean(options?.selfMute),
      self_deaf: options?.selfDeaf ?? true,
    },
  });
}
