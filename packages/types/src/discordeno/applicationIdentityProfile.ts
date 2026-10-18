/** Types for: https://docs.discord.com/developers/resources/application-identity-profile */

import type { DiscordProfileData } from '../discord/applicationIdentityProfile.js';
import type { Camelize } from '../shared.js';

/** https://docs.discord.com/developers/resources/application-identity-profile#update-application-identity-profile */
export interface UpdateApplicationIdentityProfile {
  /** The user's username in your system */
  username?: string;
  data?: Camelize<DiscordProfileData>;
}

/** https://docs.discord.com/developers/resources/application-identity-profile#delete-application-identity */
export interface DeleteApplicationIdentityProfile {
  /** Provider-specific identifier used to disambiguate matching provider type and provider-issued user ID */
  providerId?: string;
}
