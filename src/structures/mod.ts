import { createDiscordenoChannel } from "./channel.ts";
import { createDiscordenoGuild } from "./guild.ts";
import { createDiscordenoMember } from "./member.ts";
import { createDiscordenoMessage } from "./message.ts";
import { createDiscordenoRole } from "./role.ts";
import { createDiscordenoVoiceState } from "./voice_state.ts";

import type { DiscordenoChannel } from "./channel.ts";
import type { DiscordenoGuild } from "./guild.ts";
import type { DiscordenoMember } from "./member.ts";
import type { DiscordenoMessage } from "./message.ts";
import type { DiscordenoRole } from "./role.ts";
import type { DiscordenoVoiceState } from "./voice_state.ts";
import type { Channel } from "../types/channels/channel.ts";
import type { Guild } from "../types/guilds/guild.ts";
import type { GuildMemberWithUser } from "../types/members/guild_member.ts";
import type { Message } from "../types/messages/message.ts";
import type { Role } from "../types/permissions/role.ts";
import type { VoiceState } from "../types/voice/voice_state.ts";
import type DDChannel from "../classes/structures/Channel.ts";
import type DDVoiceState from "../classes/structures/guilds/VoiceState.ts";
import type DDRole from "../classes/structures/guilds/Role.ts";
import type DDMember from "../classes/structures/guilds/Member.ts";
import type DDMessage from "../classes/structures/Message.ts";
import type DDGuild from "../classes/structures/guilds/Guild.ts";

/** This is the placeholder where the structure creation functions are kept. */
export let structures: {
  createDiscordenoChannel: (
    data: Channel,
    guildId?: bigint | undefined
  ) => Promise<DiscordenoChannel | DDChannel> | DiscordenoChannel | DDChannel;
  createDiscordenoGuild: (
    data: Guild,
    shardId: number
  ) => Promise<DiscordenoGuild | DDGuild> | DiscordenoGuild | DDGuild;
  createDiscordenoMember: (
    data: GuildMemberWithUser,
    guildId: bigint
  ) => Promise<DiscordenoMember | DDMember> | DiscordenoMember | DDMember;
  createDiscordenoMessage: (data: Message) => Promise<DiscordenoMessage | DDMessage> | DiscordenoMessage | DDMessage;
  createDiscordenoRole: (
    data: { role: Role } & { guildId: bigint }
  ) => Promise<DiscordenoRole | DDRole> | DiscordenoRole | DDRole;
  createDiscordenoVoiceState: (
    guildId: bigint,
    data: VoiceState
  ) => Promise<DiscordenoVoiceState | DDVoiceState> | DiscordenoVoiceState | DDVoiceState;
} = {
  createDiscordenoChannel,
  createDiscordenoGuild,
  createDiscordenoMember,
  createDiscordenoMessage,
  createDiscordenoRole,
  createDiscordenoVoiceState,
};

export type {
  DiscordenoChannel,
  DiscordenoGuild,
  DiscordenoMember,
  DiscordenoMessage,
  DiscordenoRole,
  DiscordenoVoiceState,
};

export type Structures = typeof structures;

/** This function is used to update/reload/customize the internal structures of Discordeno.
 *
 *  ⚠️ **ADVANCED USE ONLY: If you customize this incorrectly, you could potentially create many new errors/bugs.
 * Please take caution when using this.**
 */
export function updateStructures(newStructures: Structures) {
  structures = {
    ...structures,
    ...newStructures,
  };
}
