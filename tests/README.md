# Discordeno Unit Test Guideline

Unit tests are MANDATORY!

Every time you create a new function in the library, you must also add a unit
test for it. A PR should/will not be merged without a valid unit test for it. If
you are unable to create a unit test, please leave a comment in your PR asking
for help.

## Test Locally

You do not need to push to the github repo to have the CI do the tests for you.
You can test them locally by doing the following:

```shell
DISCORD_TOKEN=YOUR_BOT_TOKEN_HERE deno test --no-check -A tests/mod.ts
```

> Please note that the token you use should be for a trivial unused bot. Never
> use your main bot tokens for this.

## Ordering

The order of unit tests is very important. Please do not move/change the order
of the tests unless you know what you are doing. Certain tests depend on other
previous tests. You may add a test but becareful where you add it.

## Naming

Each function should have it's own separate file for it's tests. The file should
be organized under it's main category which will be the `[]` portion of the
tests name. For example, `[guild] create a new guild` will be found in
`tests/guilds/create_guild.ts`
