# Big Bot Guide

:::caution

Please note, this guide is a work in progress as it's being improved and updated to v13.

:::

This guide is meant to introduce you to the standard conventions when creating a scalable bot meant for millions of
servers using Discordeno. Discordeno is heavily opinionated to scale for large and popular bots; so you should already
have a good understanding of the methodology to creating a bot before starting this guide. If you don't already have
this knowlage, **we recommend starting with the [starter](/docs/starter/getting-started) guide first**, then come back
here.

If you would like to just get the code, we have a
[big bot template](https://github.com/discordeno/discordeno/blob/main/template/bigbot) ready for you to use; make sure
to follow the [setup instructions](https://github.com/discordeno/discordeno/tree/main/template/bigbot#setup).

## Why You Should Use Discordeno?

The best way I can describe why you should use Discordeno, is from the words of the biggest bot developers themselves.
After speaking to some of the developers of the biggest JS/TS bots, you begin to see a pattern of users unhappy with the
current state of JS/TS libraries. They are no longer able to help them scale easily and are starting to move away to
other libraries or having to make their own libraries because they need to be able to make their bot distributed.

The following quotes are from developers who have bot's in atleast 1 million+ discord servers.

- Flexibility like no other library.
  - One of the big bot developers found that when their bot got too big, Eris was just very painful to optimize.
    - "A pretty large hassle, I had to fork eris and modify it. There was a lot of interdependency on the values from
      caches that made it difficult to remove properties "safely" without searching the entire codebase"
  - When discovering how easy it was to do the same thing in Discordeno:
    - "the convenience of being able to do so puts confidence in me that the lib is versatile so it'd certainly draw me
      towards it"
- Scalability: Standalone Gateway, Rest, Event Handler, Commands, Cache and much more.
  - "All this sound like a dream (especially when you currently use eris)"

Discordeno provides you all the tools that you need to make bot development really easy. As the old saying goes, the
best way to learn to ride a bicycle is to actually try riding a bicycle. So let's try out Discordeno.
