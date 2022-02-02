# Creating Events!

Woah! You are almost half way done with understanding all of Discordeno. Amazing
isn't it? Something you may have noticed in the last section was when the bot
started up you could see a bunch of messages like `Loaded X Commands` and such.
Let's jump into this part now and understand how event handling works in
Discordeno.

## What Is An Event?

An event in Discordeno is a function that can be called when a specific event
occurs. For the most part, events will usually be the ones that are available
from Discordeno. However, you can create your own custom events as well if you
wish.

## Understanding The Events

Go ahead and open up the `src/events/ready.ts` file. When you open this file,
you will see the code that is triggered on the `ready` event. Whenever the bot
completely starts up, Discordeno emits the `ready` event. This is when this code
will be run allowing you to log these messages.

```ts
import { botCache, cache } from "../../deps.ts";

botCache.eventHandlers.ready = function () {
  console.log(`Loaded ${botCache.arguments.size} Argument(s)`);
  console.log(`Loaded ${botCache.commands.size} Command(s)`);
  console.log(`Loaded ${Object.keys(botCache.eventHandlers).length} Event(s)`);
  console.log(`Loaded ${botCache.inhibitors.size} Inhibitor(s)`);
  console.log(`Loaded ${botCache.monitors.size} Monitor(s)`);
  console.log(`Loaded ${botCache.tasks.size} Task(s)`);

  console.log(
    `[READY] Bot is online and ready in ${cache.guilds.size} guild(s)!`,
  );
};
```

> **Note:** Some of the code from the ready.ts file was removed here to make it
> easier to understand.

Overall, this code is pretty self-explanatory. When the bot is ready, it logs
all these things to the console for you.

## Creating A Custom Event

Make a new file in the events folder called `discordLog.ts` that will send a
message to a discord channel whenever we get an error so we don't need to always
be watching the console to see errors. Once you made the file, go ahead and
paste the base event snippet below.

```ts
import { botCache } from "../../deps.ts";

botCache.eventHandlers.eventname = function () {
  // Your code goes here
};
```

- Change the event name to `discordLog`
- Go to `src/types/events.ts` and add in the following code so it looks like
  this:

```ts
// This interface is a placeholder that allows you to easily add on custom events for your need.
export interface CustomEvents extends EventHandlers {
  discordLog: (error: Error) => unknown;
}
```

Awesome, now we can get started on adding the code.

````ts
import { botCache, cache, sendMessage } from "../../deps.ts";
import { Embed } from "../utils/Embed.ts";
import { configs } from "../../configs.ts";
import { sendEmbed } from "../utils/helpers.ts";

botCache.eventHandlers.discordLog = function (error) {
  const embed = new Embed()
    .setDescription([
      "```ts",
      error,
      "```",
    ].join("\n"))
    .setTimestamp();

  // If the channel is not found cancel out
  if (!configs.channelIDs.errorChannelID) return;

  // Send the message
  return sendEmbed(errorChannel, embed);
};
````

Now that we have fully covered events, it would be a good time to get some
practice here. Feel free to make more events that you would like in your bot.

Once, you are ready, let's jump into creating some command inhibitors.
