---
sidebar_position: 6
---

# Design

In order to ensure long-term scalability and maintainability, the code structure is of enormous importance. In the
following, we show how such a code structure could look like.

The essential parts are a `CommandHandler/CommandManager`, `EventHandler/EventManager`, lots of `Structures` in order to
code faster and `Plugins`, where your different features will be, such as `Commands`, `DB Stuff`...

## Code Structure

We recommend following structure for your code:

```root
├index.js
├─Structures/
├─Managers/
├─events/
├─Plugins/
├── General/
│   ├── commands/
│   │   ├── ping.js
│   │   └── ...
├── Developer/
│   ├── commands/
│   │   ├── eval.js
│   │   └── ...
├─Util/
└── ...
```

The following explains why this structure is suitable. If you want to follow this guide further, you should create these
folders.

In the `Managers` folder the Managers will be added e.g. `CommandManager.js`, `EventManager.js`. Generally codes, which
manage the system.

While in the `Structures` folder mainly classes are added like `BaseCommand.js`, `CommandResponse.js`, `Embed.js`,
`Components.js`, which make it easier to add methods to objects.

The `events` folder will contain the event handlers such as `messageCreate.js`, `debug.js`

Your many useful features and categories end up in the `Plugins` folder, where they should be categorically divided into
many folders.

The `Util` folder contains functions or classes that help you convert certain things, such as timestamps, into a
human-readable format.

## CommandHandler & BaseCommand

The `CommandHandler` is the main class of the bot, which will handle all the commands and the events received from
Discord.

The `BaseCommand` is the base class of all commands, which will be extended with the`CommandResponse` class.

### Steps showed in the following Guide

- Loading commands from different plugins
- Deploying slash commands
- Handling `messageCreate` & `interactionCreate` events
- Command rate limit handling
- Handle `Interaction` & `Message` commands with the same code
- Validating user provided arguments
- Correct permission and error handling
- Hot reloading commands
- Creating message and interaction collectors

## EventHandler

You probably realized that Discordeno does not use an `EventEmitter` to fire the events, but your own event function is
fired.

There are ways to adapt to an `EventEmitter`, but we decided against it for the following reasons:

- It's easy to create memory leaks, when you add too many listeners or go carelessly with it.
- Many fragmented parts of event code complicate maintenance.
- ErrorHandling is difficult and debugging is harder when many listeners are open for the same events.

## Structures

Structures are essential to abstract larger parts of code in smaller ready-made methods and to modify them if necessary.

Example:

```js
class Command {
  static name = "ping";
  static aliases = ["pong"];
  static botPermission = ["SEND_EMBED_LINKS"];

  run(message, args) {
    // do something
  }
}
```

It would be annoying adding everytime the `botPermission` property to the class Command, when the Permission is used
from every Command, then it is unnecessary to add it, when you can extend the class.

It would be annoying to add the `botPermission` property to the command class every time the same permissions are used
by each command. Extending the class makes this extra step obsolete.

```js
class BaseCommand {
  constructor(client) {
    this.client = client;
    this.basePermission = ["SEND_EMBED_LINKS"];
  }
}

class Command extends BaseCommand {
  static name = "ping";
  static aliases = ["pong"];

  constructor(data) {
    super(data);
  }

  run(message, args) {
    // do something
  }
}
```

## Plugins

The plugins folder helps you categorize your code into many parts to give some structure.

Of course, this has many advantages, you have a much clearer code, you can debug problems much easier.

This also opens possibilities for open source contributions, since not all parts of the code have to be published in
order to add new plugins, since they are "independent".

There will be the main `Plugins` folder, which by default contains a `General` folder for all your base commands. The
`Plugins` folder will also contain all your other plugins.

## Error Handling

One of the most important things is how to handle errors. This is done to provide a user-friendly experience and to find
errors faster.

You should catch errors and log them in your logger so you can fix them later. There are several open source `Sentry`'s
that give you a good overview of the latest errors through a website.

Sometimes errors have a positive effect on maintainability and scalability.

In addition, handling errors caused by users is very important to increase transparency. If they don't know why the
error happened, then they'll be very surprised with what they did wrong and might even remove your bot from their
server.

## Caching

Normally libraries cache all the info they get, which can of course be helpful at the beginning to discover all
functionalities but later it turns out to be a resource-consuming method. Therefore, this way should be avoided.

Discordeno allows `Custom Caching` and even `Custom Property Caching` which gives you fine-grained control over the
caching of data. Normally you only need 20% of the data received by Discord, which makes caching unnecessary in most
cases.

There are also some `Filter` and `Sweeper` methods which help you to empty unused cache values.

## Cross Communication & Scaling

If you are running many different processes, such as a Welcomer API, communication is of central importance in order to
send or receive data, with which you can then perform certain actions.

Cross communication can be easily done with sockets or a TCP client.

This brings up this Structure:

```js
Bridge (Heart)
- Machine 1
   - Cluster [0-9]
- Machine 2
   - Cluster [10-18]
- Machine 3 -> Welcomer Api
- Machine 4 -> Dashboard
```

It's important to use something fast to have a proper "real time" communication.

Discordeno already offers many internal options for scaling bots, no matter what size.

As you scale, you will likely separate many parts of your bot and put them in separate processes, such as a
`RestManager`, a `Gateway Manager` etc.

This of course opens up a lot of possibilities:

- Zero downtime updates
- Global cache
- Synced rate limits

[Check the Github Readme for more information](https://github.com/discordeno/discordeno#features)

:::tip congratulations

You just learned how to design a scalable bot, let's get into implementing it with the next pages.

:::
