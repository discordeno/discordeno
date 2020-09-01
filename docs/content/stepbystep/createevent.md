---
title: "Creating Events!"
metaTitle: "Creating An Event | Discordeno"
metaDescription: "Let's create our very own bot with Discordeno!"
---

Woah! You are almost half way done with understanding all of Discordeno. Amazing isn't it? Something you may have noticed in the last section was when the bot started up you could see a bunch of messages like `Loaded X Commands` and such. Let's jump into this part now and understand how event handling works in Discordeno.

## What Is An Event?

An event in Discordeno is a function that can be called when a specific event occurs. For the most part, events will usually be the ones that are available from Discordeno. However, you can create your own custom events as well if you wish.

## Understanding The Events

Go ahead and open up the `src/events/ready.ts` file. When you open this file, you will see the code that is triggered on the `ready` event. Whenever the bot completely starts up, Discordeno emits the `ready` event. This is when this code will be run allowing you to log these messages.

```ts
import { botCache } from "../../mod.ts";
import { cache } from "https://x.nest.land/Discordeno@8.4.1/src/utils/cache.ts";
import logger from "https://x.nest.land/Discordeno@8.4.1/src/utils/logger.ts";

botCache.eventHandlers.ready = function () {
  logger.info(`Loaded ${botCache.arguments.size} Argument(s)`);
  logger.info(`Loaded ${botCache.commands.size} Command(s)`);
  logger.info(`Loaded ${Object.keys(botCache.eventHandlers).length} Event(s)`);
  logger.info(`Loaded ${botCache.inhibitors.size} Inhibitor(s)`);
  logger.info(`Loaded ${botCache.monitors.size} Monitor(s)`);
  logger.info(`Loaded ${botCache.tasks.size} Task(s)`);

  logger.success(
    `[READY] Bot is online and ready in ${cache.guilds.size} guild(s)!`,
  );
};
```

Overall, this code is pretty self-explanatory. When the bot is ready, it logs all these things to the console for you.

## Creating A Custom Event

Make a new file in the events folder called `discordLog.ts` that will send a message to a discord channel whenever we get an error so we don't need to always be watching the console to see errors. Once you made the file, go ahead and paste the base event snippet below.

```ts
import { botCache } from "../../mod.ts";

botCache.eventHandlers.eventname = function () {
  // Your code goes here
};
```

- Change the event name to `discordLog`
- Go to `src/types/events.ts` and add in the following code so it looks like this:

```ts
// This interface is a placeholder that allows you to easily add on custom events for your need.
export interface CustomEvents extends EventHandlers {
  discordLog: () => unknown;
}
```

Awesome, now we can get started on adding the code.

```ts
import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { cache } from "../../deps.ts";
import { configs } from "../../configs.ts";
import { sendMessage } from "https://x.nest.land/Discordeno@8.4.1/src/handlers/channel.ts";
import { sendEmbed } from "../utils/helpers.ts";

botCache.eventHandlers.discordLog = function (error) {
  const embed = new Embed()
    .setDescription([
      "```ts",
      error,
      "```",
    ].join("\n"))
    .setTimestamp();

  // Get the channel we need to send this error to
  const errorChannel = cache.channels.get(configs.channelIDs.errorChannelID);
  // If the channel is not found cancel out
  if (!errorChannel) return;

  // Send the message
  return sendEmbed(errorChannel, embed);
};
```

Now that we have fully covered events, it would be a good time to get some practice here. Feel free to make more events that you would like in your bot. The following is a list of all the events available to you by the library at the time of writing this guide. There may be more or some may have been removed. I'll try to keep this updated but either way, VSC will let you know through autocompletion what is and isn't available.

```ts
  botUpdate?: (user: UserPayload) => unknown;
  channelCreate?: (channel: Channel) => unknown;
  channelUpdate?: (channel: Channel, cachedChannel: Channel) => unknown;
  channelDelete?: (channel: Channel) => unknown;
  debug?: (args: DebugArg) => unknown;
  guildBanAdd?: (guild: Guild, user: Member | UserPayload) => unknown;
  guildBanRemove?: (guild: Guild, user: Member | UserPayload) => unknown;
  guildCreate?: (guild: Guild) => unknown;
  guildLoaded?: (guild: Guild) => unknown;
  guildUpdate?: (guild: Guild, changes: GuildUpdateChange[]) => unknown;
  guildDelete?: (guild: Guild) => unknown;
  guildEmojisUpdate?: (
    guild: Guild,
    emojis: Emoji[],
    cachedEmojis: Emoji[],
  ) => unknown;
  guildMemberAdd?: (guild: Guild, member: Member) => unknown;
  guildMemberRemove?: (guild: Guild, member: Member | UserPayload) => unknown;
  guildMemberUpdate?: (
    guild: Guild,
    member: Member,
    cachedMember?: Member,
  ) => unknown;
  heartbeat?: () => unknown;
  messageCreate?: (message: Message) => unknown;
  messageDelete?: (message: Message | PartialMessage) => unknown;
  messageUpdate?: (message: Message, cachedMessage: OldMessage) => unknown;
  nicknameUpdate?: (
    guild: Guild,
    member: Member,
    nickname: string,
    oldNickname?: string,
  ) => unknown;
  presenceUpdate?: (
    presence: PresenceUpdatePayload,
    oldPresence?: PresenceUpdatePayload,
  ) => unknown;
  raw?: (data: DiscordPayload) => unknown;
  rawGateway?: (data: unknown) => unknown;
  ready?: () => unknown;
  reactionAdd?: (
    message: Message | MessageReactionPayload,
    emoji: ReactionPayload,
    userID: string,
  ) => unknown;
  reactionRemove?: (
    message: Message | MessageReactionPayload,
    emoji: ReactionPayload,
    userID: string,
  ) => unknown;
  reactionRemoveAll?: (data: BaseMessageReactionPayload) => unknown;
  reactionRemoveEmoji?: (data: MessageReactionRemoveEmojiPayload) => unknown;
  roleCreate?: (guild: Guild, role: Role) => unknown;
  roleDelete?: (guild: Guild, role: Role) => unknown;
  roleUpdate?: (guild: Guild, role: Role, cachedRole: Role) => unknown;
  roleGained?: (guild: Guild, member: Member, roleID: string) => unknown;
  roleLost?: (guild: Guild, member: Member, roleID: string) => unknown;
  shardReady?: (shardID: number) => unknown;
  typingStart?: (data: TypingStartPayload) => unknown;
  voiceChannelJoin?: (member: Member, channelID: string) => unknown;
  voiceChannelLeave?: (member: Member, channelID: string) => unknown;
  voiceChannelSwitch?: (
    member: Member,
    channelID: string,
    oldChannelID: string,
  ) => unknown;
  voiceStateUpdate?: (
    member: Member,
    voiceState: VoiceStateUpdatePayload,
  ) => unknown;
  webhooksUpdate?: (channelID: string, guildID: string) => unknown;
```

Once, you are ready, let's jump into creating some command inhibitors.
