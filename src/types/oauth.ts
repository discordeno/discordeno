import { UserPayload } from "./guild.ts";
import { TeamPayload } from "./teams.ts";

export interface OAuthApplication {
  /** id of the app */
  id: string;
  /** the name of the app */
  name: string;
  /** the icon hash of the app */
  icon: string | null;
  /** the description of the app */
  description: string;
  /** an array of rpc origin urls, if rpx is enabled */
  "rpc_origins"?: string[];
  /** when false only app owner can join the app's bot to guilds */
  "bot_public": boolean;
  /** when true the app's bot will only join upon completion of the full oauth2 code grant flow */
  "bot_require_code_grand": boolean;
  /** partial user object containing info on the owner of the application */
  owner: Partial<UserPayload>;
  /** if this application is a game sold on Disccord, this field will be the summary field for the store page of its primary sku */
  summary: string;
  /** the base64 enccoded key for the GameSDK'S GetTicket */
  "verify_key": string;
  /** if the application belongs to a team, this will be a list of the members of that team */
  team: TeamPayload | null;
  /** if this application is a game sold on Discord, this field will be the guild to which it has been linked */
  "guild_id"?: string;
  /** if this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists */
  "primary_sku_id"?: string;
  /** if this application is a game sold on Discord, this field will be the URL slug that links to the store page */
  slug?: string;
  /** if this application is a game sold on Discord, this field wil be the hash of the image on store embeds */
  "cover_image"?: string;
  /** the application's public flags */
  flags: number;
}
