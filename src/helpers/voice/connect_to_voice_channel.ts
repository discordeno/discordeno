import { DiscordGatewayOpcodes } from "../../types/codes/gateway_opcodes.ts";
import type { UpdateVoiceState } from "../../types/voice/update_voice_state.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { calculateShardId } from "../../util/calculate_shard_id.ts";
import { snakelize } from "../../util/utils.ts";
import type { AtLeastOne } from "../../types/util.ts";
import {GatewayManager} from "../../bot.ts";

/** Connect or join a voice channel inside a guild. By default, the "selfDeaf" option is true. Requires `CONNECT` and `VIEW_CHANNEL` permissions. */
export async function connectToVoiceChannel(
    gateway: GatewayManager,
  guildId: bigint,
  channelId: bigint,
  options?: AtLeastOne<Omit<UpdateVoiceState, "guildId" | "channelId">>
) {
  await requireBotChannelPermissions(channelId, ["CONNECT", "VIEW_CHANNEL"]);

  gateway.sendShardMessage(gateway, calculateShardId(gateway, guildId), {
    op: DiscordGatewayOpcodes.VoiceStateUpdate,
    d: snakelize<UpdateVoiceState>({
      guildId,
      channelId,
      selfMute: Boolean(options?.selfMute),
      selfDeaf: options?.selfDeaf ?? true,
    }),
  });
}
