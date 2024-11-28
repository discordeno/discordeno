---
sidebar_position: 8
---

# Frequently Asked Questions

## Does Discordeno Support TypeScript?

TypeScript is supported to the highest standard by Discordeno. In fact, it's built in TypeScript. But this isn't the main reason Discordeno is the ideal library for TypeScript programmers. I was experimenting with a lot of various things when I created this library, and automatic typings was one of them.

When I utilised other libraries, I frequently observed incorrect or troublesome typings. This is so that TypeScript won't alert the library developers because most of the Discord API typings aren't utilised by the libraries themselves.

It is quite unlikely that these typings would become wrong or outdated as a result of minor errors like forgetting to update typings because Discordeno utilises them as part of the rest process. Libraries occasionally add a property without also adding it to their typings. Because of this, TypeScript developers cannot use it, only JavaScript developers can. Typings are crucial for TypeScript developers. Typings are treated as a component of the code by Discordeno! A breaking change in typings is a breaking change for the library!

## How Stable Is Discordeno?

Stability is one of the main problems with practically every library (I have used). None of the libraries showed TypeScript developers the love and care that they deserve. Because breaking changes to typings occasionally occurred without producing a MAJOR bump, TypeScript projects would occasionally fail. As a result, production TypeScript bots would fail. At times, I was the only one keeping the typings up to date for that library. Some libraries that were older than 1.0 didn't even have a stable branch or version, so I didn't have to worry about them undergoing breaking changes.

The finest stability for TypeScript developers is one of my basic goals for this library. No matter how little, a change that impacts the public API qualifies as a breaking change. I don't care whether we reach version 500. As a library maintainer, you should never be scared to bump a MAJOR because it just involves a tiny modification or a type change because doing so will ruin the end user's experience.

## Why Doesn't Discordeno Use Classes or EventEmitter?

This is a design decision for the library itself. You can still use class on your bot if you want. In fact, I hope someone makes a framework/templates for this lib one day using classes so that devs have a choice on which style they prefer. Without trying to write an entire thesis statement on the reasons why I avoided Classes in this library, I will just link to
the best resources that I believe help explain it:

- [Really good article](https://dannyfritz.wordpress.com/2014/10/11/class-free-object-oriented-programming/)
- [Lecture by one of the developers who makes JavaScript](https://www.youtube.com/watch?v=PSGEjv3Tqo0)

In regards to EventEmitter, I believe a functional event API was a much better choice. EventEmitter at its core, is simply a set of functions that run when a certain event is emitted. In Discordeno, that function is executed instead of emitting some event to trigger it.

```typescript
// EventEmitter Example
EventEmitter.emit('guildCreate', guild)
// Discordeno Example
bot.events.guildCreate?.(bot, guild)
```

There isn't really any difference especially for users when they use it. One bad thing about EventEmitter is that if misused it can easily cause memory leaks. It is very easy to open yourself up to these memory leak issues. It has happened to me when I started coding as well. This is why I wanted Discordeno's implementation to help devs avoid the issues I had. It prevents anyone from having this as a potential issue. Another issue with EventEmitter is trying to update the code in those functions without having to deal with headaches left and right of removing and adding listeners. You don't need to worry about binding or not binding events. They are just pure functions.

In Discordeno, this is extremely simple; you just simply give it the new event handlers. For example:

```typescript
bot.events.guildCreate = newGuildCreateEventHandler
```

## Why Do You Have A Class for Collection If Classes Are Bad?

The Collection class is an exception in the library where a class was allowed. This is because Collection extends Map. The Map class is provided by JavaScript itself and is extremely fast. You can perform millions of operations a second with a Map. Maps are too useful to avoid and don't have downsides like EventEmitters do. The Collection class simply
adds on other functionality that Discordeno users felt they needed. Although I am against using classes whenever possible, I am also a big supporter of providing the best developer experience.
