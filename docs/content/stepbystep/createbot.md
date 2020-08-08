---
title: "Creating The Bot!"
metaTitle: "Creating A Bot | Discordeno"
metaDescription: "Let's create our very own bot with Discordeno!"
---

Discordeno will help make Discord bot development much easier. Don't worry, as you go through this guide it will make a lot more sense.

## Creating The Bot!

> This guide is going to assume you already have the basic requirements to make a bot ready. This includes github, git, a code editor like Visual Studio Code. If you don't have these yet please prepare them first before going forward.

- First, create a Discordeno Bot using the [Generator Boilerplate](https://github.com/Skillz4Killz/Discordeno-bot-template). Give it any name you like. For the purpose of this guide we will call it, Stargate.

- Then `git clone https://github.com/Skillz4Killz/Stargate.git`

- When that is done, go ahead and open up the folder with VSC.
- Create a new file called `configs.ts`. Open the `configs.example.ts` file and copy everything over.

Let's take a minute to review all the options we have available to us.

### Configs File

The `configs.ts` file is where you will keep all your secret info you don't want to share with anyone else. As long as `.gitignore` file is ignoring configs.ts your configurations will be kept private!

```ts
export const configs = {
  token: "",
  prefix: "!",
  botListTokens: {
    DISCORD_BOT_ORG: "",
    BOTS_ON_DISCORD: "",
    DISCORD_BOT_LIST: "",
    BOTS_FOR_DISCORD: "",
    DISCORD_BOATS: "",
    DISCORD_BOTS_GG: "",
    DISCORD_BOTS_GROUP: "",
  },
  channelIDs: {
    missingTranslation: "",
  },
};
```

#### Token

First, add your bot token. This is **required** for the bot to start. Review the [instructions](https://discordeno.netlify.app/gettingstarted#creatingyourfirstdiscordbotapplication) if you have not made your token yet.

#### Prefix

The prefix is where you will set the default prefix for your bot. Don't worry, every server will be able to choose their own prefix but we need a default prefix to start.

#### Bot Lists Tokens

This section of the file is so you can easily have your bot's statistics updated on all the bot lists out there to help you grow your bot. The code is already written to handle this but you will need to do 3 things for each bot list.

1. Go to the bot list and add your bot to their website. (Each site has it's own instructions)
2. Create a token for yourself on each website and paste it in your configs.
3. Enjoy!

If you wish to customize the code, you will find the bot list tasks in the tasks folder. Don't worry we will discuss this when we get to the tasks section of the guide.

For now just remember, that Discordeno provides you a built in way to update most discord bot lists.

#### Channel IDs

The channelIDs section holds the useful for specific features to help give you alerts/notifications. For example, the `missingTranslation` channel will be where messages are sent alerting you that somewhere in your code you are trying to use a translation key that you never created.

When you get to around 25,000 Discord servers on your bot, you may want to convert these channel IDs to webhooks.

## It's Alive!

Oh my god! You now have a bot with a bunch of features already! You don't believe me? Well, seeing is believing, so start the bot.

1. Invite your bot to a discord server.
2. Open up the integrated terminal in VSC using **CTRL + `**. If you use a Mac, replace CTRL with CMD.
3. Run the script below:

```shell
deno run --allow-net --allow-read mod.ts
```

The first time you run it, you may see a lot of files being loaded. This is preparing all the magic behind the scene. Once it is ready, you will see something like this:

![image](https://i.imgur.com/TOXjLgh.png)

## Understanding What Discordeno Did

Discordeno includes these commands/folders as they are essential for any discord bot to have in order to meet the Discord Bot Best Practices. It also adds a few things that will help make some things easier to build a bot.

We will dive into these deeper in this guide. Let's take it step by step.
