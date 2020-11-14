---
title: "FAQ"
metaTitle: "FAQ | Discordeno"
metaDescription: "Discordeno is a Third Party Deno Library for interacting with the Discord API."
---

##  Frequently Asked Questions

## Does Discordeno Support TypeScript?

Discordeno provides first class support for TypeScript! Since Deno provides support for TypeScript, that also comes into Discordeno. This means you don't need to compile TypeScript before you use it. However, this isn't really why Discordeno is the best library for TypeScript developers. When I developed this library, I was experimenting with a lot of different things and one of them was automated typings.

Whenever I used other libraries, I was always seeing typings being inaccurate or problematic. This is because in any Discord API library, the majority is not used by the library itself so TypeScript doesn't warn the library developers. This makes it extremely likely that those typings become inaccurate or out of date because of simple mistakes like forgetting to update typings. Sometimes libraries will add a property and forget to add that on their typings. This makes it usable for JavaScript developers but not for TypeScript devs. For TypeScript developers, typings are everything! So I asked myself how could I solve this in my own library because I didn't want to have to suffer these problems again. The best solution was to not have any typings for the module at all.

In Discordeno, there are no typings created/maintained manually. It is all done **automatically** by TypeScript because of the design decisions of the code itself. **When the code is changed, the typings are automatically updated.** Never again will you suffer the problems of other libraries forgetting to keep their typings up to date properly.

## If Discordeno Doesn't Have Typings, What Is The Types Folder?

The types folder is typings built for Discord API Payload not for this lib. Discordeno provides these typings to provide the best developer experience possible when you code.

## How Stable Is Discordeno?

One of the biggest issues with almost every library(I have used) is stability. None of the libraries gave much love and attention to TypeScript developers the way it deserves. Sometimes TypeScript projects would break because breaking changes to typings did not make a MAJOR bump so TypeScript bots in production would break. Sometimes I was personally maintaing the typings because no one else was for that lib. Some libs were pre 1.0 and didn't even have a stable branch/version where I would not have to worry about breaking changes.

This is why I made it one of my foundational goals of this library to have the best stability for TypeScript developers. No matter how small, a breaking change is a breaking change when it affects the public API. I could care less if we end up at version 500. Being afraid to bump a MAJOR because it's a small change or a typing change is a terrible decision as a library maintainer and destroys the experience for end users. Discordeno provides 2 separate versioning systems to provide you as much flexibility and stability as you like.

## What Do You Mean By 2 Separate Versioning Systems?

Discordeno will have releases that comply with SemVer. To use this system you will simply use the `v2.0.0` system in your version.

> Note: This means for every tiny bug fix/change you need to manually update the code every time. So if a new feature is added, you would need to bump the version in your code.

Each version is also available through a specific branch. For example v2 branch holds all the version 2 code. This branch is always updated whenever a MINOR or PATCH update is made that will NOT break your bots.

> Note: This means you never have to update your code EXCEPT when you are ready to bump to next MAJOR version. So if a new feature is added, it will be added automatically. If a small bug is fixed it will be automatic.

SemVer means more manual work for you to update code but a more secure module. Automated means almost no manual work for you to update code but a less secure module.

To understand that, SemVer makes it so you are using specific Release versions. In your code, you would do this by targeting the `..../Skillz4Killz/Discordeno/v4.0.0/...` in order to use it. Whenever I make a small bug fix or new feature that does not break your code it would be released in a new release such as today's release of v4.0.1. This means you have to manually update your code to get these latest improvements. Until you do, you may have bugs or possibly missing features. The good part about SemVer is that if I make a mistake that could potentially make the code worse, it's a lot easier to move back to a proper version with SemVer.

The automated version would just simply be installed as soon as you reloaded cache for deno because it uses the branch itself as its url `.../Skillz4Killz/Discordeno/v4/...` For example, when i start bots I use a script that reloads cache and restarts the bot making it so i am always using the latest code. Deno makes this possible because it can pull the latest code from any URL even github. So using Github branches to it's peak I create a branch for each version. These versions simply update automatically and you dont have to worry about updating. The only time you need to update is when you bump a MAJOR version like from v4 to v5. Because these may need you to make changes in your code. Note, even the good part about SemVer can be slightly removed by just locking a certain commit as well using this method.

At the end of the day, I think both systems can work and I am curious how everyone feels about them. I will be trying my best to maintain both systems.

## Why Doesn't Discordeno Use Classes or EventEmitter?

This is a design decision for the lib itself. You can still use class if you want on your bot. In fact, I hope someone makes a framework/boilerplate for this lib one day using classes so that devs have a choice on which style they prefer. Without trying to write an entire thesis statement on the reasons why I avoided Classes in this lib, I will just link to the best resources I believe help explain it.

- Really good article: https://dannyfritz.wordpress.com/2014/10/11/class-free-object-oriented-programming/
- Lecture by one of the developers who makes JavaScript: https://www.youtube.com/watch?v=PSGEjv3Tqo0

In regards to EventEmitter, I believe a functional event API was a much better choice. EventEmitter at it's core is simply just functions that run when a certain event is emitted. In Discordeno, that function is executed instead of emitting some event to trigger that function.

```typescript
// EventEmitter Example
EventEmitter.emit('guildCreate', guild);
// Discordeno Example
eventHandlers.guildCreate?.(guild);
```
There isn't really any difference especially for users when they use it. One bad thing about EventEmitter is that if misused it can cause memory leaks. It is very easy to open yourself up to these memory leak issues. It has happened to me when I started coding as well. This is why I wanted Discordeno's implementation to help devs avoid the issues I had. It prevents anyone from having this as a potential issue. Another issue with EventEmitter is trying to update the code in those functions without having to deal with headaches left and right of removing and adding listeners.

In Discordeno, this is extremely simple, you just simply give it the new event handlers.

```typescript
updateEventHandlers(newEventHandlers)
```

## Why Do You Have A Class for Collection If Classes Are Bad?

The Collection class is an exception in the library where a class was allowed. This is because Collection extends Map. The Map class is provided by JavaScript itself and is extremely fast. You can perform millions of operations a second with a Map. Maps are too useful to avoid and don't have downsides like EventEmitters do. The Collection class simply adds on other functionality that Discordeno users felt they needed. Although I am against using classes whenever possible, I am also a big supporter of providing the best developer experience.

## Why Are there no options in Discordeno?

Discordeno is not a library that handles code in the exact way every person wants it to. It is opinionated. Discordeno defaults to the Discord recommended options or the best options for majority of developers needs. For example, there is no option of fetching all members startup. This is a practice that Discord does not recommend or want users doing. By default, we don't support stuff like this. In Discordeno, we follow Discords recommended solution and it just works internally. The End! No fuss! No Muss! Just good stuff!

Now, I understand that there are times when it's necessary to be able to customize this and fetch them all. If you are advanced enough to need these options, you should be able to simply do it yourself. For most users, this is just an unnecessary option. The main module should remain minimalistic and easy to use for 99% of users.

## Why Do I See errors Like "MISSING_VIEW_CHANNEL" or "BOTS_HIGHEST_ROLE_TOO_LOW"?

Discordeno is the only library(that I have used), that has built in permission handling. A lot of bots get automatically banned by Discord because they forget to handle permissions. When bots don't check permissions and continue to send requests to the API, this leads to bots being banned. I have tried to request adding this feature into libraries but they were reluctant to do so because it would require the devs to maintain the library whenever an update was made by Discord.

Discordeno provides you specific keywords that you can use to send a clean response to the end user of your choosing. I have even seen some bots have hundreds of thousands of Missing Permission or Missing Access errors because libraries don't handle it. IMO, this is a crucial part of any good library as much as it is to handle rate limiting.

```typescript
import { Errors } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v4/types/errors.ts";
import { Message } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v4/structures/message.ts";

export function handleCommandError(message: Message, type: Errors) {
	switch (type) {
		case Errors.MISSING_MANAGE_NICKNAMES:
			return message.channel.sendMessage("The bot does not have the necessary permission to manage/edit other user's nicknames. Grant the **MANAGE_NICKNAME** permission to the bot and try again.");
		case Errors.MISSING_MANAGE_ROLES:
			// Note: i18n is not part of the library. This is just an example of how you could use i18n for custom error responses.
			return message.channel.sendMessage(i18n.translate(type));
	}
}
```
