# Discordeno Unit Test Guideline

Unit tests are MANDATORY!

Every time you create a new function in the library, you must also add a unit test for it. A PR should/will not be
merged without a valid unit test for it. If you are unable to create a unit test, please leave a comment in your PR
asking for help.

## Test Locally

You do not need to push to the github repo to have the CI do the tests for you. You can test them locally by doing the
following:

```shell
TOKEN=YOUR_TEST_TOKEN BOT_ID=YOUR_TEST_BOT_ID GUILD_ID=YOUR_TEST_GUILD_ID deno test --no-check -A tests/mod.ts
```

> You should use a test bot for the `TOKEN` and `BOT_ID`. You should use a community enabled server for the `GUILD_ID`.
> **Never use your main bot. Never use your main server**

## Ordering

The order of unit tests is very important. Please do not move/change the order of the tests unless you know what you are
doing. Certain tests depend on other previous tests. You may add a test but becareful where you add it.
