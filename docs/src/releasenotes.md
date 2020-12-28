# Discordeno v10 Release Notes

From breaking changes to small bug fixes to QoL improvements, this release has it all. This is Discordeno Next!

## Slash Commands and Interactions

A Slash Command is a command that you register for your application. It consists of a name, description, and a block of options, which you can think of like arguments to a function. 

An Interaction is the message that your application receives when a user uses a command.

Discordeno, from v10 or newer, has inbuilt support for both slash commands and interactions. For a quick start, check out our [official boilerplate for slash commands](https://github.com/discordeno/discordeno-slashbot-boilerplate).

![slash commands](https://media.discordapp.net/attachments/792215444106903562/793042919820099634/unknown.png)

## Getters for Structures

Getters are introduced in Discordeno v10 as a QoL improvement.

- v9 or before

```ts
import { sendMessage } from "discordeno";

await sendMessage("Channel ID", "Content");
...
```

- v10 or newer

```ts
messageObj.send("Content");
```

## Permission enums to Permission strings

This change is a breaking change, it increases consistency by enabling users to use consistent API throughout their code.

- v9 or before:

```ts
import { hasChannelPermissions, Permissions } from "discordeno";

await hasChannelPermissions(
    "Channel ID",
    "User ID",
    [Permissions.MANAGE_MESSAGES]
);
```

- v10 or newer:

```ts
import { hasChannelPermissions } from "discordeno";

await hasChannelPermissions("Channel ID", "User ID", ["MANAGE_MESSAGES"]);
```

## Removed Guild.channels and Guild.members

These changes were made to noticeably optimize memory. To properly explain these changes, let's take an example of a user in X number of guilds, previously, in v9 or before, the member object was cached X times. However, with the release of v10, it stores the member object only once, hence saving memory.

Similarly, `Guild.channels` is removed in v10 or newer. This is removed because it was storing duplicated values from `cache.channels`, and hence taking additional memory.

## Improved WebSocket Close Errors

- v9 or before:

```ts
import { createClient } from "discordeno";

createClient({
    token: "BOT TOKEN",
    // Invalid intents
    intents: [1234567890]
});

// throws: "Shard.ts: Error occurred that is not resumeable or able to be reconnected."
```

- v10 or later:

```ts
import { startBot } from "discordeno";

startBot({
    token: "BOT TOKEN",
    intents: [1234567890]
});

// throws: "[Invalid intent(s)] Sent an invalid intent for a Gateway Intent."
```

If you are already using Discordeno, you can update to `v10` by updating the import URL for Discordeno to the following, usually present in `deps.ts` file.
```
https://deno.land/x/discordeno@10.0.0/mod.ts
```
