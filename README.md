# Discordeno

Discord API library wrapper in Deno

[Discord Server](https://discord.gg/J4NqJ72)

## Bot Boilerplate Template / Frameworks

If you are just starting out, you can use the Discordeno Template repo to get the base of your bot pre-built for you. As other developers create other command frameworks for this library, those frameworks will be listed here:

**[Official Boilerplate](https://github.com/Skillz4Killz/Discordeno-bot-template):** This is a very minimalistic design for a boilerplate for your bot to get you started.

## Motivations/Features

This project began out of the desire to want to learn and enhance my developer skills. As I was building it, I encountered so many issues that other libraries have that I wanted to change in my library.

- **TYPESCRIPT:**
  - First class support for Typescript!
  - **STABILITY:**
    - One of the biggest issues with almost every library is stability. None of the libraries gave much love and attention to Typescript developers the way it deserves.
      - Discord.JS developers continues to make breaking changes(on "stable" version) to TS projects without bumping the MAJOR version causing headaches for TS developers.
      - Eris was the most stable when it comes to JS, but in regards to TS, I was personally maintaing the typings and this was just a hassle to try and maintain when very few others cared to keep it properly maintained.
      - Detritus was in fact the best library for TS, but once again it lacked in proper stability. It only had 1 master branch and no signs of a proper stable version where I would not have to worry about breaking changes.
- **SECURITY:**
  - Check all permissions necessary before sending a request to the API.
  - Prevent supporting self-bots and abusive behavior.
- **Functional API:**
  - This will overall make a cleaner and more performant API, while removing the headaches of extending built-in classes, and inheritance.
  - Avoid as many headaches and issues related to `class` and `this`
  - Avoid EventEmitter to not have potential of memory leaks or bot crashes because of too many listeners or other silly issues.
  - Avoid for loops, while loops etc...
- **MINIMALISTIC:**
  - Prevent as many "options" for the sake of customizability. Prefer defaults that Discord recommends.
- **DOCUMENTATION:**
  - All of Discord API Documentation available inside your VSC while you code.
  - The entire libraries documentation is automatically available to you throw intellisense.
- **LATEST AND GREATEST JAVASCRIPT:**
  - Backwards compatibility is the death of code. It causes clutter and uglyness to pile up and makes developers lazier.
  - There will be no such thing as backwards compatibility reasons in Discordeno.
  - We will always support the latest and greatest of JS. The end!
  - That said, we don't expect many things to be changing drastically after v1. As you can imagine Typescript allows the latest and greatest of JS so we will be ahead of the curve for years to come.
