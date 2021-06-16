import { DiscordGatewayOpcodes } from "../../types/codes/gateway_opcodes.ts";
import type { UpdateVoiceState } from "../../types/voice/update_voice_state.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { calculateShardId } from "../../util/calculate_shard_id.ts";
import { snakelize } from "../../util/utils.ts";
import { ws } from "../../ws/ws.ts";

export async function connectToVoiceChannel(
  guildId: bigint,
  channelId: bigint,
  options: Omit<UpdateVoiceState, "guildId" | "channelId">
) {
  if (options && !options.selfDeaf) options.selfDeaf ??= true;
  await requireBotChannelPermissions(channelId, ["CONNECT", "VIEW_CHANNEL"]);

  ws.sendShardMessage(calculateShardId(guildId), {
    op: DiscordGatewayOpcodes.VoiceStateUpdate,
    d: snakelize<UpdateVoiceState>({ guildId, channelId, ...options }),
  });
}
