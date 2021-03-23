# Contributing

- Read the [style guide](#style-guide).
- Ask for help on the [official Discord server](https:)
- If you are going to work on an issue, mention so in the issue comments before
  you start working on the issue.
- If you are going to work on a new feature, create an issue and discuss with
  other contributors before you start working on the feature.
- Abide by and heed to
  [Discord Developer Terms of Service](https://discord.com/developers/docs/legal)

## Submitting a Pull Request

- Give the PR a descriptive title.

Examples of good PR title:

- fix(handlers/INTERACTION_CREATE): cache member object
- docs: improve wording
- feat: add cache manager module
- feat(helpers): add editGuild()
- refactor(ws/shard): remove redundant checks

Examples of bad PR title:

- fix #7123
- update docs
- fix bugs

- Ensure there is a related issue and it is referenced in the pull request text.
- Ensure there are tests that cover the changes.
- Ensure all of the checks (lint and test) are passing.

## Style Guide

- Use underscores as a separator in filenames.
- Comply with
  [these guidelines for inclusive code](https://chromium.googlesource.com/chromium/src/+/master/styleguide/inclusive_code.md).
- An exported function must not have more than 4 individual parameters, the rest
  arguments should be encorporated inside an object as a single parameter.
- Export all interfaces, types, and enums that are used for or inside an
  exported entity.
- Every exported entity must be accompanied by a Typedoc (JSDoc without explicit
  types) comment block. Ideally, we prefer single line comment block.
- Top-level functions should not use arrow syntax.
- Minimize dependencies; do not make circular imports.
- Utilize functional API wherever possible and avoid usage of ES6 classes.
- Follow
  [Convention Over Configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)
  wherever possible.
- Please follow the
  [guidelines for inclusive code](https://chromium.googlesource.com/chromium/src/+/master/styleguide/inclusive_code.md).

## Types Guide

1. Discordeno Types

- Must use camel case
- Do not allow `null`
- Each field or property must be accompanied with a reasonable JSDoc comment
  just above it.
- These typings should be kept in the file with the function.
- "Discordeno types" should be accompanied at the end of the file in which the
  type is used.

Example:

```ts
// Discordeno has utility type Camelize<T>, where T is an interface with keys in snake case.
// It can be used to "generate" corresponding "Discordeno type" from "Discord type".
// Example: export type BanOptions = Camelize<DiscordBanOptions>

export interface EditMemberOptions {
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

2. Discord Types

- Must use snake case (or whatever discord uses. Everything here should be in
  accordance with Discord API documentation)
- Each field or property must be accompanied with a reasonable JSDoc comment
  just above it.
- "Discord types" must be inside of the `types` module (src/types).
- The name of the type must be prefixed with `Discord`.

Example:

```ts
export interface DiscordMember {
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
