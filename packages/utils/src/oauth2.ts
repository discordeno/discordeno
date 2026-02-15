import type { BigString, DiscordApplicationIntegrationType, OAuth2Scope, PermissionStrings } from '@discordeno/types';
import { encodeBase64Url } from './base64.js';
import { calculateBits } from './permissions.js';

export function createOAuth2Link(options: CreateOAuth2LinkOptions): string {
  const joinedScopeString = options.scope.join('%20');

  let url = `https://discord.com/oauth2/authorize?client_id=${options.clientId}&scope=${joinedScopeString}`;

  if (options.responseType) url += `&response_type=${options.responseType}`;
  if (options.state) url += `&state=${encodeURIComponent(options.state)}`;
  if (options.redirectUri) url += `&redirect_uri=${encodeURIComponent(options.redirectUri)}`;
  if (options.prompt) url += `&prompt=${options.prompt}`;
  if (options.permissions) url += `&permissions=${Array.isArray(options.permissions) ? calculateBits(options.permissions) : options.permissions}`;
  if (options.guildId) url += `&guild_id=${options.guildId}`;
  if (options.disableGuildSelect !== undefined) url += `&disable_guild_select=${options.disableGuildSelect}`;
  if (options.integrationType) url += `&integration_type=${options.integrationType}`;

  // Options defined by RFC 7636 (https://datatracker.ietf.org/doc/html/rfc7636)
  if (options.codeChallenge) url += `&code_challenge=${options.codeChallenge}`;
  if (options.codeChallengeMethod) url += `&code_challenge_method=${options.codeChallengeMethod}`;

  return url;
}

/**
 * Generates a code verifier for use in the PKCE extension to OAuth2.
 *
 * @param octetLength - The length of the code verifier in octets (default is 32).
 * @return The base64url encoded code verifier
 *
 * @remarks
 * The entropy of the code verifier should be between 256 and 768 bits (32 to 96 octets), as the resulting base64url encoded string has to be between 43 and 128 characters long.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7636#section-7.1 for the octet length
 * @see https://datatracker.ietf.org/doc/html/rfc7636#section-4.1 for why 32 octets is the default
 */
export function generateCodeVerifier(octetLength: number = 32) {
  const randomBytes = new Uint8Array(octetLength);
  crypto.getRandomValues(randomBytes);
  return encodeBase64Url(randomBytes);
}

/**
 * Creates a code challenge from the code verifier using the specified method.
 *
 * @param verifier - The code verifier to use.
 * @returns The code challenge.
 *
 * @remarks
 * This performs a SHA-256 hash on the verifier and encodes it using base64url encoding. Discord only supports 'S256' as the code challenge method.
 */
export async function createCodeChallenge(verifier: string) {
  const hashed = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  return encodeBase64Url(hashed);
}

export interface CreateOAuth2LinkOptions {
  /**
   * The type of response
   *
   * @remarks
   * Should be defined only if using either OAuth2 authorization, implicit or not, or [advanced bot authorization](https://docs.discord.com/developers/topics/oauth2#advanced-bot-authorization)
   */
  responseType?: 'code' | 'token';
  /** The id of the application */
  clientId: BigString;
  /** The scopes for the application */
  scope: OAuth2Scope[];
  /**
   * The optional state for security
   *
   * @see https://docs.discord.com/developers/topics/oauth2#state-and-security
   */
  state?: string;
  /**
   * The redirect uri for after the authentication
   *
   * @remarks
   * Should be defined only if using either OAuth2 authorization, implicit or not, or [advanced bot authorization](https://docs.discord.com/developers/topics/oauth2#advanced-bot-authorization)
   */
  redirectUri?: string;
  /**
   * The type of prompt to give to the user
   *
   * @remarks
   * If set to `none`, it will skip the authorization screen and redirect them back to your redirect URI without requesting their authorization.
   * For passthrough scopes, like bot and webhook.incoming, authorization is always required.
   */
  prompt?: 'consent' | 'none';
  /**
   * The permissions of the invited bot
   *
   * @remarks
   * Should be defined only in a [bot authorization flow](https://docs.discord.com/developers/topics/oauth2#bot-authorization-flow) or with [advanced bot authorization](https://docs.discord.com/developers/topics/oauth2#advanced-bot-authorization)
   */
  permissions?: BigString | PermissionStrings[];
  /**
   * Pre-fills the dropdown picker with a guild for the user
   *
   * @remarks
   * Should be defined only in a [bot authorization flow](https://docs.discord.com/developers/topics/oauth2#bot-authorization-flow) or with [advanced bot authorization](https://docs.discord.com/developers/topics/oauth2#advanced-bot-authorization) or with the `webhook.incoming` scope
   */
  guildId?: BigString;
  /**
   * Disallows the user from changing the guild dropdown if set to true
   *
   * @remarks
   * Should be defined only in a [bot authorization flow](https://docs.discord.com/developers/topics/oauth2#bot-authorization-flow), with [advanced bot authorization](https://docs.discord.com/developers/topics/oauth2#advanced-bot-authorization) or with the `webhook.incoming` scope
   */
  disableGuildSelect?: boolean;
  /**
   * Specifies the installation context for the authorization
   *
   * @remarks
   * Should be defined only when {@link scope} includes {@link OAuth2Scope.ApplicationsCommands}.
   *
   * When set to GuildInstall (0) the application will be authorized for installation to a server, and when set to UserInstall (1) the application will be authorized for installation to a user.
   *
   * The application must be configured in the Developer Portal to support the provided `integrationType`.
   */
  integrationType?: DiscordApplicationIntegrationType;
  /**
   * The code challenge used to verify the authorization request
   *
   * @see https://datatracker.ietf.org/doc/html/rfc7636#section-4.1
   */
  codeChallenge?: string;
  /**
   * The challenge method used to generate the code challenge
   *
   * @remarks
   * While the RFC allows for the 'plain' value to be set, discord does not allow it
   *
   * @see https://datatracker.ietf.org/doc/html/rfc7636#section-4.2
   */
  codeChallengeMethod?: 'S256';
}
