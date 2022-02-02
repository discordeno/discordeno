# Creating A Command

Really great job. Now, lets dive into trying to use some of the commands and try
to make our very own command.

## Editing Invite Command

Let's first start by taking an existing command and slightly modifying it to
your needs. Let's use the `Invite` command as our example. When you open the
command, you will see something like this:

```ts
import { botCache } from "../../deps.ts";
import { createCommand } from "../utils/helpers.ts";

createCommand({
  name: "invite",
  execute: function (message) {
    // Replace the permission number at the end to request the permissions you wish to request. By default, this will request Admin perms.
    message.reply(
      `https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=8`,
    );
  },
});
```

Let's break this down. The first two lines are importing the necessary things
from their files so we can use them in this command. Don't worry if this doesn't
make sense, most of the time, this will all be done automatically for you if you
use a good code editor like Visual Studio Code. We create a command by doing:

```ts
createCommand({
  name: "commandname",
});
```

The command name here must be unique. If it is not unique, your commands will
not work properly as you wish. For example, you can't have 2 commands with the
`ping` name. In this case, our command is called `invite`.

Next is the `execute`. This is where the magic happens. This is the function
that is triggered when the command is ran by a user. In this case, the bot
simply sends a message to a channel where the command was ran and sends an
invite link. Let's take a minute and optimize this for our case. We don't
**NEED** admin permissions for our bot. Let's go to the
[permission calculator](https://discordapi.com/permissions.html) and figure out
the permissions we need for our bot.

Once you have decided which permissions you want to request, you can copy the
number and replace it here. For example, if we want `68640` as our permissions.
We can modify our command to be:

```ts
`https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=68640`,
```

Lastly, let's get rid of the comment there as now it is customized to our needs.

### Command Descriptions

Right now, if you were to go to Discord and type `!help invite`, you would see
quite a bit of information. But where does all that text come from? It's not in
this file. The description option tells Discordeno what to show the user when
they use the help command. In that help message, each command has a small
description next to it. The magic is happening because of Discordeno's
translations feature.

> Discordeno has built in multi-lingual support. You can support as many
> languages as you wish. We will learn more about languages when we create our
> own language but for now we just want to see how to customize the command.
> What we are going to do below isn't the correct way but it's the easy way to
> learn. We will see the correct way to do it when we get to translations.

Let's add a custom description to our invite command.

```ts
name: "invite",
description: "Like the bot? Use this link to add it to your server!",
```

🎉 It's that simple. So let's restart the bot and see how it changed. Use
**CTRL + C** to shut down the bot. Then run the command from earlier.

```shell
deno run -A --no-check mod.ts
```

To access this easily, most likely all you need to do is press the **UP ARROW**
key. Feel free to copy paste this if it doesn't work.

Once the bot is started try `!help invite` again and you will see the change! 🎉

## Command Aliases

Now, let's make this a little bit easier. What if we wanted this command to also
work with other names besides `invite`. For example, as a shortcut what if users
could just type `!inv` or as an alias type `!join`. Let's go ahead and set that
up. Add a `aliases` property, I usually recommend under the name property.
Aliases takes an array of strings that will be the names you would like to use
as aliases.

Let's add in the two aliases we wanted.

```ts
name: "invite",
aliases: ["inv", "join"],
description: "Like the bot? Use this link to add it to your server!",
```

Notice, I added 2 aliases here. You can add as many aliases as you like. If you
see a lot of users typing it wrong by accident you can add those typos as
aliases as well.

Let's start testing this out. But first, let's understand something important.

## Reloading

Okay, we need to first understand a core concept of developing discord bots. If
you had to restart your bot every time you made a tiny change, it would get
really annoying/tedious to do. Also, if you had restarted your bot 1000 times,
you would be in big trouble because Discord would ban your bot for 24 hours. The
bigger your bot gets, the faster it is to hit this limit of 1000 identify calls
to the Discord API.

To solve this issue, Discordeno provides you with a really cool `reload`
command. Whenever you make a change to any command, event, monitor, inhibitor,
task, language or argument you can simply reload it. You don't need to restart
your bot every time.

Now since we added the aliases above, let's test it out.

1. `!inv` this will not work
2. `!reload commands` this will reload the files and the aliases will be
   created.
3. `!inv` This will now work. 🎉

---

Perfect! You can take some time and customize the invite command to your needs
if you wish. For example, this is my bot's invite command.

![image](https://i.imgur.com/4WRFMtR.png)

Nice! You can now customize any of the commands from Discordeno as you wish.
Then we will continue to making our very own command so we can learn about all
the options that Discordeno gives us when it comes to making commands. As you
learn more in this guide, you can keep improving it.

If you get stuck, don't worry. When you are ready, let's continue to the next
step.

## Creating A Command

Let's make a command that will allow guild admins to give or take roles from a
member. Since, we are creating a `Moderation` command to give or take roles,
let's go ahead and create a category folder called `Moderation` and then create
a file called `role.ts`. Once the file is made, you can paste this following
base snippet to make our first command.

```ts
import { botCache } from "../../deps.ts";
import { PermissionLevels } from "../types/commands.ts";
import { createCommand } from "../utils/helpers.ts";

createCommand({
  name: "commandname",
  aliases: [],
  dmOnly: false,
  guildOnly: false,
  nsfw: false,
  permissionLevels: [PermissionLevels.MEMBER],
  botServerPermissions: [],
  botChannelPermissions: [],
  userServerPermissions: [],
  userChannelPermissions: [],
  description: "description",
  cooldown: {
    seconds: 0,
    allowedUses: 0,
  },
  arguments: [],
  execute: function (message, args, guild) {
    // The code for your command goes here
  },
});
```

## Understanding Command Options

Woah! We just added a massive file but most of that stuff is new to us. Don't
worry, let's break everything down step by step.

> **Note:** Any options that are not changed from the snippet above can actually
> be deleted as Discordeno will use the default option if you do not provide
> anything for that option. This can help keep your files cleaner.

Before we start, quickly update the command name and description.

## dmOnly & guildOnly Options

The `dmOnly` option is available if you want to make sure this command only runs
in a direct message. If this command is ran in a server, the command will
immediately exit out.

On the other hand, `guildOnly` is the opposite. To easily make sure that this
command is never allowed in a private message you can simple enable this.

If you want to allow a command to be able to run both in a server and in a
direct message, simply set them both to false.

Remember if you want either of them as false, you can simply delete them and it
will default to `false` allowing your bot to be cleaner and easier to read.
However, if your prefer keeping it you can.

For the purpose of this guide, we want our `role` command to only be run in a
server, so we can set `guildOnly` to be **true** and delete the `dmOnly` option.

## NSFW Option

NSFW stands for **Not Safe For Work**. One of Discord's rules is that you
enforce that NSFW content is sent only in NSFW channels. Discordeno has this
built in. You simply tell Discordeno, that you want a command to be considered
`nsfw` or not.

If this option is enabled, this command will only be able to be used in a `nsfw`
channel on a server.

> Discord does not consider Direct Messages as nsfw safe!

## Permission Level Option

Permission levels are a very powerful feature that easily allow you to set what
permission is required to run a command. We will cover this in detail, in a
separate section dedicated to permission levels. For now, just understand that
this will restrict certain users from using a command.

For example, the role command we only want to be used by moderators or server
admins.

Discordeno makes this pretty simple for us.

```ts
permissionLevels:
[PermissionLevels.MODERATOR, PermissionLevels.ADMIN];
```

We're not going to cover this in detail here because we will have an entire in
depth guide for permission levels. If you want to pause and learn it now, feel
free:
[Permission Levels Advanced Guide](https://discordeno.mod.land/advanced/permlevels.html)

## Permissions Check Options

Discordeno provides you 4 different types of permission handling that will be
done before the command function is executed. This allows you to make sure that
the permissions are available before running a command. For example, the role
command will require the bot to have **MANAGE ROLES** permission. This
permission comes from the server settings so we can require this in the
`botServerPermissions`.

```ts
botServerPermissions: ["MANAGE_ROLES"],
```

Discordeno will provide you easy to use auto-completion as soon as you type a
single letter or two. This will help make it easier to use and will warn you
when you make a typo and provide a wrong permission by accident.

We also want to make sure that the bot can send a message in this channel so
that we can respond to the user. This will check the correct permission
heirarchy to make sure that the bot can indeed send a message in this channel.

```ts
botChannelPermissions: ["SEND_MESSAGES"],
```

> **Note:** If you want to send an embed response, you should also make sure it
> has the `EMBED_LINKS` permission.

Already we have prevented two of the largest errors that can get our bot banned
if it is not checked. Discordeno handles this internally so you don't have to
worry about it.

Sometimes, you may also want to make sure that the user using the command has a
certain permission to run the command. To do this, you can use the
`userServerPermissions` or the `userChannelPermissions`.

## Cooldown Options

The cooldown options go hand in hand together.

- `seconds` is how long to make the user wait in seconds before they can use the
  command again. By default, there is no wait time aka 0 seconds.
- `allowedUses` is how many times a user is allowed to use a command before they
  are placed on cooldown.

Let's use our command as an example. We don't want someone to start spamming the
role command so we can add a cooldown of 60 seconds. However, this would mean
every time you give a role to someone, you would need to wait a whole minute to
give a role to someone else. This is where `allowedUses` shines! Let's set it to
5 so that a user can use this command 5 times in a row before being asked to
wait for 60 seconds.

```ts
cooldown: {
  seconds: 60,
  allowedUses: 5
},
```

> **Note:** It is important to understand the way these two interact. The
> cooldown starts as soon as the first command is used. So, if a user uses the
> role command 5 times in 59 seconds, they only have to wait 1 second to do
> another 5 times.

Let's give this a try shall we.

1. `!reload commands`
2. Spam the `!role` very quickly 6 times in under a minute.

## Arguments

Arguments is an incredibly powerful feature in Discordeno. Like Permission
Levels we will have an in depth look at arguments later in the guide. For now,
let's try and understand this in a simple manner.

- `name`: The name of the argument. Useful for when you need to alert the user X
  arg is missing or when you want to use the arg in your command.
- `type`: The type of the argument you would like. Defaults to string. Some of
  the ones available by default are "number", "string", "...string", "boolean",
  "subcommand", "member".
- `missing`: a function that will be run when this argument is not provided by
  the user or if the provided argument is not valid. By default, it does
  nothing.
- `required`: Whether this argument is required or optional. By default, this is
  true.
- `lowercase`: If the type is a string, this can forcibly lowercase the string.
- `literals`: If the type is string or subcommand you can provide literals. The
  argument MUST be exactly the same as the literals to be accepted. For example,
  if you want to make sure the argument is `a` or `b` only and not `c`.
- `defaultValue`: The default value for this argument/subcommand. If the user
  does not provide an argument or it is invalid, it can be defaulted to a
  certain value.

For our role command, we need a `member` and a `role`.

```ts
arguments:
[
  {
    name: "member",
    type: "member",
    missing: (message) => {
      message.reply(
        `You did not provide a member to give the role to. You can provide a @member mention, a member ID, or try using their nickname/username. The nickname/username will only work if they have been active in your server recently.`,
      );
    },
  },
  {
    name: "role",
    type: "role",
    missing: (message) => {
      message.reply(
        `You did not provide a role to give. You can provide a @role mention, a role ID, or it's name. If the role name did not work, try to use the **roleinfo** command to get the role ID.`,
      );
    },
  },
];
```

## Execute Option

The execute option is the code that will run when the command is triggered. The
execute function is passed 2 parameters that you can use in your command.

- `message`: The message object itself that triggered this command.
- `args`: The args that were provided by the user.

```ts
execute: function (message, args) {
  // The code that is to be executed goes here
}
```

> **Note:** I prefer writing code using the function keyword, but you can easily
> change to the fat arrow function if you prefer.

> ```ts
> execute:
> (message, args) => {
>   // The code that is to be executed goes here
> };
> ```

Let's start out by writing some pseudo-code (comments that will help us plan the
code).

```ts
execute: function (message, args) {
  // If this was the everyone role alert with a silly error

  // If this is a managed role (some bots role) we can't give/remove it alert with silly error

  // Get the bots highest role

  // Check if the bot has a role higher than the role that it will try to give.

  // If the role is too high alert the user.

  // Check the command author's highest role

  // If the author does not have a role high enough to give this role alert

  // If the user has this role already we should remove it

  // Add the role to the user.

  // Alert the user that used the command that the user has been give the role.
}
```

Nice! The plan for the code is complete. Now, let's add in the code.

The first thing we are going to try is to check if the role the user provided is
the same as the everyone role.

> **Note:** The everyone role ID is the same as the server guild ID.

To do this, we are going to want something like this:

```ts
if (args.role.id === message.guildId) {
  return message.reply(
    "The everyone role can not be given to anyone because everyone has the everyone role already. *Keep calm and let Carter figure it out*!",
  );
}
```

You might be seeing an error since we didn't provide the accurate typings for
the `args` parameter. The message and guild parameter is automated but the args
is dynamic depending on your `arguments` option for your command. So let's do
this real quick.

```ts
import { Role, Member } from "../../deps.ts";

// Lots of code here hidden so you can see the changes easily.

execute: function (message, args: RoleArgs, guild) {
  // If this was the everyone role alert with a silly error
  if (args.role.id === message.guildId) {
    return message.reply("Are you trying to make this person a super hero? Everyone has the everyone role. I can't give the everyone role to another user.");
  }

  // Lots of comments here hidden so you can see the changes easily.
}

// Put this at the end of the file.
interface RoleArgs {
  role: Role;
  member: Member;
}
```

Awesome! Let's keep going.

```ts
// Make the function asynchronous
execute: async function (message, args: RoleArgs, guild) {
  // If this was the everyone role alert with a silly error
  if (args.role.id === message.guildId) {
    return message.reply("I don't know if you noticed or not but I'm an extremely arrogant bot who tends to think all of his plans will work. But I can't give the everyone role to someone.");
  }

  // If this is a managed role(some bots role) we can't give/remove alert with silly error
  if (args.role.managed) {
    return message.reply("Dammit man, just 'cause I'm Scottish doesn't mean I can give your people managed roles.")
  }

  // Get the bots highest role
  const botsHighestRole = await highestRole(message.guildId, botID);

  // Check if the bot has a role higher than the role that it will try to give.
  const botIsHigher = await higherRolePosition(message.guildId, botsHighestRole.id, args.role.id)

  // If the role is too high alert the user.
  if (!botIsHigher) {
    return message.reply("Okay look, asking me give a role that is higher than my highest role is ridiculous! I am the first bot to admit I don't know who these people are nor do I care to. Look, if you'd like I could take you down the hall and just point at the people who annoy me more than the rest. But that's about as useful as I get.")
  }

  // Check the command author's highest role
  const membersHighestRole = await highestRole(message.guildId, message.author.id);

  // If the author does not have a role high enough to give this role alert
  if (!(await higherRolePosition(message.guildId, membersHighestRole.id, args.role.id))) {
    return message.reply("In my culture, whenever someone tries to give a role that is higher than their highest role, I would be well within my rights to dismember you.")
  }

  // If the user has this role already we should remove it
  if (message.member?.guilds.get(message.guildId)?.roles.includes(args.role.id)) {
    message.member.removeRole(message.guildId, args.role.id, `${message.author.tag} used the role command to remove this role.`)
    // Alert the user that used the command that the user has lost the role.
    return message.reply(`The role **${args.role.name}** has been removed from **${args.member.tag}**.`)
  }

  // Add the role to the user.
  message.member?.addRole(message.guildId, args.role.id)

  // Alert the user that used the command that the user has been give the role.
  return message.reply(`The role **${args.role.name}** has been added to **${args.member.tag}**.`)
}
```

The final version of the command should look something like this:

```ts
import {
  botCache,
  botID,
  higherRolePosition,
  highestRole,
  Member,
  Role,
} from "../../deps.ts";
import { PermissionLevels } from "../types/commands.ts";
import { createCommand } from "../utils/helpers.ts";

createCommand({
  name: "role",
  permissionLevels: [PermissionLevels.MODERATOR, PermissionLevels.ADMIN],
  botServerPermissions: ["MANAGE_ROLES"],
  botChannelPermissions: ["SEND_MESSAGES"],
  cooldown: {
    seconds: 60,
    allowedUses: 5,
  },
  arguments: [
    {
      name: "member",
      type: "member",
      missing: (message) => {
        message.reply(
          `You did not provide a member to give the role to. You can provide a @member mention, a member ID, or try using their nickname/username. The nickname/username will only work if they have been active in your server recently.`,
        );
      },
    },
    {
      name: "role",
      type: "role",
      missing: (message) => {
        message.reply(
          `You did not provide a role to give. You can provide a @role mention, a role ID, or it's name. If the role name did not work, try to use the **roleinfo** command to get the role ID.`,
        );
      },
    },
  ],
  execute: async function (message, args: RoleArgs) {
    // If this was the everyone role alert with a silly error
    if (args.role.id === message.guildId) {
      return message.reply(
        "I don't know if you noticed or not but I'm an extremely arrogant bot who tends to think all of his plans will work. But I can't give the everyone role to someone.",
      );
    }

    // If this is a managed role(some bots role) we can't give/remove alert with silly error
    if (args.role.managed) {
      return message.reply(
        "Dammit man, just 'cause I'm Scottish doesn't mean I can give your people managed roles.",
      );
    }

    // Get the bots highest role
    const botsHighestRole = await highestRole(message.guildId, botID);

    // Check if the bot has a role higher than the role that it will try to give. If the role is too high alert the user.
    if (
      !botsHighestRole || !(await higherRolePosition(
        message.guildId,
        botsHighestRole.id,
        args.role.id,
      ))
    ) {
      return message.reply(
        "Okay look, asking me give a role that is higher than my highest role is ridiculous! I am the first bot to admit I don't know who these people are nor do I care to. Look, if you'd like I could take you down the hall and just point at the people who annoy me more than the rest. But that's about as useful as I get.",
      );
    }

    // Check the command author's highest role
    const membersHighestRole = await highestRole(
      message.guildId,
      message.author.id,
    );

    // If the author does not have a role high enough to give this role alert
    if (
      !membersHighestRole ||
      !(await higherRolePosition(
        message.guildId,
        membersHighestRole.id,
        args.role.id,
      ))
    ) {
      return message.reply(
        "In my culture, whenever someone tries to give a role that is higher than their highest role, I would be well within my rights to dismember you.",
      );
    }

    // If the user has this role already we should remove it
    if (
      message.member?.guilds.get(message.guildId)?.roles.includes(args.role.id)
    ) {
      message.member.removeRole(
        message.guildId,
        args.role.id,
        `${message.author.username} used the role command to remove this role.`,
      );
      // Alert the user that used the command that the user has lost the role.
      return message.reply(
        `The role **${args.role.name}** has been removed from **${args.member.tag}**.`,
      );
    }

    // Add the role to the user.
    message.member?.addRole(
      message.guildId,
      args.role.id,
      `${message.author.username} used the role command to give this role.`,
    );

    // Alert the user that used the command that the user has been give the role.
    return message.reply(
      `The role **${args.role.name}** has been added to **${args.member.tag}**.`,
    );
  },
});

interface RoleArgs {
  role: Role;
  member: Member;
}
```

> **Note:** The response strings are a play on some funny Stargate (my favorite
> tv show) moments. Feel free to change as you wish to fit your bot's
> personality.

## Dynamic (Advanced Level) Command Creation

This is some advanced level super magical command creation skills. Discordeno
gives you the power to dynamically create commands. What that means is you can
write the code for one command but dynamically create like 50 commands using
that same code.

For example, in my main bot I have a lot of "fun" commands like `.hug` or
`.kiss` etc... All of these files have the exact same code except for 1 word
being the command name. Would it not be better to simply write the code once and
dynamically create every single command. Let me show you how that works.

- Create a file in the commands folder called `fun.ts` which will create all our
  fun commands.

```ts
import {
  avatarURL,
  botCache,
  chooseRandom,
  Member,
  sendMessage,
} from "../../deps.ts";
import {
  createCommand,
  createCommandAliases,
  sendEmbed,
} from "../utils/helpers.ts";
import { configs } from "../../configs.ts";
import { Embed } from "../utils/Embed.ts";
import { translate } from "../utils/i18next.ts";

const funCommandData = [
  { name: "bite", gifs: configs.gifs.bite },
  { name: "cuddle", gifs: configs.gifs.cuddle },
  { name: "dance", gifs: configs.gifs.dance },
  { name: "hug", gifs: configs.gifs.hug },
  { name: "kiss", gifs: configs.gifs.kiss },
  { name: "kanna", gifs: configs.gifs.kanna },
  { name: "kiss", gifs: configs.gifs.kiss },
  { name: "kitten", gifs: configs.gifs.kitten },
  { name: "lmao", gifs: configs.gifs.lmao, aliases: ["lol"] },
  { name: "pat", gifs: configs.gifs.pat },
  { name: "poke", gifs: configs.gifs.poke },
  { name: "pony", gifs: configs.gifs.pony },
  { name: "puppy", gifs: configs.gifs.puppy },
  { name: "raphtalia", gifs: configs.gifs.raphtalia },
  { name: "stargate", gifs: configs.gifs.stargate },
  { name: "supernatural", gifs: configs.gifs.supernatural },
  { name: "tickle", gifs: configs.gifs.tickle },
  { name: "zerotwo", gifs: configs.gifs.zerotwo },
];

funCommandData.forEach((data) => {
  botCache.commands.set({
    name: data.name,
    aliases: data.aliases,
    botChannelPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    cooldown: {
      seconds: 2,
    },
    arguments: [
      {
        name: "member",
        type: "member",
        required: false,
      },
    ],
    execute: function (message, args: FunArgs) {
      // If a member is provided use that otherwise set the member themself
      const member = args.member || message.member!;

      const type = member.user.id === message.author.id
        ? // Silly response like if user tries to hug themself
          "SELF"
        : // Response for when user tries to hug another user
          "OTHER";

      // Create an embed
      const embed = new Embed()
        .setAuthor(member.tag, avatarURL(member))
        .setDescription(
          translate(
            message.guildId,
            `commands/fun/${data.name}:${type}`,
            { mention: message.member!.mention, user: member.mention },
          ),
        )
        .setImage(chooseRandom(data.gifs));

      return sendEmbed(message.channelID, embed);
    },
  });
});

interface FunArgs {
  member?: Member;
}
```

> **Note:** This is only an example of dynamic command creation and won't work
> if you try using this code since you won't have the configs necessary. Since
> this is an advanced topic we're not going to cover this in more detail here,
> because we will have an entire in depth guide for dynamic command creation. If
> you want to pause and learn it now, feel free:
> [Dynamic Command Creation Advanced Guide](https://discordeno.mod.land/advanced/dynamiccommands.html)

Take a minute to realize what just happened. This has made 18 different unique
commands dynamically. In 1 file, using the same piece of code, we created so
many commands. You can easily add more commands to this. For example, if you
wanted to add weeb (animated) versions of these commands. Then you are at 36
commands with 1 simple command file.

**That ladies and gentleman is the power and magic of Discordeno!**

Take a minute to stand up, step back and make some room around you. Now start
dancing because you just acheived one of the most complex things in bot
development. You have already created about 36 commands!!!!

> **Note:** The command above uses translations which we will cover in depth in
> a later section of this guide.

Once you are ready, let's proceed to making our events.
