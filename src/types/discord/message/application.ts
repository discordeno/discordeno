/** https://discord.com/developers/docs/resources/channel#message-object-message-application-structure */
export interface DiscordMessageApplication {
  /** id of the application */
  id: string;
  /** id of the embed's image asset */
  // deno-lint-ignore camelcase
  cover_image?: string;
  /** application's description */
  description: string;
  /** id of the application's icon */
  icon: string | null;
  /** name of the application */
  name: string;
}
