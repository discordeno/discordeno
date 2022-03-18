import { Bot } from "../bot.ts";
import { DiscordAttachment, DiscordInteraction, DiscordInteractionDataResolved } from "../types/discord.ts";
import { ChannelTypes } from "../types/shared.ts";
import { Collection } from "../util/collection.ts";
import { Attachment } from "./attachment.ts";
import { Member, User } from "./member.ts";
import { Message } from "./message.ts";
import { Role } from "./role.ts";
import { Optionalize } from "../types/shared.ts";

export function transformInteraction(bot: Bot, payload: DiscordInteraction) {
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined;
  const user = bot.transformers.user(bot, payload.member?.user || payload.user!);

  return {
    // UNTRANSFORMED STUFF HERE
    type: payload.type,
    token: payload.token,
    version: payload.version,
    locale: payload.locale,
    guildLocale: payload.guild_locale,

    // TRANSFORMED STUFF BELOW
    guildId,
    user,
    id: bot.transformers.snowflake(payload.id),
    applicationId: bot.transformers.snowflake(payload.application_id),
    message: payload.message ? bot.transformers.message(bot, payload.message) : undefined,
    channelId: payload.channel_id ? bot.transformers.snowflake(payload.channel_id) : undefined,
    member: payload.member && guildId ? bot.transformers.member(bot, payload.member, guildId, user.id) : undefined,

    // @ts-ignore figure this out
    data: payload.data
      ? {
        componentType: payload.data.component_type,
        customId: payload.data.custom_id,
        components: payload.data.components?.map((component) => bot.transformers.component(bot, component)),
        values: payload.data.values,
        id: payload.data.id ? bot.transformers.snowflake(payload.data.id) : undefined,
        name: payload.data.name,
        resolved: payload.data.resolved
          ? transformInteractionDataResolved(bot, payload.data.resolved, guildId)
          : undefined,
        // @ts-ignore TODO: figure this out
        options: payload.data.options,
        targetId: payload.data.target_id ? bot.transformers.snowflake(payload.data.target_id) : undefined,
      }
      : undefined,
  };
}

export function transformInteractionDataResolved(
  bot: Bot,
  resolved: DiscordInteractionDataResolved,
  guildId?: bigint,
) {
  const transformed: {
    messages?: Collection<bigint, Message>;
    users?: Collection<bigint, User>;
    members?: Collection<bigint, Member>;
    roles?: Collection<bigint, Role>;
    channels?: Collection<bigint, { id: bigint; name: string; type: ChannelTypes; permissions: bigint }>;
    attachments?: Collection<bigint, Attachment>;
  } = {};

  if (resolved.messages) {
    transformed.messages = new Collection(
      Object.entries(resolved.messages).map(([id, value]) => {
        const message: Message = bot.transformers.message(bot, value);
        return [message.id, message];
      }),
    );
  }

  if (resolved.users) {
    transformed.users = new Collection(
      Object.entries(resolved.users).map(([id, value]) => {
        const user = bot.transformers.user(bot, value);
        return [user.id, user];
      }),
    );
  }

  if (guildId && resolved.members) {
    transformed.members = new Collection(
      Object.entries(resolved.members).map(([id, value]) => {
        const member: Member = bot.transformers.member(bot, value, guildId, bot.transformers.snowflake(id));
        return [member.id, member];
      }),
    );
  }

  if (guildId && resolved.roles) {
    transformed.roles = new Collection(
      Object.entries(resolved.roles).map(([id, value]) => {
        const role = bot.transformers.role(bot, { role: value, guildId });
        return [role.id, role];
      }),
    );
  }

  if (resolved.channels) {
    transformed.channels = new Collection(
      Object.entries(resolved.channels).map(([key, value]) => {
        const id = bot.transformers.snowflake(key);
        const channel = value as { id: string; name: string; type: ChannelTypes; permissions: string };
        return [
          id,
          {
            id,
            name: channel.name,
            type: channel.type,
            permissions: bot.transformers.snowflake(channel.permissions),
          },
        ];
      }),
    );
  }

  if (resolved.attachments) {
    transformed.attachments = new Collection(
      Object.entries(resolved.attachments).map(([key, value]) => {
        const id = bot.transformers.snowflake(key);
        return [id, bot.transformers.attachment(bot, value as DiscordAttachment)];
      }),
    );
  }

  return transformed;
}

export interface Interaction extends Optionalize<ReturnType<typeof transformInteraction>> {}
export interface InteractionDataResolved extends Optionalize<ReturnType<typeof transformInteractionDataResolved>> {}
