import { DiscordUser } from "../member/user/user.ts";
import { DiscordTeam } from "../team/team.ts";

/** https://discord.com/developers/docs/topics/oauth2#get-current-application-information */
export interface DiscordApplication {
  /** id of the app */
  id: string;
  /** the name of the app */
  name: string;
  /** the icon hash of the app */
  icon: string | null;
  /** the description of the app */
  description: string;
  /** an array of rpc origin urls, if rpx is enabled */
  // deno-lint-ignore camelcase
  rpc_origins?: string[];
  /** when false only app owner can join the app's bot to guilds */
  // deno-lint-ignore camelcase
  bot_public: boolean;
  /** when true the app's bot will only join upon completion of the full oauth2 code grant flow */
  // deno-lint-ignore camelcase
  bot_require_code_grand: boolean;
  /** partial user object containing info on the owner of the application */
  owner: Partial<DiscordUser>;
  /** if this application is a game sold on Disccord, this field will be the summary field for the store page of its primary sku */
  summary: string;
  /** the base64 enccoded key for the GameSDK'S GetTicket */
  // deno-lint-ignore camelcase
  verify_key: string;
  /** if the application belongs to a team, this will be a list of the members of that team */
  team: DiscordTeam | null;
  /** if this application is a game sold on Discord, this field will be the guild to which it has been linked */
  // deno-lint-ignore camelcase
  guild_id?: string;
  /** if this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists */
  // deno-lint-ignore camelcase
  primary_sku_id?: string;
  /** if this application is a game sold on Discord, this field will be the URL slug that links to the store page */
  slug?: string;
  /** if this application is a game sold on Discord, this field wil be the hash of the image on store embeds */
  // deno-lint-ignore camelcase
  cover_image?: string;
  /** the application's public flags */
  flags: number;
}
