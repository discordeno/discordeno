# Subcommands Inside Subcommands!

One of the most powerful things about Discordeno is it's ability to have
infinite subcommands. A command can have a subcommand which can have it's own
subcommands... Mind not blown yet? Wait for it.... A `subcommand` is a full
`command`! What that means is, every subcommand has the full power and
flexibility of any command. BOOM! Mind blown!

A subcommand can have it's own settings for example, you can allow 1 subcommand
inside a guild and the other in dm. You can allow 1 subcommand to be NSFW and
the other to be SFW. You can have different permissions requirements for each.
You can set custom permission levels for each so that certain subcommands could
only be done by mods/admins. Each subcommand also has it's own arguments meaning
you can require different things for each and have the best experience possible
when making your bot.

## Basic Example

Let's start by understanding the `prefix` command which uses subcommands. It is
a good basic example, to help us understand how to create a subcommand.

```ts
import { botCache } from "../../deps.ts";
import { PermissionLevels } from "../types/commands.ts";
import {
  createCommand,
  createSubcommand,
  sendEmbed,
  sendResponse,
} from "../utils/helpers.ts";
import { parsePrefix } from "../monitors/commandHandler.ts";
import { Embed } from "../utils/Embed.ts";

// This command will only execute if there was no valid sub command: !prefix
createCommand({
  name: "prefix",
  arguments: [
    {
      name: "sub commmand",
      type: "subcommand",
      literals: ["set"],
    },
  ],
  guildOnly: true,
  permissionLevels: [PermissionLevels.MEMBER],
  execute: (message, args) => {
    const embed = new Embed()
      .setTitle("Prefix Information")
      .setDescription(`
            **Guild**: \`${message.guild?.name}\`
            **Current Prefix**: \`${parsePrefix(message.guildID)}\`
      `)
      .setTimestamp();

    sendEmbed(message.channelID, embed);
  },
});

// Create a subcommand for when users do !prefix set $
createSubcommand("prefix", {
  name: "set",
  arguments: [
    {
      name: "prefix",
      type: "string",
      required: true,
      missing: (message) => {
        sendResponse(message, `${message.member} please provid a prefix`);
      },
    },
  ],
  permissionLevels: [PermissionLevels.ADMIN],
  execute: (message, args) => {
    if (args.prefix.length > 3) {
      return sendResponse(message, "Prefix input too long");
    }

    const oldPrefix = parsePrefix(message.guildID);
    botCache.guildPrefixes.set(message.guildID, args.prefix);

    const embed = new Embed()
      .setTitle("Success, prefix was changed")
      .setDescription(`
        **Old Prefix**: \`${oldPrefix}\`
        **New Prefix**: \`${args.prefix}\`
      `)
      .setTimestamp();

    sendEmbed(message.channelID, embed);
  },
});
```

Let's separate this to understand what is happening here. The first half of the
code is the main command. This is like any other command. However, the important
thing is in the arguments we requested a subcommand!

```ts
createCommand({
  name: "prefix",
  arguments: [
    {
      name: "sub commmand",
      type: "subcommand",
      required: false,
    },
  ],
  guildOnly: true,
  permissionLevels: [PermissionLevels.MEMBER],
  execute: (message, args) => {
    const embed = new Embed()
      .setTitle("Prefix Information")
      .setDescription(`
            **Guild**: \`${message.guild?.name}\`
            **Current Prefix**: \`${parsePrefix(message.guildID)}\`
      `)
      .setTimestamp();

    sendEmbed(message.channelID, embed);
  },
});
```

That was just a basic command. Now, we can create our subcommands:

```ts
// Create a subcommand for when users do !prefix set $
createSubcommand("prefix", {
  name: "set",
  arguments: [
    {
      name: "prefix",
      type: "string",
      required: true,
      missing: (message) => {
        sendResponse(message, `${message.member} please provid a prefix`);
      },
    },
  ],
  permissionLevels: [PermissionLevels.ADMIN],
  execute: (message, args) => {
    if (args.prefix.length > 3) {
      return sendResponse(message, "Prefix input too long");
    }

    const oldPrefix = parsePrefix(message.guildID);
    botCache.guildPrefixes.set(message.guildID, args.prefix);

    const embed = new Embed()
      .setTitle("Success, prefix was changed")
      .setDescription(`
        **Old Prefix**: \`${oldPrefix}\`
        **New Prefix**: \`${args.prefix}\`
      `)
      .setTimestamp();

    sendEmbed(message.channelID, embed);
  },
});
```

`createSubcommand` takes 2 arguments. The first is the command name and the
second is a full Command object. The command is just like any other command you
will make. You can customize this as you like as you would any other.

What this does is it creates a subcommand in the `prefix` command. This
subcommand will be called `set` so the user will have to type `!prefix set` in
order to trigger this command. This subcommand also takes a required argument
that will be a string. In this case, that means the user has to type something
like `!prefix set $` to change their prefix.

_POP QUIZ TIME_

Alright, that sounds good so far. Now let's take a step back. What would happen
if the user typed `!prefix` without the `set` keyword? This would trigger the
main commands execute. Did you notice that in the main command the subcommand
argument has `required: false`. This makes it so that the user can execute a
command without a subcommand.

## Default Subcommands

On occassion you may want to trigger a default subcommand. This is very simple.
In your subcommand argument, just set the defaultValue as the default subcommand
you wish to trigger.

```ts
arguments:
[
  {
    name: "subcommand",
    type: "subcommand",
    defaultValue: "set",
    required: false,
  },
];
```

If the user now typed `!prefix`, it would automatically execute the `prefix set`
command. Using a default subcommand isn't so helpful in the prefix command but
imagine other commands where you may want to list the items to the user. For
example, if you had a reactiorole command.

```shell
!reactionroles create
!reactionroles delete
!reactionroles edit
!reactionroles list
```

This is where the default subcommands can shine, making it easier for your users
to trigger the commands they want.

## Subcommand In A Subcommand

Now, let's see how crazy we can get with this. What if we wanted a subcommand
inside our subcommand. Is that possible? What did Bob The Builder always say?
**YES WE CAN!!!**

This is really helpful when you are creating a `settings` command which can help
users configure your bot. You might have a bot like mine with 300 different
features and 1000 different settings. For this, you will want the power and
flexibility of Discordeno!

```shell
!settings feedback suggestions on
!settings feedback suggestions channel #channel
!settings welcome channel #channel
!settings welcome message Welcome To The Server! %user%
!settings gooodbye message %user% has left
!settings welcome channel #channel
!settings gooodbye channel #channel
```

To create a subcommand inside a subcommand, `name` in the createSubcommand()
function must be as follows:

```ts
createSubcommand("settings", { name: "feedback" })
createSubcommand("settings-feedback" { name: "suggestions" })
createSubccomand("settings-feedback", { name: "channel" })

createSubcommand("settings", { name: "welcome" })
createSubcommand("settings-welcome", { name: "channel" })
createSubcommand("settings-welcome", { name: "message" })
createSubcommand("settings-goodbye", { name: "channel" })
createSubcommand("settings-goodbye", { name: "message" })
```

You can nest subcommands inside subcommands to provide the functionality to the
user. Before, I was able to do this, my settings command was literally thousands
of lines long and I had headaches just wanting to open it. Trying to handle
1000s of different settings was a huge pain. So now, I have subcommands inside
subcommands. Why? Because you can **separate subcommands into separate
files**!!! That's right, those thousands of lines of code now are modularized
making maintainability much better. There are a lot less chances of bugs
arising. Adding/removing/modifying settings is also incredibly simpler.

## Subcommands Also Have Aliases

Another powerful part about subcommands is that they also have their own
aliases. This means you can create different ways to trigger a subcommand. For
example, earlier we saw a subcommand `suggestions` of another subcommand
`feedback` of a command `settings`. What if we wanted to allow users to type
`ideas` for `suggestions`? Let's add some aliases to the subcommand to see the
magic!

```ts
createSubcommand("settings-feedback", {
  name: "suggestions",
  aliases: ["ideas", "sugg", "s"],
  // The rest of the command stuff below here!
});
```

---

**THE POWER AND MAGIC OF DISCORDENO AT YOUR FINGERTIPS!**
