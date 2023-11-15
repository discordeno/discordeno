# Contributing Guide

So, you want to contribute to Discordeno? Fantastic!

I can appreciate the struggle and obstacles that are in the way to contributing to Discordeno when you are coming from another library. Discordeno is a very different kind of beast so it may be hard to go through it. So let's get started breaking it down. This guide will continue being updated with more Q&A as future contributors have questions.

## Finding Something To Contribute To

If you are in a position where you want to contribute but are not sure what you can contribute, look no further than the GitHub issues marked with the [**[HELP WANTED] good first issue**](https://github.com/discordeno/discordeno/issues?q=is%3Aopen+is%3Aissue+label%3A%22%5BHELP+WANTED%5D+good+first+issue%22) label. When an issue is marked with this label, it means that this is an easy issue to tackle and can be done by anyone.

To view all the issues with this label:

## Setting Up Coding Environment To Contribute

Alrighty then, by now you have something you want to contribute yourself or have found one of the issues you want to help close. Once your ready:

**One Time Steps:**

- Install Node.js
- [Fork the repo.](https://github.com/discordeno/discordeno/fork)
- Git clone the project.
- Make a copy of the `.env.example` file and call it `.env` file. Then put a test bot's token in there. For the Guild id, you should make a server and enable the Community setting and invite this test bot there.
- yarn
- yarn lint

**For Every Contribution:**

- Make a new branch
- Make your code changes now.
- yarn fmt
- yarn lint
- yarn test:unit
- yarn test:e2e
- Push to the repo and make a pull request.

## Understanding Yarn Scripts

### yarn fmt

This will format your code to match the rest of the codebase. This should be ran once you are ready to push and before making the pull request.

### yarn lint

This will do all the checking and linting to make sure your code is in a useable state. There is also one other key thing to note about this. When you change something in the `@discordeno/types` package, you can run `yarn lint` to rebuild all the types.

### yarn test:unit

This will run all the unit tests to make sure anything you changed, did not break any unexpected things.

### yarn test:e2e

This will run all the end to end tests to make sure anything you changed, did not break any unexpected things. This takes much longer as these tests actually run across the network using the bot token you provided in the .env file. It makes many requests to test the entire library. This should not be spammed as your bot token has rate limits. Use once your code changes are finalized to make sure that everything is working properly before pushing.

## Notes

- If the contribution is relatively small go ahead and do it! If it is a larger change, I would highly recommend you read the guides we have on the website in order to understand our library better before undertaking such a big action.
- If an issue exists for the contribution you want to make, leave a comment on it so no one else begins working on it as well. If an issue does NOT exist for the contribution, then create an issue first before working on it to get some feedback to decide whether it is worth doing.
