# Discordeno Typings Guidelines / Explanations

Discordeno has a certain standard guidelines for our typings. Please follow this
as best as possible when contributing to the library.

1. Discordeno Types

These types will be specifically used by the end user for functions inside
Discordeno.

Example:

```ts
interface EditMemberOptions {
  /** Value to set users nickname to. Requires MANAGE_NICKNAMES permission. */
  nick?: string;
  /** Array of role ids the member will have after this edit. Useful for adding/removing multiple roles in 1 API call. Requires MANAGE_ROLES permission. */
  roles?: string[];
  /** Whether the user is muted in voice channels. Requires MUTE_MEMBERS permission. */
  mute?: boolean;
  /** Whether the user is deafened in voice channels. Requires DEAFEN_MEMBERS permission. */
  deaf?: boolean;
  /** The id of the channel to move user to if they are connected to voice. To kick the user from their current channel, set to null. Requires MOVE_MEMBERS permission. When moving members to channels, must have permissions to both CONNECT to the channel and have the MOVE_MEMBER permission. */
  channelID?: string;
}
```

Rules:

- Camel Case
- Do not allow `null`
- Everything should have a comment explaining it
- These typings should be kept in the file with the function.
  - Example: EditMemberOptions is at the bottom of the file where editMember()
    is declared.

2. Discord Types Incoming

These types are meant for the payloads that we receive from Discord, whether
through gateway or REST.

Example:

```ts
export interface MemberCreatePayload {
  /** The user this guild member represents */
  user: UserPayload;
  /** The user's guild nickname if one is set. */
  nick?: string;
  /** Array of role ids that the member has */
  roles: string[];
  /** When the user joined the guild. */
  joined_at: string;
  /** When the user used their nitro boost on the server. */
  premium_since?: string;
  /** Whether the user is deafened in voice channels */
  deaf: boolean;
  /** Whether the user is muted in voice channels */
  mute: boolean;
  /** Whether the user has passed the guild's Membership Screening requirements */
  pending?: boolean;
}
```

Rules:

- Snake case (Or whatever discord uses. Everything here should be letter to
  letter in accordance with discord's docs.)
- Everything should have a comment explaining it
- Kept in the src/types/api/incoming folder

3. Discord Types Outgoing

These types are meant **US** as we develop Discordeno. These will help us
prevent bugs when we are sending payloads to Discord whether through gateway or
REST.

Example:

```ts
export interface EditMemberPayload {
  /** Value to set users nickname to. Requires MANAGE_NICKNAMES permission. */
  nick?: string;
  /** Array of role ids the member is assigned. Requires MANAGE_ROLES permission. */
  roles?: string[];
  /** Whether the user is muted in voice channels. Requires MUTE_MEMBERS permission. */
  mute?: boolean;
  /** Whether the user is deafened in voice channels. Requires DEAFEN_MEMBERS permission. */
  deaf?: boolean;
  /** The id of the channel to move user to if they are connected to voice. To kick the user from their current channel, set to null. Requires MOVE_MEMBERS permission. When moving members to channels, must have permissions to both CONNECT to the channel and have the MOVE_MEMBER permission. */
  channel_id?: string | null;
}
```

Rules:

- Snake case (Or whatever discord uses. Everything here should be letter to
  letter in accordance with discord's docs.)
- Everything should have a comment explaining it
- Kept in the src/types/api/outgoing folder

## Minimalistic

Since Discord uses `snake_case` but we use `camelCase` we will end up with
redundant typings. In order to solve this, we have the `Camelize<T>` type which
helps create a type using the snake case.

If we have the base payload for Discord's `User` as follows:

```ts
export interface DiscordUserPayload {
  /** The user's id */
  id: string;
  /** the user's username, not unique across the platform */
  username: string;
  /** The user's 4 digit discord tag */
  discriminator: string;
  /** The user's avatar hash */
  avatar: string | null;
  /** Whether the user is a bot */
  bot?: boolean;
  /** Whether the user is an official discord system user (part of the urgent message system.) */
  system?: boolean;
  /** Whether the user has two factor enabled on their account */
  "mfa_enabled"?: boolean;
  /** the user's chosen language option */
  locale?: string;
  /** Whether the email on this account has been verified */
  verified?: boolean;
  /** The user's email */
  email?: string;
  /** The flags on a user's account. */
  flags?: number;
  /** The type of Nitro subscription on a user's account. */
  premium_type?: number;
}
```

To create the Discordeno version for this it would be done as:

```ts
export interface UserPayload extends Camelize<DiscordUserPayload> {}
```

Now we have 2 unique interfaces, without having all the extra work or headaches
of maintaing 2 different interfaces.

Similarily, for any outgoing Discord types, we can also camelize them to have
better user experience for users.

Example:

```ts
export interface DiscordBanOptions {
  /** number of days to delete messages for (0-7) */
  delete_message_days?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** The reason for the ban. */
  reason?: string;
}
```

To create the Discordeno version for this it would be done as:

```ts
export interface BanOptions extends Camelize<DiscordBanOptions> {}
```
