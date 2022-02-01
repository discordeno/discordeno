# Contributing

- Read the [style guide](#style-guide).
- Ask for help on the [official Discord server](https://discord.gg/ddeno)
- If you are going to work on an issue, mention so in the issue comments before
  you start working on the issue.
- If you are going to work on a new feature, create an issue and discuss with
  other contributors before you start working on the feature.
- Abide by and heed to
  [Discord Developer Terms of Service](https://discord.com/developers/docs/legal)

## Submitting a Pull Request

- Give the PR a descriptive title using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Do not do unrelated changes (only do changes addressed in the title).
- Ensure there is a related issue and it is referenced in the pull request text.
- Ensure there are tests that cover the changes.
- Ensure all of the checks (lint and test) are passing.

## Style Guide

- File names shall use camel case.
- Comply with
  [these guidelines for inclusive code](https://chromium.googlesource.com/chromium/src/+/master/styleguide/inclusive_code.md).
- An exported function must not have more than 4 individual parameters, the rest
  arguments should be incorporated inside an object as a single parameter.
- Export all interfaces, types, and enums that are used for or inside an
  exported entity.
- Every exported entity must be accompanied by a Typedoc (JSDoc without explicit
  types) comment block. Ideally, we prefer single line comment block.
- Top-level functions should not use arrow syntax.
- Minimize dependencies (do not add a dependency unless it is absolutely
  necessary and has been discussed on the Discord Server).
- Do not make circular imports.
- Utilize functional API wherever possible and avoid usage of ES6 classes.
- Please follow the
  [guidelines for inclusive code](https://chromium.googlesource.com/chromium/src/+/master/styleguide/inclusive_code.md).

## Maintainer Guide

- Add related labels to issues and PRs when they get opened (do not close unlabeled issues/PRs).
- Only merge PRs using squash commits.
- Before merging a PR confirm that its complying with all requirements.

## Types Guide

- Must use camel case (same property name as in the docs just in camel case).
- Each field or property must be accompanied with a reasonable JSDoc comment
  right above its type definition.
- Must be placed inside of the types module (in `src/types` directory).

Example:

```ts
/** https://discord.com/developers/docs/resources/user#user-object */
export interface User {
  /** The user's id */
  id: string;
  /** The user's username, not unique across the platform */
  username: string;
  /** The user's 4-digit discord-tag */
  discriminator: string;
  /** The user's avatar hash */
  avatar: string | null;
  /** Whether the user belongs to an OAuth2 application */
  bot?: boolean;
  /** Whether the user is an Official Discord System user (part of the urgent message system) */
  system?: boolean;
  /** Whether the user has two factor enabled on their account */
  mfaEnabled?: boolean;
  /** The user's chosen language option */
  locale?: string;
  /** Whether the email on this account has been verified */
  verified?: boolean;
  /** The user's email */
  email?: string | null;
  /** The flags on a user's account */
  flags?: UserFlags;
  /** The type of Nitro subscription on a user's account */
  premiumType?: PremiumTypes;
  /** The public flags on a user's account */
  publicFlags?: UserFlags;
}
```
