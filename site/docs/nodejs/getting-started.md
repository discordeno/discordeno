---
sidebar_position: 1
---

# Getting Started

If you are reading this, you probably want to create a Discord bot with Discordeno or migrate from popular libraries
like Discord.js.

If this is going to be your first time making a bot, you should use Deno instead of Node.js. Although in some cases Deno
might not be suitable for you, because of missing packages or a code base which too large to migrate to a slightly
different language.

This guide will help you making your first Discord Bot using Node.js or even migrating your Bot from a other Library.

:::important Disclaimer

Some features are not documented yet. If you want to know more about them, kindly ask for help in the
[Discord Server](https://discord.gg/ddeno).

:::

## Why should I switch?

Discordeno was built with the purpose of being scalable, flexible and easy to use.

Libraries like `Discord.js` and `Eris` often have excessive caching behavior that can only be changed slightly without
breaking the entire library. There is a lack of customization and many nested classes, which makes it almost impossible
to edit the code without having unwanted side effects. Moreover scalability is only possible on a limited extend.

Discordeno has been kept plain and simple, which opens up a lot of opportunities for customization such as
`custom-caching (custom-property-caching)`, [`Standalone Rest`](../big-bot-guide/rest.md),
[`Gateway`](../big-bot-guide/gateway.md), [`Cache`](../big-bot-guide/cache.md) and more. Check the detailed advantages
[here](https://github.com/discordeno/discordeno#features).

This guide will also help you making your code more scalable and easier to maintain with bringing you closer to the
Discord API.

# Before you start

Before you start digging in this guide, you should have a solid understanding of `javascript`. If you are not familiar
with it, then you should take a look at some popular resources.

- [W3Schools Course](https://www.w3schools.com/js/DEFAULT.asp)
- [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.Info](https://javascript.info)

A basic understanding is of great importance in order to solve problems skillfully.
