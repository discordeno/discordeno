---
sidebar_position: 3
---

# Create Application

1. Go to the [Developer Portal](https://discord.com/developers/applications) and create a new application.
2. Navigate to the Section `Bot` and confirm with "Yes, do it!"
3. Now copy your token and save it under a safe environment.

:::caution Token Security

Keep your token safe, because it is like a password that grants access to your bot, which then can be used for mass
DMing, mass banning or any other kind of malicious activity.

:::

## Add your Bot to your Server

In order to use your Bot, it should be in a server where you can interact with it.

1. Go to the [Developer Portal](https://discord.com/developers/applications) and click on your previously created bot.
2. Click on `OAuth2` and there go to the `URL Generator`.
3. Select the `bot` and the `applications.commands` scope.
4. Scroll down and select the `Administrator` permission.
5. Copy the generated URL and open it in your browser.
6. Select your Server and click the invite button.

The bot should now have been added to your server and show as an offline user.
