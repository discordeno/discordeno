import {
  Bot,
  Channel,
  EventHandlers,
  Guild,
  Member,
  Message,
  Role,
  User,
} from "discordeno";
import { BotWithProxyCache, ProxyCacheTypes } from ".";

export type Events = {
  [K in keyof EventHandlers]: EventHandlers[K] extends
    (bot: infer T, ...rest: infer R) => infer U
    ? Bot extends T ? (bot: Bot, ...rest: R) => U
    : (...rest: Parameters<EventHandlers[K]>) => U
    : never;
};

export interface BotWithProxyEvents extends Events {
  channelUpdateWithOldChannel(
    bot: BotWithProxyCache<ProxyCacheTypes, Bot>,
    oldChannel: Channel,
    newChannel: Channel,
  ): unknown;
  messageUpdateWithOldMessage(
    bot: BotWithProxyCache<ProxyCacheTypes, Bot>,
    oldChannel: Message,
    newChannel: Message,
  ): unknown;
  guildUpdateWithOldGuild(
    bot: BotWithProxyCache<ProxyCacheTypes, Bot>,
    oldChannel: Guild,
    newChannel: Guild,
  ): unknown;
  guildRoleUpdateWithOldRole(
    bot: BotWithProxyCache<ProxyCacheTypes, Bot>,
    oldRole: Role,
    newRole: Role,
  ): unknown;
  guildMemberUpdateWithOldMember(
    bot: BotWithProxyCache<ProxyCacheTypes, Bot>,
    oldMember: Member,
    newMember: Member,
  ): unknown;
  userUpdateWithOldUser(
    bot: BotWithProxyCache<ProxyCacheTypes, Bot>,
    oldUser: User,
    newUser: User,
  ): unknown;
}
