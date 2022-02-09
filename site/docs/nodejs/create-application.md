---
sidebar_position: 3
---

# Create Application

1. Go to the [Developer Portal](https://discord.com/developers/applications) and create a new application.
2. Navigate to the Section `Bot` and confirm with "Yes, do it!"
3. Now copy your token and save it under a safe environment.

### TOKEN SECURITY

Keep your Token secure, since its like a password for the bot, which can be used for mass dming, mass banning people or
doing any kind of malicious activity.

## Add your Bot to a Server

Inorder to use your Bot, it should be in a server, where you can interaction with it.

```
https://discord.com/api/oauth2/authorize?client_id=CLIENTID&permissions=8&scope=bot%20applications.commands
```

Replace the `CLIENTID` with your Bot's Client ID. Give that url in your Browser, Select your Server and click the invite
button. It should now be added to your server and show as a offline user.
