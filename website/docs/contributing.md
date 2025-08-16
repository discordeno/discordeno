---
sidebar_position: 9
sidebar_label: Contributing Guide
---

# Contributing Guide

So, you want to contribute to Discordeno? Fantastic!

I can appreciate the struggle and obstacles that are in the way to contributing to Discordeno when you are coming from another library. Discordeno is a very different kind of beast so it may be hard to go through it. So let's get started breaking it down. This guide will continue being updated with more Q&A as future contributors have questions.

## Finding Something To Contribute To

If you are in a position where you want to contribute but are not sure what you can contribute, look no further than the GitHub issues marked with the [**good first issue**](https://github.com/discordeno/discordeno/issues?q=is%3Aissue+is%3Aopen+label%3Agood-first-issue) label. When an issue is marked with this label, it means that this is an easy issue to tackle and can be done by anyone.

To view all the issues with this label: https://github.com/discordeno/discordeno/issues?q=is%3Aissue+is%3Aopen+label%3Agood-first-issue

## Setting Up Coding Environment To Contribute

Alright then, by now you have something you want to contribute yourself or have found one of the issues you want to help close. Once your ready:

**One Time Steps:**

- Install [Node.js](https://nodejs.org/en) version 18+
- Install Yarn (`corepack enable`)
- [Fork the repo.](https://github.com/discordeno/discordeno/fork)
- Git clone the project on your local machine
- Run `yarn` to install the dependencies

**For Every Contribution:**

- Make a new branch
- Make your code changes
- Perform testing
- Push to the repo and make a pull request

## Testing

For every contribution you make you can run the `Unit` and `E2E`tests to make sure all the code is still running correctly

- yarn test:unit
- yarn test:e2e\*

\* You need to setup some environment variables to run this script, see below

### E2E environment requirement

The scripts `test:e2e` requires some additional setup. This is because it will run a complete test for the entire library connecting directly to discord to verify that the code is working correctly and can correctly handle discord messages / api requirements

You can do this only once and don't need to do this every time:

- Make a copy of the `.env.example` file and call it `.env` file.
- Fill the variables in the file
  - Put a test bot's token in the `DISCORD_TOKEN` env.
  - For the Guild id, you should make a server and enable the Community setting and invite this test bot there.

### Running test for Deno and Bun

Since discordeno supports Node.js but also Deno and Bun you can run tests for them too:

- Bun: `yarn test:bun-unit`
- Deno: `yarn test:deno-unit`

Keep in mind that running those will require you to have `Bun` and/or `Deno` installed based on what you run.

## Documentation / Website

If you want to contribute to the documentation you need some additional setup

- Run `yarn` to install the dependencies inside the root folder of the project
- Run `yarn release-build` to build the entire project
- Run `yarn build:doc` to generate the documentation from the comments in the code
- Run `yarn` inside the `website` folder to install the dependencies

Done this you are ready to start editing the code, you will find the documentation under the `website/docs` folder with `.md` and `.mdx`. We use `docusaurus` to manage the site and it does treat all `.md` and `.mdx` file like `.mdx` ones, so you will need to make sure you don't use invalid syntax, you can check out the [docusaurus documentation](https://docusaurus.io/docs/markdown-features/react) for more details.

In case you need to modify some React components you will find the code inside the `website/src` folder.

## Understanding Repo setup

### Yarn

As a package manager for the dependencies we use `yarn` on version 4 (`berry`). You can install it with the `corepack enable` command. Corepack is a feature that is built into node.js, however you might need to install it, in such cases you can run `npm install -g corepack`

### Turborepo

To manage the multiple packages we use a combination of yarn workspaces and turborepo. Turborepo is run by every script that you run from yarn in the root folder of the project, if you go inside a specific package, for example `packages/bot` it will run the local script and not turbo.

The workspaces are setup for all the folders inside `packages`. A few of the package are for the configuration of this repository, such as:

- `tsconfig` - Configures the base `tsconfig.json` for every package inside the turborepo project

Other node projects outside `packages` are not managed by turborepo and they require their own setup, an example is the website in `website/` that requires you to install its dependencies manually outside from the main dependencies that are used with the packages.

### lint-staged & Husky

The project is setup to have Husky to install after you run `yarn` in the root folder of the project and will setup 2 hooks:

- When you pull/merge: install the dependencies if they changed
- Before commit: Running lint-staged

lint-staged is configured in the `/package.json` file and will run

- [Biome](https://biomejs.dev) to format and lint the code

There will run automatically when `git` performs one of those actions (merge/commit), this might however slow down commit time as it requires some time to run `list-staged`

### Yarn scripts

There a bunch of scripts but we will list the most important ones

#### `yarn build`

This will compile the TypeScript code into Javascript using SWC, it will not compile the type definitions (`.d.ts`) files.

:::note
This will clear the previus build file creating a clean build.
:::

#### `yarn build:type`

This will invoke the Typescript compiler (tsc) to compile the type definitions (`.d.ts`) files

#### `yarn release-build`

This will run both the `build` script and `build:type` one.

#### `yarn check`

This will do all the checking, linting and formatting to make sure your code follows the linting and formatting rules in place.

Every time you make a commit a check will also run. If you disable this you should still run it manually before creating the pr

#### `yarn check:all`

This is a script that only exists in the root of the repository. It will check all the files in repo including examples, website, etc

#### `yarn test:unit`

This will run all the unit tests to make sure anything you changed, did not break any unexpected things.

#### `yarn test:unit-coverage`

This will run the unit tests and give you the coverage of them both in the console and in a `coverage` folder

#### `yarn test:deno-unit`

This will run all the unit tests like `yarn test:unit` but with Deno as the runtime instead of Node.js

:::note
This script requires Deno to be installed. See [deno install](https://docs.deno.com/runtime/manual) page for details
:::

#### `yarn test:bun-unit`

This will run all the unit tests like `yarn test:unit` and `yarn test:deno-unit` but with Bun as the runtime instead of Node.js or Deno

:::note
This script requires Bun to be installed. See [bun install](https://bun.sh/docs/installation) page for details
:::

#### `yarn test:integration`

This will run integration tests. Integration tests do not connect to discord and use fake data to verify that everything is working correctly.

#### `yarn test:test-type`

This will verify that the tests do not have type errors.

#### `yarn test:e2e`

This will run all the end to end tests to make sure anything you changed, did not break any unexpected things.

This takes much longer as these tests actually run across the network using the bot token you provided in the `.env` file. It makes many requests to test the entire library. This should not be spammed as your bot token has rate limits. Use once your code changes are finalized to make sure that everything is working properly before pushing.

:::note
This requires you have setup the required environment variables, see above for more details
:::

## Recommended code editor

- The recommended code editor is [Visual Studio code.](https://code.visualstudio.com)

## Notes

- If the contribution is relatively small go ahead and do it! If it is a larger change, I would highly recommend you read the guides we have on the website in order to understand our library better before undertaking such a big action.
- If an issue exists for the contribution you want to make, leave a comment on it so no one else begins working on it as well. If an issue does NOT exist for the contribution, then create an issue first before working on it to get some feedback to decide whether it is worth doing.
- Formatting and linting will be automatically handled by Husky and lint-staged. However, if it doesn't work you can format and lint by doing `yarn check`
- If you want to edit a docker app (rest proxy for example), the website or some examples you will need to run `yarn` to install the dependencies of those
