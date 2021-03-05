# Creating Tasks

Phenomenal! Now that you have mastered inhibitors, let's move on to one of the
final parts, Tasks. A lot of times, you will want to do something over and over
again. To do this, you can use tasks. You could technically just do this with
`setInterval` but, with tasks you gain a little more advantage like having
reloadability. The functions that are run can be easily reloaded meaning, you
don't need to restart your whole bot just for little change.

## What is a Task?

A task is used to conduct a function every so often. For example, Discordeno
comes with a built in task called `botlists`. This task runs every so often and
updates your data in all the bot lists apis. Let's create a new task to really
understand the gist of it. Let's create a task that will run every 5 minutes
which will keep our cache clean and minimal allowing your bot to grow and scale
much larger without needing a much bigger server to host it on. Start by pasting
the following snippet below:

```ts
import { botCache } from "../../deps.ts";
import { Milliseconds } from "../utils/constants/time.ts";

botCache.tasks.set(`taskname`, {
  name: `taskname`,
  interval: Milliseconds.HOUR,
  execute: async function () {
    // This is where you put your code you want to run.
  },
});
```

## Understanding The Options

- `name`: The name property is just the name of the task. Useful for logs and
  such to tell you which task is running.
- `interval`: The amount of millisconds to wait before executing this function
  again.
- `execute`: The function to execute.

## What is Cache and Why Should We Sweep It?

Your bot's cache is the memory it is holding on to since it started. To
understand this slightly easier we have an example: when you buy a server to
host your bot on you can check how much RAM (memory) it has. That amount of
memory can be expensive $$$ so it is best to build a bot that does not use a ton
of memory. You can use this task to tell your bot to delete any memory it is
holding on to that is not necessary.

- Suppose we don't want to keep any presence cached.
- Remove any members from cache that have not been active in the last 30
  minutes.
- Removes any messages sent over 10 minutes ago.

## Adding Pseudo Code

```ts
import { botCache } from "../../deps.ts";
import { Milliseconds } from "../utils/constants/time.ts";

botCache.tasks.set(`taskname`, {
  name: `taskname`,
  interval: Milliseconds.HOUR,
  execute: async function () {
    // For every server, we will clean the cache

    // Delete presences from the bots cache and server caches.

    // Delete any member who has not been active in the last 30 minutes and is not currently in a voice channel

    // Delete any messages over 10 minutes old
  },
});
```

## Adding The Code

Now that we have a plan in place, let's add the code.

```ts
import { botCache, cache } from "../../deps.ts";
import { Milliseconds } from "../utils/constants/time.ts";

const MESSAGE_LIFETIME = Milliseconds.MINUTE * 10;
const MEMBER_LIFETIME = Milliseconds.MINUTE * 30;

botCache.tasks.set(`sweeper`, {
  name: `sweeper`,
  interval: Milliseconds.MINUTE * 5,
  execute: async function () {
    const now = Date.now();
    // Delete presences from the bots cache.
    cache.presences.clear();

    // For every server, we will clean the cache
    cache.guilds.forEach((guild) => {
      // Delete presences from the server caches.
      guild.presences.clear();
      // Delete any member who has not been active in the last 30 minutes and is not currently in a voice channel
    });

    // For ever, message we will delete if necessary
    cache.messages.forEach((message) => {
      // Delete any messages over 10 minutes old
      if (now - message.timestamp > MESSAGE_LIFETIME) {
        cache.messages.delete(message.id);
      }
    });
  },
});
```

Alrighty, we managed to add most of the code. But we hit a small obstacle. There
is no way to tell when the last time a member was active was. In order to
accomplish this we will need to add this functionality. No problem, let's get
cracking.

## Adding Member Activity Tracker

Let's go to the botCache in `cache.ts` file and add a `new Collection` that will
hold the member's id + server id as the key since a member can be in multiple
servers. The value for the map will be a timestamp showing when they were last
active. We will be able to use this check, how long ago they were last active.

```ts
memberLastActive:
new Collection<string, number>();
```

Now, let's go to our `messageCreate`, event and add 1 line to update this value.

```ts
botCache.memberLastActive.set(message.author.id, message.timestamp);
```

This will store the time when the message was sent by the member using their id.

## Cleaning Out Inactive Members

Now, we can get back to cleaning out the members from the cache. The final code
should look something like this:

```ts
import { botCache } from "../../mod.ts";
import { Milliseconds } from "../utils/constants/time.ts";
import { cache } from "../../deps.ts";

const MESSAGE_LIFETIME = Milliseconds.MINUTE * 10;
const MEMBER_LIFETIME = Milliseconds.MINUTE * 30;

botCache.tasks.set(`sweeper`, {
  name: `sweeper`,
  interval: Milliseconds.MINUTE * 5,
  execute: async function () {
    const now = Date.now();
    // Delete presences from the bots cache.
    cache.presences.clear();

    // For every guild, we will clean the cache
    cache.guilds.forEach((guild) => {
      // Delete presences from the guild caches.
      guild.presences.clear();
      // Delete any member who has not been active in the last 30 minutes and is not currently in a voice channel
      guild.members.forEach((member) => {
        // The user is currently active in a voice channel
        if (guild.voiceStates.has(member.user.id)) return;

        const lastActive = botCache.memberLastActive.get(member.user.id);
        // If the user is active recently
        if (lastActive && now - lastActive < MEMBER_LIFETIME) return;

        guild.members.delete(member.user.id);
        botCache.memberLastActive.delete(member.user.id);
      });
    });

    // For ever, message we will delete if necessary
    cache.messages.forEach((message) => {
      // Delete any messages over 10 minutes old
      if (now - message.timestamp > MESSAGE_LIFETIME) {
        cache.messages.delete(message.id);
      }
    });
  },
});
```

If you reload/restart your bot now, you will begin to see massive improvements
in cache/RAM usage. Feel free to take some time and customize this to your needs
for your bot. For example, in this case, I opted to keep voice states but if
your bot does not do anything voice related, you can save even more memory by
deleting voice states.

---

Remember, optimizing cache is a very difficult thing to do so don't worry if it
doesnt make too much sense. The main thing to take away from this guide is how
to create a function that runs every X amount of time. When your bot grows
enough where it reaches a point where you need to worry about optimzing the
cache, join the Discord server and we can chat.

Cheers 🎉

Thank you for reading this step by step guide to creating a Discord bot. There
are many more powerful things in Discordeno, but they take a little more
advanced skills to master. Once you have gone through all this, feel free to
jump into the advanced section of the guide to become an advanced level Discord
Bot Developer!
