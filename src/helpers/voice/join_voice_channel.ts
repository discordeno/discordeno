import { DiscordGatewayOpcodes } from "../../types/codes/gateway_opcodes.ts";
import type { UpdateVoiceState } from "../../types/voice/update_voice_state.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { sendShardMessage } from "../../ws/send_shard_message.ts";
import { calculateShardId } from "../../util/calculate_shard_id.ts";
import { snakelize } from "../../util/utils.ts";

export async function joinVoiceChannel(
  guildId: bigint,
  channelId: bigint,
  { selfDeaf = false, selfMute = false }: Partial<Omit<UpdateVoiceState, "guildId" | "channelId">> = {}
) {
  await requireBotChannelPermissions(channelId, ["CONNECT"]);

  sendShardMessage(calculateShardId(guildId), {
    op: DiscordGatewayOpcodes.VoiceStateUpdate,
    d: snakelize<UpdateVoiceState>({ guildId, channelId, selfDeaf, selfMute }),
  });
}
