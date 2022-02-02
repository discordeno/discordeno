# Migrating

## Migrating from Discord.js

This migration guide is not intended to discredit Discord.js authors/maintainers
or Discord.js itself. In fact, Discord.js is the most popular Node.js library,
admired and praised by a lot of JavaScript developers.

## Finding an Open-Source Discord Bot

For the purposes of this guide, I wanted to find a moderation bot that is
totally open source to show an example of how to convert the bot to Discordeno.
Trying to find one was not easy as most bot's were not using the latest
Discord.JS version 12. Trying to find one that was using TypeScript made it even
more difficult. My next best solution was to find a moderation bot that was
recently updated(showing it is maintained or recently built). The best one I
could find was [Zodiac Bot](https://github.com/Nukestye/Zodiac).

For the purposes of this guide, I will be using the current
[latest commit](https://github.com/Nukestye/Zodiac/tree/213891a38af1b7ecbd068b661ef9062ab58cc818)

## Preparations

- First, create a Discordeno Bot using the
  [Generator Template](https://github.com/discordeno/template) I will name
  it Zodiac.

- Then `git clone https://github.com/Skillz4Killz/Zodiac.git`

Now that I had the repository cloned, I could begin. Note that although the bot
we are converting is built in JavaScript, I converted all code to TypeScript in
this Guide as Discordeno is designed to be the best lib for TypeScript
developers.

Time to get started!

## Converting main.js (index file)

The first thing is to convert the `main.js` file which would be the app.js or
index.js file. This is the file that is run to start your bot. In this case, the
bot developer chose `main.js`. In Deno, the initial file is named `mod.ts` so we
can go ahead and opt for the Deno pattern. Note: there is already a `mod.ts`
file created and prebuilt entirely using the Generator.

Current Discord.JS Code:

```js
/* Keeping this to shoutout/credit the original author <3
* @author: nukestye
*/

const config = require("./config.json");
const fs = require("fs");
const log = console.log;

// Setting up the way to get commands
const { CommandoClient } = require("discord.js-commando");
const path = require("path");

// reading events
fs.readdir("./src/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const eventFunction = require(`./src/events/${file}`);
    if (eventFunction.disabled) return;
    const event = eventFunction.event || file.split(".")[0];
    const emitter = (typeof eventFunction.emitter === "string"
      ? client[eventFunction.emitter]
      : eventFunction.emitter) || client;
    const { once } = eventFunction;
    try {
      emitter[
        once
          ? "once"
          : "on"
      ](event, (...args) => eventFunction.run(...args));
    } catch (error) {
      console.error(error.stack);
    }
  });
});

const client = global.client = new CommandoClient({
  commandPrefix: `${config.prefix}`,
  owner: `${config.owner}`,
  invite: `${config.discord}`,
  unknownCommandResponse: false,
});

// Registing the commands
client.registry
  .registerDefaultTypes()
  // The different fields for cmds
  .registerGroups([
    ["mod", "Moderation Commands"],
    ["public", "Public Commands"],
  ])
  .registerDefaultGroups()
  // Basic cmds can be disabled like {"cmd: false"}
  .registerDefaultCommands()
  // commands in "/src/commands" will be counted
  .registerCommandsIn(path.join(__dirname, "/src/commands"));

// list of activities that the bot goes through
const activityArray = [`${config.prefix}help | `];
// Bot lanuch code
client.once("ready", () => {
  log(`Logged in as ${client.user.tag} in ${client.guilds.size} guild(s)!`);
  setInterval(() => {
    const index = Math.floor(Math.random() * (activityArray.length)); // generates a random number between 1 and the length of the activities array list
    client.user.setActivity(
      activityArray[index],
      {
        type: "PLAYING",
      },
    ); // sets bot"s activities to one of the phrases in the arraylist.
  }, 5000); // updates every 10000ms = 10s
});
// If an error print it out
client.on("error", console.error);

// Login in using the token in config
client.login(config.env.TOKEN);
```

Discordeno Version:

```ts
import { botCache, Intents } from "./deps.ts";
import { configs } from "./configs.ts";
import { importDirectory } from "./src/utils/helpers.ts";
import { loadLanguages } from "./src/utils/i18next.ts";

console.info(
  "Beginning Bot Startup Process. This can take a little bit depending on your system. Loading now...",
);

// Always require these files be processed before anything else
await Promise.all([
  "./src/customizations/structures",
].map(
  (path) => importDirectory(Deno.realPathSync(path)),
));

// Forces deno to read all the files which will fill the commands/inhibitors cache etc.
await Promise.all(
  [
    "./src/commands",
    "./src/inhibitors",
    "./src/events",
    "./src/arguments",
    "./src/monitors",
    "./src/tasks",
    "./src/permissionLevels",
    "./src/events",
  ].map(
    (path) => importDirectory(Deno.realPathSync(path)),
  ),
);

// Loads languages
await loadLanguages();
await import("./src/database/database.ts");

startBot({
  token: configs.token,
  // Pick the intents you wish to have for your bot.
  // For instance, to work with guild message reactions, you will have to pass the Intents.GUILD_MESSAGE_REACTIONS intent to the array.
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
  // These are all your event handler functions. Imported from the events folder
  eventHandlers: botCache.eventHandlers,
});
```

Something we haven't converted yet from the `main.js` files is the event
listeners. To do that, we will open up the events folder and find the
corresponding event or create it if necessary. In this case, we have the `ready`
event and there is already a `ready.ts` file. We can just use that.

In our `ready.ts` file we can add the `ready` event listener.

```ts
import {
  ActivityType,
  botCache,
  cache,
  chooseRandom,
  editBotsStatus,
  StatusTypes,
} from "../../deps.ts";
import { registerTasks } from "./../utils/taskHelper.ts";

botCache.eventHandlers.ready = function () {
  editBotsStatus(
    StatusTypes.DoNotDisturb,
    "Discordeno Best Lib",
    ActivityType.Game,
  );

  console.log(`Loaded ${botCache.arguments.size} Argument(s)`);
  console.log(`Loaded ${botCache.commands.size} Command(s)`);
  console.log(`Loaded ${Object.keys(botCache.eventHandlers).length} Event(s)`);
  console.log(`Loaded ${botCache.inhibitors.size} Inhibitor(s)`);
  console.log(`Loaded ${botCache.monitors.size} Monitor(s)`);
  console.log(`Loaded ${botCache.tasks.size} Task(s)`);

  registerTasks();

  console.log(
    `[READY] Bot is online and ready in ${cache.guilds.size} guild(s)!`,
  );

  // list of activities that the bot goes through
  const activityArray = [`${configs.prefix}help | `];
  setInterval(() => {
    editBotsStatus(
      StatusType.Online,
      chooseRandom(activityArray),
      ActivityType.Game,
    );
  }, 5000);
};
```

To understand this code, we are setting a function to be run when the bot is
`ready`. Then the bot will edit the bots status every 5 seconds. Notice, that
Discordeno provides a nice clean util function to choose a random item from an
array. You also have beautiful enums provided that prevent you from making any
typos/mistakes.

We have now converted the entire `main.js` file, in a matter of seconds. The
Discordeno official generator took care of the majority of workload and we just
modified the `ready.ts` file.

`Note:` I did remove some generally well known "bad practices" such as global
vars and such. Overall, you will see the functionality of the project will not
change as we progress through this guide.

## Converting Commands

The first command in the commands folder is the `addRole` command.

This is the code from the bot:

```ts
// Getting the 'Command' features from Commando
const { Command } = require("discord.js-commando");

// Code for the command
module.exports = class addRoleCommand extends Command {
  constructor(client) {
    super(client, {
      // name of the command, must be in lowercase
      name: "addrole",
      // other ways to call the command, must be in lowercase
      aliases: ["role"],
      // command group its part of
      group: "mod",
      // name within the command group, must be in lowercase
      memberName: "addrole",
      // Is the description used for 'help' command
      description: "Adds mentioned role to mentioned user.",
      // Prevents it from being used in dms
      guildOnly: true,
      // Permissions, list found here > `discord.js.org/#/docs/main/11.5.1/class/Permissions?scrollTo=s-FLAGS`
      clientPermissions: ["ADMINISTRATOR", "MANAGE_ROLES"],
      userPermissions: ["MANAGE_ROLES"],
      // Prevents anyone other than owner to use the command
      ownerOnly: false,
    });
  }

  // Run code goes here
  run(message) {
    const user = message.mentions.members.first();
    const roleToAdd = message.mentions.roles.first();

    // checking to see if the user has the role or not
    if (!(user.roles.find((r) => r.name === roleToAdd.name))) {
      user.addRole(roleToAdd);
      message.channel.send(`${user} has been given the role: ${roleToAdd.name}`)
        .then((msg) => {
          msg.delete(5000);
        });
    } else {
      message.channel.send(`${user} already has the role: ${roleToAdd.name}`);
    }

    // console.error(user, roleToAdd, message.member.roles.find(r => r.name === roleToAdd));
  }
};
```

This is how to do it with Discordeno:

```ts
import { createCommand } from "./../../utils/helpers.ts";

createCommand({
  name: "role",
  // Oher ways to call the command
  aliases: ["addrole"],
  // Is the description used for 'help' command
  description: "Adds mentioned role to mentioned user.",
  // Prevents it from being used in dms
  guildOnly: true,
  botServerPermissions: ["ADMINISTRATOR", "MANAGE_ROLES"],
  userServerPermissions: ["MANAGE_ROLES"],
  arguments: [
    { name: "member", type: "member" },
    { name: "role", type: "role" },
  ],
  execute: (message, args) => {
    // checking to see if the user has the role or not
    if (!args.member.roles.includes(args.role.id)) {
      args.member.addRole(message.guildId, args.role.id);
      message.reply(
        `${args.member.mention} has been given the role: ${args.role.name}`,
        5,
      );
    } else {
      message.reply(
        `${args.member.mention} already has the role: ${args.role.name}`,
      );
    }
  },
});
```

Awesome, that is a full command converted from Discord.JS to Discordeno. See how
easy it is! Let's convert one more command to see how to really take full
advantage of Discordeno template and have something amazing.

Discord.JS Kick Command Version

```js
// Getting the 'Command' features from Commando
const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const chalk = require("chalk");
const log = console.log;

// Code for the command
module.exports = class kickCommand extends Command {
  constructor(client) {
    super(client, {
      // name of the command, must be in lowercase
      name: "kick",
      // other ways to call the command, must be in lowercase
      aliases: ["boot", "tempban"],
      // command group its part of
      group: "mod",
      // name within the command group, must be in lowercase
      memberName: "kick",
      // Is the description used for 'help' command
      description: "Kick command.",
      // adds cooldowns to the command
      throttling: {
        // usages in certain time x
        usages: 1,
        // the cooldown
        duration: 10,
      },
      // Prevents it from being used in dms
      guildOnly: true,
      // Permissions, list found here > `discord.js.org/#/docs/main/11.5.1/class/Permissions?scrollTo=s-FLAGS`
      clientPermissions: ["ADMINISTRATOR"],
      userPermissions: ["KICK_MEMBERS"],
      // Prevents anyone other than owner to use the command
      ownerOnly: false,
    });
  }

  // Run code goes here
  run(message) {
    const messageArry = message.content.split(" ");
    const args = messageArry.slice(1);

    const kUser = message.guild.member(
      message.mentions.users.first() || message.guild.get(args[0]),
    );
    if (!kUser) return message.channel.send("User cannot be found!");
    const kreason = args.join(" ").slice(22);

    // setting up the embed for report/log
    const kickEmbed = new RichEmbed()
      .setDescription(`Report: ${kUser} Kick`)
      .addField("Reason >", `${kreason}`)
      .addField("Time", message.createdAt);

    const reportchannel = message.guild.channels.find("name", "report");
    if (!reportchannel) {
      return message.channel.send("*`Report channel cannot be found!`*");
    }

    // Delete the message command
    // eslint-disable-next-line camelcase
    message.delete().catch((O_o) => {});
    // Kick the user with reason
    message.guild.member(kUser).kick(kreason);
    // sends the kick report into log/report
    reportchannel.send(kickEmbed);
    // Logs the kick into the terminal
    log(chalk.red("KICK", chalk.underline.bgBlue(kUser) + "!"));
  }
};
```

Discordeno Version

```ts
import { createCommand } from "./../../utils/helpers.ts";

createCommand({
  name: `kick`,
  aliases: ["boot", "tempban"],
  description: "Kick command.",
  // adds cooldowns to the command
  cooldown: {
    // usages in certain duration of seconds below
    allowedUses: 1,
    // the cooldown
    seconds: 10,
  },
  // Prevents it from being used in dms
  guildOnly: true,
  botServerPermissions: ["ADMINISTRATOR"],
  userServerPermissions: ["KICK_MEMBERS"],
  arguments: [
    {
      name: "member",
      type: "member",
      missing: function (message) {
        message.reply(`User cannot be found.`);
      },
      // By default this is true but for the purpose of the guide so you can see this exists.
      required: true,
    },
    {
      name: "reason",
      // The leftover string provided by the user that was not used by previous args.
      type: "...string",
      defaultValue: "No reason provided.",
      // It is silly to lowercase this but for the purpose of the guide you can see that this is also available to you.
      lowercase: true,
    },
  ],
  execute: function (message, args: KickArgs) {
    // setting up the embed for report/log
    const embed = new Embed()
      .setDescription(`Report: ${args.member.mention} Kick`)
      .addField("Reason >", args.reason)
      .addField("Time", message.timestamp.toString());

    const reportchannel = message.guild?.channels.find((channel) =>
      channel.name === "report"
    );
    if (!reportchannel) {
      return message.reply("*`Report channel cannot be found!`*");
    }

    // Delete the message command
    message.delete("Remove kick command trigger.");
    // Kick the user with reason
    args.member.kick(message.guildId, args.reason);
    // sends the kick report into log/report
    reporchannel.send({ embed });
  },
});

interface KickArgs {
  member: Member;
  reason: string;
}
```

Let's take a minute and explain the differences here. The first thing you will
probably notice is different is the `arguments` property. Discordeno provides
the `arguments` property because it provides argument
handling/parsing/validating internally. You don't need to be splitting the
message content or going through and validating it yourself. All you do is tell
Discordeno that you want a member and a reason. It will do the magic and hard
work to get you that data before you even run the command. You just do
`args.member` and you have access to the full member object. There are a lot
more powerful aspects to Discordeno like arguments. Keep diving in and you will
find all the wonderful tools available to give you the best developer experience
possible.

### Need More Examples/Help

If you still need more help converting other aspects of your bot please contact
me at [Discord](https://discord.com/invite/5vBgXk3UcZ). I will continue adding
more examples to this guide as more people request them.
