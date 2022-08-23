---
sidebar_position: 1
---

# Step 1 - Create a Discord Application

To use the discord API, you must have a developer application. Luckily, you don't need to sign up for a special account
to create one. _You can skip this if you already have an application setup with your token in a `.env` file._

1. [Create an Application](https://discord.com/developers/applications) on the Developer Portal, name it something cool
   and pick a sweet icon!
2. Now, go and create a bot by clicking the **Bot** tab. Follow the prompts. Then you'll see a **Token** section, copy
   it.
3. Invite the bot to the server: You can use the built in url generator (under the bot tab) or use
   `https://discord.com/api/oauth2/authorize?client_id=APPLICATION_ID&permissions=8&scope=bot`, replacing
   `APPLICATION_ID` with your bot's application ID to invite your bot to a server with administrator privileges (only do
   this during development, we'll talk about permissions later).

:::important

Make sure you store your tokens in a file that is NOT deployed by adding it to a `.gitignore` file (if you're using Git,
use a similar file for other version management systems). An example of this would be in a `.env` containing:

```bash title=".env"
BOT_TOKEN="token"
```

**Don't share your bot token with anybody.**

:::

Now you've created an Application, but it will need some code in order for it to actually do anything. That's where
discordeno comes in!
