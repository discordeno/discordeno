import { User } from "../users/user.ts";
import { Application } from "./application.ts";
import { DiscordOAuth2Scopes } from "./scopes.ts";

export interface GetCurrentAuthoriationInformation {
  /** The current application */
  application: Partial<Application>;
  /** The scopes the user has authorized the application for */
  scopes: DiscordOAuth2Scopes[];
  /** When the access token expires */
  expires: string;
  /** The user who has authorized, if the user has authorized with the `identify` scope */
  user?: User;
}
