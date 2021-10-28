import { Bot } from "../bot.ts";
import { Application } from "../types/applications/application.ts";
import { DiscordApplicationFlags } from "../types/applications/application_flags.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoUser } from "./member.ts";
import { DiscordenoTeam } from "./team.ts";

export function transformApplication(bot: Bot, payload: SnakeCasedPropertiesDeep<Application>): DiscordenoApplication {
  return {
    name: payload.name,
    description: payload.description,
    rpcOrigins: payload.rpc_origins,
    botPublic: payload.bot_public,
    botRequireCodeGrant: payload.bot_require_code_grant,
    termsOfServiceUrl: payload.terms_of_service_url,
    privacyPolicyUrl: payload.privacy_policy_url,
    summary: payload.summary,
    verifyKey: payload.verify_key,
    primarySkuId: payload.primary_sku_id,
    slug: payload.slug,
    coverImage: payload.cover_image,
    flags: payload.flags,

    id: bot.transformers.snowflake(payload.id),
    icon: payload.icon ? bot.utils.iconHashToBigInt(payload.icon) : undefined,
    // @ts-ignore the partial here wont break anything
    owner: payload.owner ? bot.transformers.user(bot, payload.owner) : undefined,
    team: payload.team ? bot.transformers.team(bot, payload.team) : undefined,
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
  };
}

export interface DiscordenoApplication {
  /** The id of the app */
  id: bigint;
  /** The name of the app */
  name: string;
  /** The icon hash of the app */
  icon?: bigint;
  /** The description of the app */
  description: string;
  /** An array of rpc origin urls, if rpc is enabled */
  rpcOrigins?: string[];
  /** When false only app owner can join the app's bot to guilds */
  botPublic: boolean;
  /** When true the app's bot will only join upon completion of the full oauth2 code grant flow */
  botRequireCodeGrant: boolean;
  /** The url of the app's terms of service */
  termsOfServiceUrl?: string;
  /** The url of the app's privacy policy */
  privacyPolicyUrl?: string;
  /** Partial user object containing info on the owner of the application */
  owner?: Partial<DiscordenoUser>;
  /** If this application is a game sold on Discord, this field will be the summary field for the store page of its primary sku */
  summary: string;
  /** The hex encoded key for verification in interactions and the GameSDK's GetTicket */
  verifyKey: string;
  /** If the application belongs to a team, this will be a list of the members of that team */
  team?: DiscordenoTeam;
  /** If this application is a game sold on Discord, this field will be the guild to which it has been linked */
  guildId?: bigint;
  /** If this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists */
  primarySkuId?: string;
  /** If this application is a game sold on Discord, this field will be the URL slug that links to the store page */
  slug?: string;
  /** If this application is a game sold on Discord, this field will be the hash of the image on store embeds */
  coverImage?: string;
  /** The application's public flags */
  flags: DiscordApplicationFlags;
}
