---
sidebar_position: 1
---

# Step By Step Guide

THIS IS A WORK IN PROGRESS GUIDE USING THE NEW v13 OF DISCORDENO.

## Understanding The Goals of This Guide

This guide is a quick-paced walkthrough meant for big bot developers. It is expected that you have a decent amount of
understanding of how to code your bots.

## Is This Guide Meant For You?

If your goal is not to have a bot in millions of discord servers, please find another guide/library. Discordeno is
heavily opinionated towards optimizing for bots at scale. If you do not know what a Map or a Set is without having to
google it, you are at the wrong place.

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
