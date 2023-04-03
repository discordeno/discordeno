---
sidebar_position: 1
sidebar_label: Reaction Roles(button) Bot
---

# Reaction Roles Bot

One of the most popular bot features is reaction roles. We are going to look into making a small reaction roles bot as it will give us a chance to learn Discordeno while also making a nice little feature. However, instead of **reactions** we will be using Discord's new interaction API and use **buttons** instead. Using buttons will give us a lot of advantages. For example, this can be done without needing cache or database at all. This means it is possible to add this feature to your bot with minimal cost even at scale, since you do not store anything to make it work.

## Pre-Requirements

Before, going forward, please make sure to have finished everything on this list.

- [ ] Create an application and get the bot token. [Create Application Guide](https://discordeno.js.org)
- [ ] Add your bot to a server you own. [Invite Bot Guide](https://discordeno.js.org)
- [ ] Create a GitHub repo for this project. [Setup Repo Guide](https://discordeno.js.org)
- [ ] Install Discordeno. [Installation Guide](https://discordeno.js.org)
- [ ] Setup environment variables. [Environment Variables Guide](https://discordeno.js.org)

## Creating Our Bot

First let's go ahead and set up the base files we need to make this work. Create an `index.ts` file.

```ts
import { createBot, logger } from '@discordeno/bot'
import { config } from 'dotenv'
config()

const bot = createBot({
  token: process.env.TOKEN,
  events: {},
})

logger.info(`[Startup] Starting bot.`)
await bot.start()
logger.info(`[Startup] Bot started successfully.`)
```

## Creating A Reaction Role

We need to create the `/roles` command. To do this, let's make a new file `src/commands/roles.ts`. First, let's go ahead and create a command object in here and export it so we can use it later.
 
```ts
export const command = {};

export default command;
```

Now we can add the command type to this object, to give us the ability to have typescript help us autocomplete some stuff.

```ts
import { CreateApplicationCommand } from '@discordeno/types';

export const command: CreateApplicationCommand = {};
```

By now, you should be seeing some TypeScript errors so let's fix that.

```ts
import { CreateApplicationCommand } from '@discordeno/types';

export const command: CreateApplicationCommand = {
    name: "roles",
    description: "Role management on your server.",
    options: []
};
```
### Preparing Subcommands

Nice, so we now have our basic command, `/roles` ready. Next, we should prepare our `/roles reactions` subcommand here.

```ts
export const command: CreateApplicationCommand = {
    name: "roles",
    description: "Role management on your server.",
    options: [
        {
            name: "reactions",
            description: "Manage the role reactions on your server.",
            // If you add more subcommand groups in future, this would need to be false
            required: true,
            type: ApplicationCommandOptionTypes.SubCommandGroup,
            options: []
        }
    ]
};
```

Now that the `/roles reactions` is complete, we should add the `/roles reactions create` command.

```ts
options: [
    {
        name: "reactions",
        description: "Manage the role reactions on your server.",
        // If you add more subcommand groups in future, this would need to be false
        required: true,
        type: ApplicationCommandOptionTypes.SubCommandGroup,
        options: [
            {
                name: "create",
                description: "Create a reaction role on your server.",
                required: false,
                type: ApplicationCommandOptionTypes.SubCommand,
                options: []
            }
        ]
    }
]
```

### Options For Creating Reaction Role

Fantastic so now `/roles reactions create` is available, we want to add some options to the create subcommand. We will need the user to provide us with the following things:

1. Role - The role we give when the user presses the button
2. Emoji - The emoji we will put on the button.
3. Color - The color of the button.
4. Label - An optional label we can add to the label if the user desires.

```ts
{
    name: "create",
    description: "Create a reaction role on your server.",
    required: false,
    type: ApplicationCommandOptionTypes.SubCommand,
    options: [
        {
            required: true,
            name: 'role',
            description: 'What role would you like to set for this button?',
            type: ApplicationCommandOptionTypes.Role,
        },
    ]
}
```

So now we have added an option for the user to provide us with an role to assign/remove from a user when they press the button. Next we will require the user to give us a emoji.

```ts
{
    required: true,
    name: 'role',
    description: 'What role would you like to set for this button?',
    type: ApplicationCommandOptionTypes.Role,
},
{
    required: true,
    name: "emoji",
    description: "What would you like to set as this button's emoji?",
    type: ApplicationCommandOptionTypes.String,
},
```

Next let's request a user to provide the button color.

```ts
{
    required: true,
    name: "emoji",
    description: "What would you like to set as this button's emoji?",
    type: ApplicationCommandOptionTypes.String,
},
{
    required: true,
    name: "color",
    description: "What color would you like to set as this button's color?",
    type: ApplicationCommandOptionTypes.Integer,
    choices: [
        { name: "Blue", value: ButtonStyles.Primary },
        { name: "Grey", value: ButtonStyles.Secondary },
        { name: "Green", value: ButtonStyles.Success },
        { name: "Red", value: ButtonStyles.Danger },
    ],
},
```

The final option to add to this is the label option.

```ts
{
    required: true,
    name: "color",
    description: "What color would you like to set as this button's color?",
    type: ApplicationCommandOptionTypes.Integer,
    choices: [
        { name: "Blue", value: ButtonStyles.Primary },
        { name: "Grey", value: ButtonStyles.Secondary },
        { name: "Green", value: ButtonStyles.Success },
        { name: "Red", value: ButtonStyles.Danger },
    ],
},
{
    required: false,
    name: "label",
    description: "What would you like to set for the name on this button?",
    type: ApplicationCommandOptionTypes.String,
},
```

Nice. So far your code should look something like this:

```ts
import { CreateApplicationCommand, ApplicationCommandOptionTypes, ButtonStyles } from '@discordeno/types';

const command: CreateApplicationCommand = {
    name: "roles",
    description: "Role management on your server.",
    options: [
        {
            name: "reactions",
            description: "Manage the role reactions on your server.",
            // If you add more subcommand groups in future, this would need to be false
            required: true,
            type: ApplicationCommandOptionTypes.SubCommandGroup,
            options: [
                {
                    name: "create",
                    description: "Create a reaction role on your server.",
                    required: false,
                    type: ApplicationCommandOptionTypes.SubCommand,
                    options: [
                        {
                            required: true,
                            name: "emoji",
                            description: "What would you like to set as this button's emoji?",
                            type: ApplicationCommandOptionTypes.String,
                        },
                        {
                            required: true,
                            name: "color",
                            description: "What color would you like to set as this button's color?",
                            type: ApplicationCommandOptionTypes.Integer,
                            choices: [
                                { name: "Blue", value: ButtonStyles.Primary },
                                { name: "Grey", value: ButtonStyles.Secondary },
                                { name: "Green", value: ButtonStyles.Success },
                                { name: "Red", value: ButtonStyles.Danger },
                            ],
                        },
                        {
                            required: false,
                            name: "label",
                            description: "What would you like to set for the name on this button?",
                            type: ApplicationCommandOptionTypes.String,
                        },
                    ]
                }
            ]
        }
    ]
}
```

:::tip
Whenever you write a little bit of code, stop and test to make sure it does what it should before you keep writing more code.
:::

### Setting Up Slash Creation

Now, we should take a minute to test this code out. However, this code as is does nothing it is just a file that exports an object. Let's make it so that whenever we start our bot, it will create this command for us on our test server. Go back to your index file where you created your bot.

```ts
await bot.rest.upsertGuildApplicationCommands("1234", [
    roles,
])

logger.info(`[Startup] Starting bot.`)
await bot.start()
```

Once you have added that line above, you need to make 2 small changes. The first change is to stop TypeScript from warning you that `roles` does not exist. Let's import roles at the top of the file

```ts
import roles from './src/commands/roles.js';
```

The second thing is that we need to replace the `1234` with your server's guild id where you will be testing. This will make it so that we update any commands whenever the bot is started.

### Cleaner Code

Let's take a minute to refactor the code a little before we proceed further. Make a file called `src/commands/index.ts`.

```ts
import { CreateApplicationCommand } from '@discordeno/types';
import roles from './roles.js';

export const commands = new Map<string, CreateApplicationCommand>([
    roles,
].map((cmd) => [cmd.name, cmd]))

export default commands;
```

Now back in your index file with your bot, let's make use of this map.

```ts
// This id should reflect your server id by now
await bot.rest.upsertGuildApplicationCommands("1234", [...commands.values()]);
```

Also make sure to change the import at the top of the file.

```ts
// Old import. Delete this.
import roles from "./src/commands/roles.js";
// New import. Add this.
import commands from "./src/commands/index.js";
```

Go ahead and start your bot, you will see the command is available on your server by typing `/roles reactions create`. If you try and execute the command it will fail since we have not yet added the handling of this command.

## Command Execution Handling

Let's make 2 very small files first. `src/events/index.ts` and `src/events/interactionCreate.ts`. Go to the interactionCreate file first.

```ts
import commands from "../commands/index.js";
import { commandOptionsParser } from '@discordeno/utils';

export const event: EventHandlers["interactionCreate"] = async function(interaction) {
    if (interaction.type === InteractionTypes.ApplicationCommand) {
        if (!interaction.data) return;

        const command = commands.get(interaction.data.name);
        if (!command) return;

        await command.execute(interaction, commandOptionsParser(interaction));
    }
}
```

At this point, we are seeing an error from TypeScript, that the `command` does not have an `.execute()` handler. To add this we need to customize our command just a little bit. Let's make a interface for a custom Command object. Go to `src/commands/index.ts`

```ts
import { CreateApplicationCommand, Interaction } from '@discordeno/types';
import roles from './roles.js';

export const commands = new Map<string, CreateApplicationCommand>([
    roles,
].map((cmd) => [cmd.name, cmd]))

export default commands;

export interface Command extends CreateApplicationCommand {
    /** Handler that will be executed when this command is triggered */
    execute(interaction: Interaction, args: Record<string, any>): Promise<any>;
}
```

Once this interface is made, we should edit the Map to use this as well.

```ts
export const commands = new Map<string, Command>([
```

Next we should edit the command file at `src/commands/role.ts` and edit it to have an execute handler.

```ts
import { CreateApplicationCommand, ApplicationCommandOptionTypes, ButtonStyles } from '@discordeno/types';

const command: CreateApplicationCommand = {
    name: "roles",
    description: "Role management on your server.",
    options: [
        // Lot's of options here...
    ],
    async execute(interaction, args) {
        
    } 
}
```

Once the execute handler is added, make sure to change the type to Command as well.

```ts
import { CreateApplicationCommand, ApplicationCommandOptionTypes, ButtonStyles } from '@discordeno/types';
import { Command } from './index.js';

const command: Command = {
```

Now that this is complete we should go 