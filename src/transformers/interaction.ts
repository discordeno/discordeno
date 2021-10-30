import { Bot } from "../bot.ts";
import { ApplicationCommandInteractionData, ButtonData, DiscordInteractionTypes, Interaction, SelectMenuData } from "../types/mod.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoMember, DiscordenoUser } from "./member.ts";
import { DiscordenoMessage } from "./message.ts";

export function transformInteraction(bot: Bot, payload: SnakeCasedPropertiesDeep<Interaction>): DiscordenoInteraction {
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined;
  const user = bot.transformers.user(bot, payload.member?.user || payload.user!);

  return {
    // UNTRANSFORMED STUFF HERE
    type: payload.type,
    token: payload.token,
    version: payload.version,

    // TRANSFORMED STUFF BELOW
    guildId,
    user,
    id: bot.transformers.snowflake(payload.id),
    applicationId: bot.transformers.snowflake(payload.application_id),
    message: payload.message ? bot.transformers.message(bot, payload.message) : undefined,
    channelId: payload.channel_id ? bot.transformers.snowflake(payload.channel_id) : undefined,
    member: payload.member && guildId ? bot.transformers.member(bot, payload.member, guildId, user.id) : undefined,
    // TODO: CamelCase INTERACTION DATA
    // @ts-ignore 
    data: payload.data,
  };
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
  type: DiscordInteractionTypes;
  /** A continuation token for responding to the interaction */
  token: string;
  /** Read-only property, always `1` */
  version: 1;

  data?: ApplicationCommandInteractionData | ButtonData | SelectMenuData;
}
