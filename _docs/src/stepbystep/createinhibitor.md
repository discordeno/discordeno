# Creating Inhibitors!

Woah! You are almost half way done with understanding all of Discordeno. Amazing
isn't it? Something you may have noticed in the last section was there were some
options that prevented some commands from running like `dmOnly` or the
permission options. We created a setting to prevent the monitor from running in
certain channels. What if we wanted to do prevent commands from happening? How
would we prevent commands from running?

## What is an Inhibitor?

Inhibitors are very similar to how monitors work. A monitor runs on every
message but an inhibitor runs on every command. Remember all those command
options like cooldown, permissions, permissionLevel, nsfw, etc... each and every
one of these options has an inhibitor that checks commands for these settings.

Let's create our own inhibitor that would prevent commands from being used if
the user is not a VIP user.

> **Note:** It is important to remember that everything below can be done with a
> simple permission level as well. We will create our own custom permission
> levels but for the purposes of this guide and to be able to learn about
> Inhibitors, we will be using an inhibitor.

## Creating the File

Let's start by creating a file inside the inhibitors folder called `boosted.ts`
and paste the following snippet of code:

```ts
import { botCache } from "../../deps.ts";

botCache.inhibitors.set(
  "inhibitorname",
  async function (message, command, guild) {
    // Your code goes here
  },
);
```

Inhibitors can take up to 3 arguments.

- `message`: The message object that triggered the command.
- `command`: The command object itself that was triggered.
- `guild`: The server guild object where this command was ran.

## Understanding How Inhibitors Function

To block a command you have to return a truthy value.

- **return true;** If you return true the inhibitor will block the execution of
  the command. To allow a command return a falsey value.
- **return false;** If you return false the inhibitor will not block the error.

```ts
// If the command is not VIP only we can allow this command to execute
if (!command.vipOnly) return false;

// The bot's support server
const guild = cache.guilds.get(configs.supportServerID);
// If the command author is not in the server they won't have the vip role
const member = message.member ||
  await getMember(guild.id, message.author.id).catch(console.error);
// Member doesn't exist so cancel the command
if (!member) {
  message.sendResponse(
    `Sorry, but you can not use this command until you become VIP. **Close the IRIS!!!**`,
  );
  return true;
}

// If the user has the vip role on the support server given by patreon allow the command
if (
  member.guilds.get(message.guildID)?.roles.includes(
    configs.roleIDs.patreonVIPRoleID,
  )
) {
  return false;
}

// Alert the user they don't have vip and can't use the command
message.sendResponse(
  `Sorry, but you can not use this command until you become a VIP. I'm sorry, Teal'c. We'll go to Disneyland next year. I promise.`,
);
// Cancel the command since the user does not have vip
return true;
```

## Updating Command Typings

Since we need a new option on our commands we need to add that. Open the
`src/types/commands.ts` file and add in the following

```ts
vipOnly?: boolean;
```

Once that is added, you can go into any command and mark them as vip only
commands.

## Challenges

Hell yes! We just got through the entire inhibitor section. You have now
mastered everything related to inhibitors.

You can now try and get a little more practice with inhibitors by trying to
challenge yourself and make your own inhibitors. Don't worry if you can't think
of any good use cases for inhibitors.

Majority of Discordeno bots do not use many custom inhibitors because most of
the necessary/important ones already come built for you in the inhibitors
folder.

Next we will try our hands on creating tasks.
