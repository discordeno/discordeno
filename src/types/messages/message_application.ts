import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface MessageApplication {
  /** id of the application */
  id: string;
  /** id of the embed's image asset */
  coverImage?: string;
  /** Application's description */
  description: string;
  /** id of the application's icon */
  icon: string | null;
  /** Name of the application */
  name: string;
}

export type DiscordMessageApplication = SnakeCasedPropertiesDeep<MessageApplication>;
