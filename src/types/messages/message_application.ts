/** https://discord.com/developers/docs/resources/channel#message-object-message-application-structure */
export interface DiscordMessageApplication {
  /** id of the application */
  id: string;
  /** id of the embed's image asset */
  cover_image?: string;
  /** Application's description */
  description: string;
  /** id of the application's icon */
  icon: string | null;
  /** Name of the application */
  name: string;
}
