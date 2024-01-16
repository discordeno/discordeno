---
sidebar_position: 1
sidebar_label: Reaction Roles (button) Bot
---

# Reaction Roles Bot

One of the most popular bot features is reaction roles. We are going to look into making a small reaction roles bot as it will give us a chance to learn Discordeno while also making a nice little feature. However, instead of **reactions** we will be using Discord's interaction API and use **buttons** instead. Using buttons will give us a lot of advantages. For example, this can be done without needing cache or database at all. This means it is possible to add this feature to your bot with minimal cost even at scale, since you do not store anything to make it work.

## Pre-Requirements

Before, going forward, please make sure to have finished everything on this list.

- Create an application and get the bot token. [Create Application Guide](https://discordeno.js.org/docs/beginner/token)
- Add your bot to a server you own. [Invite Bot Guide](https://discordeno.js.org/docs/beginner/inviting)
- [recommended, optional] Create a GitHub repo for this project. [Setup Repo Guide](https://discordeno.js.org/docs/beginner/github)
- Install Discordeno. [Installation Guide](https://discordeno.js.org)
- Setup environment variables. [Environment Variables Guide](https://discordeno.js.org/docs/beginner/env)

## Creating Our Bot

First let's go ahead and set up the base files we need to make this work. Create an `src/index.ts` file.

```ts
import { createBot } from '@discordeno/bot'
import { config } from 'dotenv'
config()

const bot = createBot({
  token: process.env.TOKEN,
  events: {},
})

await bot.start()
```

## Creating A Reaction Role

We need to create the `/roles` command. To do this, let's make a new file `src/commands/roles.ts`. First, let's go ahead and create a command object in here and export it so we can use it later.

```ts
export const command = {}

export default command
```

Now we can add the command type to this object, to give us the ability to have typescript help us autocomplete some stuff.

```ts
// insert-next-line
import { CreateApplicationCommand } from '@discordeno/types'

// remove-next-line
export const command = {}
// insert-next-line
export const command: CreateApplicationCommand = {}
```

By now, you should be seeing some TypeScript errors so let's fix that.

Typescript requires us to add:

- `name` - The name propriety is used as the main command name
- `description` - A description for what this command does

```ts
import { CreateApplicationCommand } from '@discordeno/types'

export const command: CreateApplicationCommand = {
  // insert-start
  name: 'roles',
  description: 'Role management on your server.',
  // insert-end
}
```

### Preparing Subcommands

Nice, so we now have our basic command, `/roles` ready. Next, we should prepare our `/roles reactions` subcommand here.

To do this we need to tell discord that this `/roles` command has some options, to do this we can add an `options` array,
inside we can add the `reactions` subcommand, this will require us to add a name, a description and a type, for the type we will use
`ApplicationCommandOptionTypes.SubCommandGroup` to tell discord to create a group of subcommands named `reactions`.

Commands can be

- A command without subcommands / subcommands groups
- A command with subcommands, but not subcommands groups
- A command with subcommands group that have subcommands

Discord however has a few rules in how we can declare our subcommands

- You can only have groups only 1 level deep, so having a subcommand group inside a subcommand group is not allowed.
- Subcommands can't have subcommands groups as child, only subcommands groups can have subcommands as child
- If you add a subcommand/subcommand group you can not longer use the top-level command, so you can't run the `/roles` command

For more information on what discord find valid for subcommands you can refer to the [official discord documentation](https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups)

```ts
export const command: CreateApplicationCommand = {
  name: 'roles',
  description: 'Role management on your server.',
  // insert-start
  options: [
    {
      name: 'reactions',
      description: 'Manage the role reactions on your server.',
      type: ApplicationCommandOptionTypes.SubCommandGroup,
    },
  ],
  // insert-end
}
```

Now that the `/roles reactions` is complete, we should add the `/roles reactions create` command.

We are doing this by specifying as an option of the subcommand group that we created before an option of type subcommand, this is a command that we can actually run from discord.

```ts
options: [
  {
    name: 'reactions',
    description: 'Manage the role reactions on your server.',
    type: ApplicationCommandOptionTypes.SubCommandGroup,
    // insert-start
    options: [
      {
        name: 'create',
        description: 'Create a reaction role on your server.',
        type: ApplicationCommandOptionTypes.SubCommand,
      },
    ],
    // insert-end
  },
]
```

### Options For Creating Reaction Role

Fantastic so now `/roles reactions create` is available, we want to add some options to the create subcommand. We will need the user to provide us with the following things:

1. Role - The role we give when the user presses the button
1. Emoji - The emoji we will put on the button.
1. Color - The color of the button.
1. Label - An optional label we can add to the button if the user desires.

We can declare these options with an object inside the `options` array of our subcommand, this object requires us to give a name, a description and a type for the option, as an option now we use the `ApplicationCommandOptionTypes.Role` option, as we want the user to give us a role, while before we used `ApplicationCommandOptionTypes.SubCommandGroup` and `ApplicationCommandOptionTypes.SubCommand` that are used to declare subcommand groups and subcommands all the other `ApplicationCommandOptionTypes` we will use will require the user to give us a different kind of information, in the example of `ApplicationCommandOptionTypes.Role` discord will give the user the choice to select any role in the server.

Additionally since we want some of our options to be required to run the command we can add the `required: true` option, this will inform discord to prevent the user from running the command if they don't pass-in the option.

```ts
{
  name: "create",
  description: "Create a reaction role on your server.",
  type: ApplicationCommandOptionTypes.SubCommand,
  // insert-start
  options: [
    {
      name: 'role',
      description: 'What role would you like to set for this button?',
      type: ApplicationCommandOptionTypes.Role,
      required: true,
    },
  ]
  // insert-end
}
```

So now we have added an option for the user to provide us with an role to assign/remove from a user when they press the button. Next we will require the user to give us an emoji.

The emoji will be of type `ApplicationCommandOptionTypes.String`, the user will be able to provide anything in this, including an emoji for our button we will create in the end, like the role option this will be required as well.

```ts
{
  name: 'role',
  description: 'What role would you like to set for this button?',
  type: ApplicationCommandOptionTypes.Role,
  required: true,
},
// insert-start
{
  name: "emoji",
  description: "What would you like to set as this button's emoji?",
  type: ApplicationCommandOptionTypes.String,
  required: true,
},
// insert-end
```

Next let's request a user to provide the button color.

The button color will be a little different, for now we only created options that give the user full control (even if limited by discord) over the option, but for the button color only a few values are actually valid and are not obvious to the user, for this reason we can use the `choices` array to create an handful of predefined options that we decide and limit the user to decide what option to use from the available one, in these options we can decide a `name` that the user will see and a `value` that discord will send us when the user select that option. This option is of type `ApplicationCommandOptionTypes.Integer` allowing us to set as values for our choices some numbers, for example `ButtonStyles.Primary` will correspond to the number 1. While we could use the raw number for our values picking from the `ButtonStyles` enum will be easier for us in a couple of ways: we can clearly see that the name "blue" will give us a button with style `Primary`, if we used the number 1 it wouldn't be clear unless we go and check the discord documentation for buttons and confront the values, also a number in the code without any label attached to it can be referred as magic numbers.

Like the other one, this value is required as well.

```ts
{
  name: "emoji",
  description: "What would you like to set as this button's emoji?",
  type: ApplicationCommandOptionTypes.String,
  required: true,
},
// insert-start
{
  name: "color",
  description: "What color would you like to set as this button's color?",
  type: ApplicationCommandOptionTypes.Integer,
  required: true,
  choices: [
    { name: "Blue", value: ButtonStyles.Primary },
    { name: "Green", value: ButtonStyles.Success },
    { name: "Grey", value: ButtonStyles.Secondary },
    { name: "Red", value: ButtonStyles.Danger },
  ],
},
// insert-end
```

The final option to add to this is the label option. For this we will use a type of string and we can set the required to false or not specify any required propriety at all, in this we will omit the propriety.

```ts
{
  required: true,
  name: "color",
  description: "What color would you like to set as this button's color?",
  type: ApplicationCommandOptionTypes.Integer,
  choices: [
    { name: "Blue", value: ButtonStyles.Primary },
    { name: "Green", value: ButtonStyles.Success },
    { name: "Grey", value: ButtonStyles.Secondary },
    { name: "Red", value: ButtonStyles.Danger },
  ],
},
// insert-start
{
  name: "label",
  description: "What would you like to set for the name on this button?",
  type: ApplicationCommandOptionTypes.String,
},
// insert-end
```

Nice. So far your code should look something like this:

```ts
import {
  CreateApplicationCommand,
  ApplicationCommandOptionTypes,
  ButtonStyles,
} from '@discordeno/types'

const command: CreateApplicationCommand = {
  name: 'roles',
  description: 'Role management on your server.',
  options: [
    {
      name: 'reactions',
      description: 'Manage the role reactions on your server.',
      type: ApplicationCommandOptionTypes.SubCommandGroup,
      options: [
        {
          name: 'create',
          description: 'Create a reaction role on your server.',
          type: ApplicationCommandOptionTypes.SubCommand,
          options: [
            {
              name: 'role',
              description: 'What role would you like to set for this button?',
              type: ApplicationCommandOptionTypes.Role,
              required: true,
            },
            {
              name: 'emoji',
              description: "What would you like to set as this button's emoji?",
              type: ApplicationCommandOptionTypes.String,
              required: true,
            },
            {
              name: 'color',
              description:
                "What color would you like to set as this button's color?",
              type: ApplicationCommandOptionTypes.Integer,
              required: true,
              choices: [
                { name: 'Blue', value: ButtonStyles.Primary },
                { name: 'Green', value: ButtonStyles.Success },
                { name: 'Grey', value: ButtonStyles.Secondary },
                { name: 'Red', value: ButtonStyles.Danger },
              ],
            },
            {
              name: 'label',
              description:
                'What would you like to set for the name on this button?',
              type: ApplicationCommandOptionTypes.String,
            },
          ],
        },
      ],
    },
  ],
}
```

:::tip
Whenever you write a little bit of code, stop and test to make sure it does what it should before you keep writing more code. You will make your life harder if you write a lot of code as if then something breaks then you will have to find what part of the code you added is causing the unexpected behavior
:::

### Setting Up Slash Creation

Now, we should take a minute to test this code out. However, this code as is does nothing it is just a file that exports an object. Let's make it so that whenever we start our bot, it will create this command for us on our test server. Go back to your `src/index.ts` file where you created your bot.

An alternative to creating the commands in a test server is to create them to all servers (globally), this can be accomplished by using the `upsertGlobalApplicationCommands`, but in this guide we will create our commands only in a test server.

We will also need to import our `command` object we defined in the `src/commands/roles.ts` before that contains the data for discord to register our command.

```ts
import { createBot } from '@discordeno/bot'
import { config } from 'dotenv'

// insert-next-line
import roles from './commands/roles.js'

config()

const bot = createBot({
  token: process.env.TOKEN,
  events: {},
})

// insert-next-line
const guildId = 'REPLACE WITH YOUR GUILD ID'

// insert-next-line
await bot.rest.upsertGuildApplicationCommands(guildId, [roles])

await bot.start()
```

Now the only thing that remains to change with this code is to use your actual server's guild id in the `guildId` variable we defined, all you need to do is replace the `REPLACE WITH YOUR GUILD ID` with your actual id of the server you will use for testing. This will make it so that we update any commands whenever the bot is started.

### Cleaner Code

Let's take a minute to refactor the code a little before we proceed further. Make a file called `src/commands/index.ts`.

```ts
import { CreateApplicationCommand } from '@discordeno/types'
import roles from './roles.js'

export const commands = new Map<string, CreateApplicationCommand>(
  [roles].map(cmd => [cmd.name, cmd]),
)

export default commands
```

:::note
You can structure the command discovery in any way you might prefer, in this guide we will manually import the file and add it to the map, but you can get creative and do whatever you want. You could list all the files in a folder and after verifying that they export a command add it to this commands map, you could rely on the files to call a function that will add them to the map, you can import the map in the file and add it from there, you can do whatever you want, it is your code and so you should take your decisions
:::

Now every time you want to add a new command to your bot you can add it in the array together with the `roles` array and it will be stored in the `commands` map.

Going back to `src/index.ts` we now need to use the map we just created, so let's import it and use it.

```ts
import { createBot } from '@discordeno/bot'
import { config } from 'dotenv'

// remove-next-line
import roles from './commands/roles.js'
// insert-next-line
import commands from './commands/index.js'

config()

const bot = createBot({
  token: process.env.TOKEN,
  events: {},
})

// By now this variable should have your server guild id instead of REPLACE WITH YOUR GUILD ID
const guildId = 'REPLACE WITH YOUR GUILD ID'

// remove-next-line
await bot.rest.upsertGuildApplicationCommands(guildId, [roles])
// insert-next-line
await bot.rest.upsertGuildApplicationCommands(guildId, [...commands.values()])

await bot.start()
```

Go ahead and start your bot, you will see the command is available on your server by typing `/roles reactions create`. If you try and execute the command it will fail since we have not yet added the handling of this command.

## Command Execution Handling

We now need to handle the data that discord will send us when a user types the command, to do this we can add an event on the `interactionCreate` event.

Let's make 2 files first. `src/events/index.ts` and `src/events/interactionCreate.ts`. Let's go to the `src/events/interactionCreate.ts` file first.

We will add a new event to handle the data, in here we need to check that the interaction type is a command, this is necessary because interactions can vary, they can be commands, they can be modals, they can be buttons, they can be commands run not from a message but from a user profile when you right click it and so on. We also need to verify that there is a data object with this interaction or else we won't able to get the name of the command the user wants to run.

In the end we need to parse all the options discord has provided us, in the `/roles reactions create` example we defined a few options, we now need to get them from the interaction object, this can be accomplished by using the `commandOptionsParser` helper discord provides, this is because parsing the interaction data options can be prone to errors so discordeno provides you a helper function to do it.

```ts
import commands from '../commands/index.js'
import { commandOptionsParser } from '@discordeno/bot'

export const event: EventHandlers['interactionCreate'] = async function (
  interaction,
) {
  if (interaction.type === InteractionTypes.ApplicationCommand) {
    if (!interaction.data) return

    const command = commands.get(interaction.data.name)
    if (!command) return

    await command.execute(interaction, commandOptionsParser(interaction))
  }
}
```

Now we need to create the other file, `src/events/index.ts`, in this file we will collect all our events to give to the bot object.

```ts
import type { EventHandlers } from '@discordeno/bot'
import { event as interactionCreateEvent } from './interactionCreate.js'

export const events = {
  interactionCreate: interactionCreateEvent,
} as Partial<EventHandlers>

export default events
```

From this file we can add all the events we want, in this guide we only need the `interactionCreate` one, but there some other event that are really helpful, for example the `ready` event telling us when the bot connected to discord.

To tell discordeno to run the events we need another change, back to our `src/index.ts` file.

```ts
import { createBot } from '@discordeno/bot'
import { config } from 'dotenv'

import commands from './commands/index.js'
import events from './events/index.js'

config()

const bot = createBot({
  token: process.env.TOKEN,
  // remove-next-line
  events: {},
  // in this line we only use `events` but for javascript this will traduce to `events: events`
  // insert-next-line
  events,
})

// ... REST OF THE FILE ...
```

At this point, if we go to the `src/events/interactionCreate.ts` file we are seeing an error from TypeScript, it is telling us that the `command` does not have an `.execute()` handler. To add this we need to customize our command just a little bit. Let's make a interface for a custom Command object and use it for our map. Go to `src/commands/index.ts`

```ts
import { CreateApplicationCommand, Interaction } from '@discordeno/types'
import roles from './roles.js'

// remove-start
export const commands = new Map<string, CreateApplicationCommand>(
  [roles].map(cmd => [cmd.name, cmd]),
)
// remove-end
// insert-start
export const commands = new Map<string, Command>(
  [roles].map(cmd => [cmd.name, cmd]),
)
// insert-end

export default commands

// insert-start
export interface Command extends CreateApplicationCommand {
  /** Handler that will be executed when this command is triggered */
  execute(interaction: Interaction, args: Record<string, any>): Promise<any>
}
// insert-end
```

Next we should edit the command file at `src/commands/role.ts` and edit it to have an execute handler.

```ts
import {
  // remove-next-line
  CreateApplicationCommand,
  ApplicationCommandOptionTypes,
  ButtonStyles,
} from '@discordeno/types'
// insert-next-line
import type { Command } from './index.js'

// Change from 'CreateApplicationCommand' to 'Command'
const command: Command = {
  name: 'roles',
  description: 'Role management on your server.',
  options: [
    // All the options we defined before
  ],
  async execute(interaction, args) {},
}
```

Now that this is complete we should go ahead and a type for args so we can get some nice autocomplete when we code.

```ts
// Add the 'CommandArgs' for typescript
async execute(interaction, args: CommandArgs) {
  // Create a reaction role
  if (args.reactions?.create) {
  }
}

// Place this somewhere at the bottom or top of the file.
// Make sure to import all the following types as well.
interface CommandArgs {
  reactions?: {
    create?: {
      role: Role
      emoji: string
      color: ButtonStyles
      label?: string
    }
  }
}
```

Finally, we can begin writing the code to handle our commands. We will implement the `create` command. In this command the user will found himself in a menu with 3 options

1. Add another reaction role button
1. Remove an exiting reaction role button
1. Save the current buttons.

First let's start with creating the menu and the "preview" message of the reaction roles:

```ts
import { ApplicationCommandOptionTypes, ButtonStyles, MessageComponentTypes } from '@discordeno/types'

// your other code here

async execute(interaction, args: CommandArgs) {
  // Create a reaction role
  if (args.reactions?.create) {
    // Send the message that uses will use to get the role
    const roleMessage = await bot.helpers.sendMessage(interaction.channelId, {
      content: 'Pick your roles',
      components: [
        {
          type: MessageComponentTypes.ActionRow,
          components: [
            {
              type: MessageComponentTypes.Button,
              style: args.reactions.create.color,
              emoji: {
                name: args.reactions.create.emoji,
              },
              label: args.reactions.create.label,
              customId: `reactionRoles-role-${args.reactions.create.role.id}`,
            }
          ]
        }
      ],
    })

    await interaction.respond(
      {
        content: 'Use the buttons in this message to edit the message below.',
        components: [
          {
            type: MessageComponentTypes.ActionRow,
            components: [
              {
                type: MessageComponentTypes.Button,
                style: ButtonStyles.Success,
                customId: 'reactionRoles-add',
                emoji: {
                  name: '➕',
                },
                label: 'Add',
              },
              {
                type: MessageComponentTypes.Button,
                style: ButtonStyles.Danger,
                customId: 'reactionRoles-remove',
                emoji: {
                  name: '➖',
                },
                label: 'Remove',
              },
              {
                type: MessageComponentTypes.Button,
                style: ButtonStyles.Success,
                customId: 'reactionRoles-save',
                emoji: {
                  name: '✅',
                },
                label: 'Save',
              },
            ],
          }
        ],
      },
      { isPrivate: true }
    )
  }
}

// THE REST OF YOUR CODE
```

In this code we are doing 2 things, sending a message to the channel where the command has been invoked with a button to add the role that the user constructed with the commands params and creating another (private) message that can only see the user that has run the command to edit the message we just sent.

Since we never created an actual button before we will examine each proprieties in these objects.

Let's start by the object we pass to `sendMessage`, in here we define what data should the message have, in this example we just give a really simple content and a component array, there arrays can have up to 5 objects inside and those object are `Action Rows`, we can tell that they are action rows by the `type` value they have: `MessageComponentTypes.ActionRow`, action rows also need a components array, in this array there can be up to 5 buttons or 1 select menu, we will se later what is a select menu and how to use it. Now, the buttons, we can recognize them by the `type: MessageComponentTypes.Button`, they have a different requirement from action rows, they need to have:

- A `style` - How discord should display them,
- A `label` or `emoji` - What discord should display as the text in the buttons
- A `customId` - there are developer defined ids that can go up to 100 characters where we can store information and use them to differentiate the buttons from one another, we will see how this is helpful soon

This applies pretty much identically to the `interaction.respond` function that we call, it too has a `content` for the message and a `components` array with inside an action row that this time has 3 buttons that we define.

If you save and run the bot, after you run the command you might start to have a problem, discord still says that the application did not respond, but how is that possibile? We just added the code to respond to the interaction, this is true but we forgot a thing, a discordeno concept called `desired properties`, this is an optimization discordeno builds to make your code more performant but can be found annoying or unnecessary, to explain how there `desired properties` works we need to talk about how discord sends us data, discord uses his own way to require/give data to who consumes the api we won't go deep into this, you can refer to the official documentation if you are interested, but know that the way discord sends us data is not the way that we (might) want it for this reason discordeno needs to map it from the discord format to the discordeno format, this is done via `transformers` defined in the `bot.transformers` object, we won't use them directly but we need to tell them what we need from the pile of data discord provides us. If we look back to the `src/events/interactionCreate.ts` file we can notice that we use `interaction.type` and `interaction.data`, and if in our command we can find we use `interaction.channelId` and if we look what the `interaction.respond` does in our command we can see that it uses `interaction.id` and `interaction.token`, all of there 5 proprieties needs to be added to the `desired properties` list, we can do this by going back to `src/index.ts` and add a few lines:

```ts
// REST OF YOUR CODE

const bot = createBot({
  token,
  events,
})

// insert-start
bot.transformers.desiredProperties.interaction.id = true
bot.transformers.desiredProperties.interaction.data = true
bot.transformers.desiredProperties.interaction.type = true
bot.transformers.desiredProperties.interaction.token = true
bot.transformers.desiredProperties.interaction.channelId = true
// insert-end

// REST OF YOUR CODE
```

:::tip
As said before the code you are creating is your code, and in being so you can structure it how you find it better for you. This mean that if you don't like having to specify the `bot.transformers.desiredProperties` lines in your index.ts nothing is preventing you from moving them somewhere else and make your code call them in a way or another, a way is for example moving to a file apart and creating a function that will edit all there values.
:::

:::note
If you want to can disable the `desired properties` with the `defaultDesiredPropertiesValue` option in the createBot object, it isn't recommended to use but it is there to allow developer choice, keep in mind this will give you a warning in the console when you run the bot and WILL be more memory and cpu usage from your bot.
:::

If we now try again we finally see our message and in the our 3 buttons. But there is a problem, if we click any of the buttons we just created like the "Add" button, they aren't doing anything! This is normal, we did not put any code in place to handle them but now we have to discuss another thing: Reacting to users interactions beyond just commands

### Handling interaction beyond commands

So, now we are problem, discord is saying that we don't respond to the button click, and he is in fact right, we didn't, but we need to make some changes to more then our command file. The problem is rather simple: we need a way to get the interaction of us clicking that "Add" button for example inside our command. Interaction do not "chain" but they share some data we can use, we can find the `message` propriety, this propriety will be defined if the interaction is discord telling us about a user that has clicked a button, this seems perfect, we now have a way to tell that we need that interaction, and while a move forward we still face an issue: **how** do we get the data from the interaction of the button click in our command?

You can get creative and do anything you find more appropriate to handle this situation, a few examples are:

- `Collectors` - What we will use in this example guide.
- Manual check of the customId in the global event.

To explain what a `collector` is we can take example from an array, in the array we can take and remove, what if we create something where we can "collect" and when we do, we get notified where we need it? This sounds like it solves our issue, so let's implement this Collector class, in this guide we will write it a very simple way, but there are addition you might want to do, but we will discuss this later.

Let's create a `src/collector.ts` file, to help us we can use a nodejs feature `EventEmitter`, we won't explain what an event emitter is, just know it makes your life easier to create this:

```ts
import { EventEmitter } from 'node:events'
import { Interaction } from '@discordeno/bot'

export class ItemCollector extends EventEmitter {
  onItem(callback: (item: Interaction) => unknown): void {
    this.on('item', callback)
  }

  collect(item: Interaction): void {
    this.emit('item', item)
  }
}

export default class ItemCollector
```

:::note
If you are following along using Bun or Deno you can use this code as well even if we use a node specific feature, this is because Bun supports (almost) all apis from node, and deno supports a lot of them in the latest versions, so if you are getting an error on the `EventEmitter` you might need to update your bun/deno
:::

If we now go to our `src/events/interactionCreate.ts` we can add some code:

```ts
// REST OF YOUR CODE HERE

// insert-next-line
import ItemCollector from '../collector.js'

// insert-next-line
export const collectors = new Set<ItemCollector>()

export const event: EventHandlers['interactionCreate'] = async interaction => {
  // insert-next-line
  for (const collector of collectors) {
    // insert-next-line
    collector.collect(interaction)
    // insert-next-line
  }

  // REST OF YOUR CODE HERE
}
```

In here you are defining a `Set` (for what we use, we can see it exactly the same as an array with a few helpful methods) of these collectors and when we receive an interaction from discord we collect in all the collectors that have been added to then handle the interaction, so if the have just received the button click interaction we will now able to respond to it.

:::tip
As already said: you don't like how the collection is done in this example? You are free to change it and have fun in experimenting what you find to be the better way
:::

To do this we need to update the command, `src/events/roles.ts`:

```ts
// THE REST OF YOUR CODE

// insert-next-line
import ItemCollector from '../collector.js'
// insert-next-line
import { collectors } from '../events/interactionCreate.js'

async execute(interaction, args: CommandArgs) {
  // Create a reaction role
  if (args.reactions?.create) {
    // THE REST OF YOUR CODE

    // remove-start
    await interaction.respond(
      {
        // all the options we defined earlier
      },
      { isPrivate: true }
    )
    // remove-end
    // insert-start
    await interaction.defer(true);
    const message = await interaction.respond(
      {
        // all the options we defined earlier
      },
      { isPrivate: true }
    )

    const itemCollector = new ItemCollector<Interaction>()
    collectors.add(itemCollector)

    itemCollector.onItem((i) => {
      if (i.message?.id.toString() !== message.id) {
        return
      }

      i.respond("Hello world");
    })

    // insert-end
  }
}

// THE REST OF YOUR CODE
```

In the `onItem` function we are making sure we are only responding if the message object of the interaction is for this command, this is accomplished by checking the `i.message.id` and comparing it to the id of the message we just sent, but wait, you might think, we don't have it, do we? And you would be right, we don't we can get it from the return value of `interaction.respond`, but we also need to add a `interaction.defer` before it for some reason we won't go into, just know we are doing this due to how discord works.

:::warning
A mis-use of the interaction from the code that uses these interaction by using the ItemCollector can use unexpected behavior, so make sure to check the interaction "nature" before using it, like in our example by making sure it is related to our message.
:::

You might remember from before that we discussed the desired properties, and we now need to update them, we are now using, `i.message` and we are using the `.id` of a message (`i.message.id`) so we need to add 2 lines to our list in the `src/index.ts`:

```ts
// REST OF YOUR CODE

// insert-next-line
bot.transformers.desiredProperties.message.id = true

bot.transformers.desiredProperties.interaction.id = true
bot.transformers.desiredProperties.interaction.data = true
bot.transformers.desiredProperties.interaction.type = true
bot.transformers.desiredProperties.interaction.token = true
// insert-next-line
bot.transformers.desiredProperties.interaction.message = true
bot.transformers.desiredProperties.interaction.channelId = true

// REST OF YOUR CODE
```

If we run the code at this point we can see that by clicking the button we will get a message back saying `Hello world`, we did it! We responded to a button from inside the command!
