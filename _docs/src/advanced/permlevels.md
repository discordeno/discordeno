# Permission Levels!

Permission levels is a really cool concept that will let you easily control
which users can use your commands. For example, if you have commands like `warn`
or `ban`, you only want users that are Moderators or Admins of a server to be
able to use these commands. By default, a command is set so any member can use
the command. To raise the requirement, you can use Permission Levels.

## Default Permission Levels

The default permission levels can be found in the `src/permissionLevels` folder.

- `MEMBER` Anyone can use this command.
- `MODERATOR` User needs **MANAGE SERVER** permission in order to use this
  command
- `ADMIN` User needs **ADMINISTRATOR** permission in order to use this command.
- `SERVER_OWNER` Only a **SERVER OWNER** can use this command in their server.
- `BOT_SUPPORT` Requires the user ID be present in
  **configs.userIDs.botSupporters**
- `BOT_DEVS` Requires the user ID be present in **configs.userIDs.botDevs**
- `BOT_OWNERS` Requires the user ID be present in **configs.userIDs.botOwners**

Any of these can be easily modified, in their files. Let's go ahead and try and
modify one of the permission levels as an example.

## Modifying Existing Permission Levels

If you have a bot support server, you might also have a role setup for your
bot's support team. So to make life easier, it would be nice if someone with
that role could use the command without having to modify the configs file every
time.

```ts
import { botCache } from "../../deps.ts";
import { PermissionLevels } from "../types/commands.ts";
import { configs } from "../../configs.ts";

// The member using the command must be one of the bots support team
botCache.permissionLevels.set(
  PermissionLevels.BOT_SUPPORT,
  async (message) => configs.userIDs.botSupporters.includes(message.author.id),
);
```

Let's add some pseudo-code first.

```ts
botCache.permissionLevels.set(
  PermissionLevels.BOT_SUPPORT,
  async (message) => {
    // If the user id exists in the configs allow the command
    if (configs.userIDs.botSupporters.includes(message.author.id)) return true;

    // The users id was not in the configs, check if they have the role in bot server

    // Get the bots support server

    // If the user is not a member of the support server they can't be one of the support staff.

    // If they have the role allow the command otherwise it will be false and block the command.
  },
);
```

Awesome, now that the plan is in place, let's add the code.

```ts
botCache.permissionLevels.set(
  PermissionLevels.BOT_SUPPORT,
  async (message) => {
    // If the user id exists in the configs allow the command
    if (configs.userIDs.botSupporters.includes(message.author.id)) return true;

    // The users id was not in the configs, check if they have the role in bot server

    // Get the bots support server
    const guild = cache.guilds.get(configs.supportServerID);
    if (!guild) return false;

    // If the user is not a member of the support server they can't be one of the support staff.
    const member = guild.members.get(message.author.id);
    if (!member) return false;

    // If they have the role allow the command otherwise it will be false and block the command.
    return member.roles.includes("BOT_SUPPORT_ROLE_ID_HERE");
  },
);
```

Awesome. You just managed to modify one of the existing permission levels. But
what if we wanted to create our own custom permission level. Let's do that next.

## Creating A Permission Level

Let's create a permission level for the purposes of this guide so we can learn
how to create one. For example, let's say we wanted a permission level for users
that have boosted the server. We want it to check if the user has a role called
Nitro Booster.

First, we need to update the Permission Levels enum in `src/types/commands.ts`.

```ts
export enum PermissionLevels {
  MEMBER,
  MODERATOR,
  ADMIN,
  SERVER_OWNER,
  BOT_SUPPORT,
  BOT_DEVS,
  BOT_OWNER,
}
```

Let's add a new one for a Nitro Booster role. You can add it in any order here
you like. The specific order does not matter.

```ts
export enum PermissionLevels {
  MEMBER,
  NITRO_BOOSTER,
  MODERATOR,
  ADMIN,
  SERVER_OWNER,
  BOT_SUPPORT,
  BOT_DEVS,
  BOT_OWNER,
}
```

Once that's done, we can go and create the code for it. Now, lets create a new
file in `permissionLevels` folder called `booster.ts` and paste the base snippet
for a permission level below.

```ts
import { botCache } from "../../deps.ts";
import { PermissionLevels } from "../types/commands.ts";
import { configs } from "../../configs.ts";

botCache.permissionLevels.set(
  PermissionLevels,
  async (message) => {
    // Code goes here
  },
);
```

> **NOTE:** You will see an error in the `PermissionLevels,` line because we
> need to select one of the permission levels. In this case we want the
> NITRO_BOOSTER level we just created above.

```ts
PermissionLevels.NITRO_BOOSTER;
```

Next we can add the code in place.

```ts
import { botCache } from "../../deps.ts";
import { PermissionLevels } from "../types/commands.ts";
import { configs } from "../../configs.ts";

botCache.permissionLevels.set(
  PermissionLevels.NITRO_BOOSTER,
  async (message) => {
    const guild = message.guild();
    if (!guild) return false;

    const member = message.member();
    if (!member) return false;

    const boosterRole = guild.roles.find((role) =>
      role.name.toLowerCase() === "nitro booster"
    );
    if (!boosterRole) return false;

    return member.roles.includes(boosterRole.id);
  },
);
```

Awesome! You just created your very own permission level. Now let's check out
how to use permission levels.

## Using Permission Levels

There are two ways to use permission levels. You can provide an array of
PermissionLevels or you can provide a custom function.

```ts
createCommand({
  name: `reload`,
  permissionLevels: [PermissionLevels.BOT_OWNER],
  botChannelPermissions: ["SEND_MESSAGES"],
```

As an example the `reload` command requires the user to be a bot owner to use
this command.

**ONLY ONE LEVEL IS NECESSARY TO ALLOW THE COMMAND.**

```ts
[PermissionLevels.MODERATOR, PermissionLevels.ADMIN];
```

If you provide an array of permission levels, only one of these is necessary to
run the command. For example, if the user passes MODERATOR, they do not need
ADMIN to run it.

### Advanced Perm Levels

There is another way to use permission levels. You can provide a custom function
that must return a boolean. For example,

```ts
createCommand({
  name: `example`,
  permissionLevels: (message, command, guild) => {
		// Anything you'd like to check here and return a boolean. Must return true or false.
	},
  botChannelPermissions: ["SEND_MESSAGES"],
```

The function is able to take 3 arguments. `message`, `command` and `guild`.

You can use an async function if you like as well.

---

Permission levels are an extremely powerful feature that can help make creating
bots a lot easier. Discordeno provides extremely flexible permission levels. As
a side benefit, Permission Levels are designed to be hot reloadable from the
reload command. 🎉
