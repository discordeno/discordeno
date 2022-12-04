---
sidebar_position: 2
---

# Creating an client

Let's review each choice and what it does.

- `owners`, You may specify the proprietors of the bot using this. The inhibitors make use of this.
- `prefix`, The string a user should use at the beginning of their message to identify it as a command to the bot. Only
  message commands can use this, and the parameter can be either a string or a function.
- `botMentionAsPrefix`, Determines whether a user's mention of a bot qualifies as a prefix.
- `ignoreBots`, Allow bots to execute commands.
- `defaultCooldown`, Defualt cooldown for all commands.
- `ignoreCooldown`, List of people who bypass cooldowns.
- `commandDir`, Path to the command directory used by the fileloader.
- `eventDir`, Path to the event directory used by the fileloader.
- `inhibitorDir`, Path to the inhibitor directory used by the fileloader.
- `prefixCaseSensitive`, Indicates whether or not the prefix is case-sensitive.
- `extras`, Extras that are used by your client, such as a database instance or a music player.

## Client Extras

When using discord.js we often do stuff like `client.musicplayer=player;` and in order to maintain this ease Amethyst
allows you to do `client.extras.musicplayer=player;`.

NOTE: Typing will not work on `client.extras`.

## Client Properties

```ts
  user: User;
  events: AmethystEvents;
  messageCollectors: AmethystCollection<string, MessageCollector>;
  componentCollectors: AmethystCollection<bigint, ComponentCollector>;
  reactionCollectors: AmethystCollection<bigint, ReactionCollector>;
  runningTasks: runningTasks;
  tasks: AmethystCollection<string, AmethystTask>;
  category: AmethystCollection<string, Category>;
  inhibitors: AmethystCollection<
    string,
    <T extends Command = Command>(
      bot: AmethystBot,
      command: T,
      options: { memberId?: bigint; channelId: bigint; guildId?: bigint }
    ) => true | AmethystError
  >;
  owners?: bigint[];
  botMentionAsPrefix?: boolean;
  prefixCaseSensitive?: boolean;
  defaultCooldown?: CommandCooldown;
  ignoreCooldown?: bigint[];
  guildOnly?: boolean;
  messageQuotedArguments?: boolean;
  ignoreBots?: boolean;
  dmOnly?: boolean;
  eventHandler: AmethystEventHandler;
  extras: any;
  prefix?:
    | string
    | string[]
    | ((bot: AmethystBot, message: Message) => Async<string | string[]>);

  on(name: string, callback: (...args: any) => unknown): void;
  once(name: string, callback: (...args: any) => unknown): void;

  amethystUtils: {
    awaitComponent(
        messageId: bigint,
        options?: ComponentCollectorOptions & { maxUsage?: number }
    ): Promise<Interaction[]>,
    awaitReaction(
        messageId: bigint,
        options?: ReactionCollectorOptions & { maxUsage?: number }
    ): Promise<AmethystReaction[]>,
    awaitMessage(
        memberId: bigint,
        channelId: bigint,
        options?: MessageCollectorOptions & { maxUsage?: number }
    ): Promise<Message[]>,
    createCommand(command: CommandOptions): void,
    createCategory(category: CategoryOptions): void,
    updateCategory(category: CategoryOptions): void,
    createTask(task: AmethystTask): void,
    clearTasks(): void,
    createInhibitor<T extends Command = Command>(
        name: string,
        inhibitor: (
        bot: AmethystBot,
        command: T,
        options?: { memberId?: bigint; guildId?: bigint; channelId: bigint }
        ) => true | AmethystError
    ): void,
    deleteInhibitor(name: string): void,
    updateSlashCommands(): void,
  }
```

## [Documentation](https://deno.land/x/amethyst@v4.2.0/mod.ts?s=AmethystBotOptions)
