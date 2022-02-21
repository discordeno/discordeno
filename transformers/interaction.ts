import { Bot } from "../bot.ts";
import { ChannelTypes } from "../types/channels/channelTypes.ts";
import {
  Attachment,
  Interaction,
  InteractionDataOption,
  InteractionDataResolved,
  InteractionTypes,
  MessageComponents,
  MessageComponentTypes,
} from "../types/mod.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { Collection } from "../util/collection.ts";
import { DiscordenoAttachment } from "./attachment.ts";
import { DiscordenoMember, DiscordenoUser } from "./member.ts";
import { DiscordenoMessage } from "./message.ts";
import { DiscordenoRole } from "./role.ts";

export function transformInteraction(bot: Bot, payload: SnakeCasedPropertiesDeep<Interaction>): DiscordenoInteraction {
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
  resolved: SnakeCasedPropertiesDeep<InteractionDataResolved>,
  guildId?: bigint,
) {
  const transformed: {
    messages?: Collection<bigint, DiscordenoMessage>;
    users?: Collection<bigint, DiscordenoUser>;
    members?: Collection<bigint, DiscordenoMember>;
    roles?: Collection<bigint, DiscordenoRole>;
    channels?: Collection<bigint, { id: bigint; name: string; type: ChannelTypes; permissions: bigint }>;
    attachments?: Collection<bigint, DiscordenoAttachment>;
  } = {};

  if (resolved.messages) {
    transformed.messages = new Collection(
      Object.entries(resolved.messages).map(([id, value]) => {
        const message = bot.transformers.message(bot, value);
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
        const member = bot.transformers.member(bot, value, guildId, bot.transformers.snowflake(id));
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
        return [id, bot.transformers.attachment(bot, value as SnakeCasedPropertiesDeep<Attachment>)];
      }),
    );
  }

  return transformed;
}

export interface DiscordenoInteraction {
  /** Id of the interaction */
  id: bigint;
  /** Id of the application this interaction is for */
  applicationId: bigint;
  /** The guild it was sent from */
  guildId?: bigint;
  /** The channel it was sent from */
  channelId?: bigint;
  /** Guild member data for the invoking user, including permissions */
  member?: DiscordenoMember;
  /** User object for the invoking user, if invoked in a DM */
  user: DiscordenoUser;
  /** For the message the button was attached to */
  message?: DiscordenoMessage;
  /** The type of interaction */
  type: InteractionTypes;
  /** A continuation token for responding to the interaction */
  token: string;
  /** Read-only property, always `1` */
  version: 1;

  data?: {
    /** The type of component */
    componentType?: MessageComponentTypes;
    /** The custom id provided for this component. */
    customId?: string;
    /** The components if its a Modal Submit interaction. */
    components?: MessageComponents;
    /** The values chosen by the user. */
    values?: string[];
    /** The Id of the invoked command */
    id?: bigint;
    /** The name of the invoked command */
    name?: string;
    /** Converted users + roles + channels */
    resolved?: {
      /** The Ids and Message objects */
      messages?: Collection<bigint, DiscordenoMessage>;
      /** The Ids and User objects */
      users?: Collection<bigint, DiscordenoUser>;
      /** The Ids and partial Member objects */
      members?: Collection<bigint, DiscordenoMember>;
      /** The Ids and Role objects */
      roles?: Collection<bigint, DiscordenoRole>;
      /** The Ids and partial Channel objects */
      channels?: Collection<
        bigint,
        {
          id: bigint;
          name: string;
          type: ChannelTypes;
          permissions: bigint;
        }
      >;
      /** The Ids and attachments objects */
      attachments?: Collection<bigint, DiscordenoAttachment>;
    };
    /** The params + values from the user */
    options?: InteractionDataOption[];
    /** The target id if this is a context menu command. */
    targetId?: bigint;
  };

  /** The selected language of the invoking user */
  locale?: string;
  /** The guild's preferred locale, if invoked in a guild. WARNING HIGHLY INACCURATE IN MOST SERVERS! */
  guildLocale?: string;
}
