import { User } from "../users/user.ts";
import { SnakeCaseProps } from "../util.ts";

export interface IntegrationApplication {
  /** The id of the app */
  id: string;
  /** The name of the app */
  name: string;
  /** the icon hash of the app */
  icon: string;
  /** The description of the app */
  description: string;
  /** The summary of the app */
  summary: string;
  /** The bot associated with this application */
  bot?: User;
}

/** https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure */
export type DiscordIntegrationApplication = SnakeCaseProps<
  IntegrationApplication
>;
