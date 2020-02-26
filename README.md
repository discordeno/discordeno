# Discordeno
Discord API library wrapper in Deno

[Discord Server](https://discord.gg/rFJzqex)

## TODO

- [Review compression of payloads with GZIP](https://discordapp.com/developers/docs/topics/gateway#sending-payloads-example-gateway-dispatch)
- Handle checking if guild is unavailable before taking guild related actions.

## Motivations/Features

This project began out of the desire to want to learn and enhance my developer skills. As I was building it, I encountered so many issues that other libraries have that I wanted to change in my library.

- **TYPESCRIPT:**
  - First class support for Typescript!
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
