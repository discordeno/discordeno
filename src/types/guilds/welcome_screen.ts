import { SnakeCaseProps } from "../util.ts";
import { WelcomeScreenChannel } from "./welcome_screen_channel.ts";

export interface WelcomeScreen {
  /** The server description shown in the welcome screen */
  description: string | null;
  /** The channels shown in the welcome screen, up to 5 */
  welcomeChannels: WelcomeScreenChannel[];
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-structure */
export type DiscordWelcomeScreen = SnakeCaseProps<WelcomeScreen>;
