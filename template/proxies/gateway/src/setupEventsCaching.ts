import {
  DiscordChannel,
  DiscordGuild,
  DiscordGuildBanAddRemove,
  DiscordGuildMemberAdd,
  DiscordGuildMemberRemove,
  DiscordGuildMembersChunk,
  DiscordGuildRoleCreate,
  DiscordGuildRoleDelete,
  DiscordInteraction,
  DiscordMessage,
  DiscordUnavailableGuild,
  DiscordVoiceState,
} from "../../../../types/discord.ts";
import { ProxyGateway } from "./startProxy.ts";
import { proxyChannel, proxyGuild, proxyMember, proxyRole } from "./structures/mod.ts";

export function setupEventsCaching(gateway: ProxyGateway) {
  const oldHandleDiscordPayload = gateway.handleDiscordPayload;

  gateway.handleDiscordPayload = function (_, data, shardId) {
    switch (data.t) {
      case "CHANNEL_CREATE":
      case "CHANNEL_UPDATE":
      case "THREAD_CREATE":
      case "THREAD_UPDATE":
        const channel = data.d as DiscordChannel;
        if (channel.guild_id) gateway.guilds.get(channel.guild_id)?.channels.set(channel.id, proxyChannel(channel));
        break;
      case "CHANNEL_DELETE":
      case "THREAD_DELETE":
        const deletedChannel = data.d as DiscordChannel;
        if (deletedChannel.guild_id) gateway.guilds.get(deletedChannel.guild_id)?.channels.delete(deletedChannel.id);
        break;
      case "GUILD_CREATE":
        gateway.guilds.set((data.d as DiscordGuild).id, proxyGuild(data.d as DiscordGuild));
        break;
      case "GUILD_DELETE":
        const payload = data.d as DiscordUnavailableGuild;
        if (payload.unavailable) break;

        gateway.guilds.delete(payload.id);
        break;
      case "GUILD_UPDATE":
        const updatedGuild = proxyGuild(data.d as DiscordGuild);
        const oldGuild = gateway.guilds.get(updatedGuild.id);
        if (oldGuild) {
          // Members need to be recached since only some of them are sent.
          oldGuild.members.forEach((member) => {
            // Only add members to cache again if they did not have a member in the updated guild
            if (!updatedGuild.members.has(member.user!.id)) updatedGuild.members.set(member.user!.id, member);
          });
        }
        gateway.guilds.set(updatedGuild.id, updatedGuild);
        break;
      case "GUILD_BAN_ADD":
        gateway.guilds.get((data.d as DiscordGuildBanAddRemove).guild_id)?.members.delete(
          (data.d as DiscordGuildBanAddRemove).user.id,
        );
        break;
      case "INTERACTION_CREATE":
        const interactionPayload = data.d as DiscordInteraction;
        if (interactionPayload.member) {
          gateway.guilds.get(interactionPayload.guild_id!)?.members.set(
            interactionPayload.member.user.id,
            proxyMember(interactionPayload.member),
          );
        }
        break;
      case "GUILD_MEMBER_ADD":
      case "GUILD_MEMBER_UPDATE":
        const memberAddPayload = data.d as DiscordGuildMemberAdd;
        gateway.guilds.get(memberAddPayload.guild_id)?.members.set(
          memberAddPayload.user.id,
          proxyMember(memberAddPayload),
        );
        break;
      case "GUILD_MEMBER_REMOVE":
        const memberRemovePayload = data.d as DiscordGuildMemberRemove;
        gateway.guilds.get(memberRemovePayload.guild_id)?.members.delete(
          memberRemovePayload.user.id,
        );
        break;
      case "GUILD_MEMBERS_CHUNK":
        const memberChunkPayload = data.d as DiscordGuildMembersChunk;
        memberChunkPayload.members.forEach((m) => {
          gateway.guilds.get(memberChunkPayload.guild_id)?.members.set(m.user.id, proxyMember(m));
        });
        break;
      case "MESSAGE_CREATE":
      case "MESSAGE_UPDATE":
        const messagePayload = data.d as DiscordMessage;
        if (messagePayload.member && messagePayload.member.user) {
          gateway.guilds.get(messagePayload.guild_id!)?.members.set(
            messagePayload.member.user.id,
            proxyMember(messagePayload.member),
          );
        }
        break;
      case "GUILD_ROLE_CREATE":
      case "GUILD_ROLE_UPDATE":
        const rolePayload = data.d as DiscordGuildRoleCreate;
        gateway.guilds.get(rolePayload.guild_id)?.roles.set(rolePayload.role.id, proxyRole(rolePayload.role));
        break;
      case "GUILD_ROLE_DELETE":
        const roleDeletePayload = data.d as DiscordGuildRoleDelete;
        gateway.guilds.get(roleDeletePayload.guild_id)?.roles.delete(roleDeletePayload.role_id);
        break;
      case "VOICE_STATE_UPDATE":
        const voicePayload = data.d as DiscordVoiceState;
        if (voicePayload.guild_id && voicePayload.member?.user) {
          gateway.guilds.get(voicePayload.guild_id)?.members.set(
            voicePayload.member.user.id,
            proxyMember(voicePayload.member),
          );
        }
        break;
    }

    return oldHandleDiscordPayload(gateway, data, shardId);
  };
}
