---
sidebar_position: 2
---

# Getting Started

:::caution

This guide is being updated to better explain what discordeno does, how to properly write a bot, and use v13.

:::

Discordeno aims for a simple, easy and stress-free interaction with the Discord API. Always supporting the latest
version to ensure stability, consistency and the best developer experience. This guide serves as the purpose for
introducing Discordeno's (very) opinonated method of writing bots to new developers.

## Requirements

- The latest version of [Deno](https://deno.land/).
- A text editor (we like [Visual Studio Code](https://code.visualstudio.com/) with the
  [deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).)

## Creating your First Discord Application

To use the discord api, you must have an application setup. You can skip this if you already have one setup.

1. [Create an Application](https://discord.com/developers/applications) on the Developer Portal, name it something cool
   and pick a sweet icon!
2. After creating an application. Save the **Application ID.** Thats the unique identifier for your application, we'll
   use it later.
3. Now, go and create a bot by clicking the **Bot** tab. You will see a **Token** section, copy it into a
   `.gitignore`-ed file like `.env` in your project.
4. Invite the bot to the server: You can use the built in url generator (under the bot tab) or use
   `https://discord.com/api/oauth2/authorize?client_id=APPLICATION_ID&permissions=8&scope=bot`, replacing
   `APPLICATION_ID` with your bot's application ID to invite your bot to a server with administrator privleges (only do
   this during development).

Now you've created an Application but it will need some code in order for it to actually do anything. That's where
discordeno comes in!

:::important

Make sure you store your tokens in a file that is NOT deployed by adding it to the .gitignore file (like `.env`).
**Don't share your bot token with anybody.**

:::
