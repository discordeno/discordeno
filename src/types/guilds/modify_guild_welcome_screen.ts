import { SnakeCasedPropertiesDeep } from "../util.ts";
import { WelcomeScreenChannel } from "./welcome_screen_channel.ts";

export interface ModifyGuildWelcomeScreen {
  /** Whether the welcome screen is enabled */
  enabled?: boolean | null;
  /** Channels linked in the welcome screen and their display options */
  welcomeScreen?: WelcomeScreenChannel[] | null;
  /** The server description to show in the welcome screen */
  description?: string | null;
}

// TODO: add documentation link
export type DiscordModifyGuildWelcomeScreen = SnakeCasedPropertiesDeep<
  ModifyGuildWelcomeScreen
>;
