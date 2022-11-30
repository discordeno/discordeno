---
sidebar_position: 1
---

# Getting Started with the Event Handler

An event handler is essential to process the data, which Discord sends to you.

With a good implementation, you will have a nice code structure and thus have a good overview in long term.

Since the `EventEmitter` class is commonly used you probably already know it from other libraries.

Discordeno decided against it as it comes with several downsides which are mentioned below.

- It's easy to create memory leaks, when you add too many listeners or go carelessly with it.
- Many fragmented parts of event code complicate maintenance.
- ErrorHandling is difficult and debugging is harder when many listeners are open for the same events.

Performance plays a more important role than handling, however this event management system can be easily implemented
since it only needs a few changes in your code.

In the following we will show you, how to create an event manager, which is compatible with Discordeno's Client.

:::info template

You can also copy the
[`EventManager` from the template repo](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Managers/EventManager.js).

:::
