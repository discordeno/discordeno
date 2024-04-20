---
sidebar_position: 1
sidebar_label: Reaction Roles (button) Bot
---

# Reaction Roles Bot

In this guide we will make a simple reaction roles bot. This will give us an opportunity to learn Discordeno while also making one of the most popular bot features. However, instead of **reactions** we will be using Discord's interaction API and use **buttons** instead. Using buttons will give us a lot of advantages. For example, this can be done without needing cache or database at all. This means it is possible to add this feature to your bot with minimal cost even at scale, since you do not need to store anything to make it work.

## Pre-Requirements

Before going forward, please make sure you have finished everything on this list.

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

Now we can add the command type to this object, to give TypeScript the ability to help us autocompleting some stuff.

```ts
// insert-next-line
import { CreateApplicationCommand } from '@discordeno/types'

// remove-next-line
export const command = {}
// insert-next-line
export const command: CreateApplicationCommand = {}
```

By now, you should be seeing some TypeScript errors so let's fix those.

Typescript requires us to add:

- `name` - The name property is used as the main command name
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

To do this we need to tell Discord that this `/roles` command has some options, which can be done with an `options` array. Inside the `options` array we can add the `reactions` subcommand, which will require us to add a name, a description and a type. To make Discord create a group of subcommands named `reactions`, we will use `ApplicationCommandOptionTypes.SubCommandGroup` as type.

Commands can be

- Without subcommands / subcommand groups
- With subcommands, but not subcommand groups
- With subcommand groups that have subcommands

Discord however has a few rules on how we can declare our subcommands

- Groups can only be 1 in depth, so having a subcommand group inside a subcommand group is not allowed.
- Subcommands can't have subcommand groups as child, only subcommand groups can have subcommands as children
- If you add a subcommand/subcommand group you can not longer use the top-level command, so you can't run the `/roles` command

For more information on what Discord considers valid for subcommands you can refer to the [official Discord documentation](https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups)

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

We are doing this by specifying an option of type subcommand to the subcommand group that we created before. This is a command that we can actually run from Discord.

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

Now that `/roles reactions create` is available, we want to add some options to the create subcommand. We will need the user to provide us with the following things:

1. Role - The role we give when the user presses the button
1. Emoji - The emoji we will put on the button.
1. Color - The color of the button.
1. Label - An optional label we can add to the button if the user desires.

We can declare these options with an object inside the `options` array of our subcommand. This object requires us to give it a name, a description, and a type for the option. For the type, we now use the `ApplicationCommandOptionTypes.Role` option because we want the user to provide a role (whereas before we used `ApplicationCommandOptionTypes.SubCommandGroup` and `ApplicationCommandOptionTypes.SubCommand` to declare subcommand groups and subcommands). All the other `ApplicationCommandOptionTypes` we use in this guide will require the user to provide a different kind of information.

Additionally, since we want some of our options to be required to run the command, we can add the `required: true` option. This will make Discord prevent the user from running the command if they don't fill in the option.

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

So now we have added an option for the user to provide a role to assign/remove when anyone presses the button. Next we will require the user to provide an emoji.

The emoji option will be of type `ApplicationCommandOptionTypes.String`, so that the user will be able to provide anything, including an emoji for the button we'll create in the end. This option, just like the role one, will be required.

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

Next let's require the user to provide the button color.

The button color will be a little different. Until now, we have created options that give the user full control over the value (even if it's invalid), but for the button color, only a few values are actually valid and it's not obvious to the user. For this reason, we can use the `choices` array to create a handful of predefined options that the user can select from. For each options we can decide a `name` that the user will see and a `value` that Discord will send us when the user selects that option.

We will use the option type `ApplicationCommandOptionTypes.Integer`, but for the `value`, instead of using numbers like `1`, let's pick it from the `ButtonStyles` enum. A number in the code without any label attached to it is known as magic numbers, and it is considered bad practice, which you can read more [here](https://en.wikipedia.org/wiki/Magic_number_(programming)).

For example, let's say you write `{ name: "Blue", value: 1 }`. It wouldn't be very clear what button style number 1 is, and you will have to go and check Discord Documentation. Whereas if you write `{ name: "Blue", value: ButtonStyles.Primary }`, it is very obvious that the name "blue" will give us a button with style `Primary`

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

The final option is the label of the button, and we will use the `ApplicationCommandOptionTypes.String` option type for this. This option is not required, so we can write `required: false` or omit the `required` property. In this guide we will omit the `required` property.

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
When you write some code, remember to stop and test to make sure it work before continue writing more code. You will make your life harder if you write a lot of code without testing because when you finished, if anything breaks you will have to find what part of the code you wrote is broken.
:::

### Setting Up Slash Creation

Now, we should take a minute to test this code. Right now, this code does nothing because it's just a file that exports an object. Let's make it so we can create this command on our test server. Create a file named `src/register-commands.ts`.

An alternative to creating the commands in a test server is to create them in all servers (globally), which be accomplished by using the `upsertGlobalApplicationCommands`. In this guide we will create our commands only in a test server.

We will also need to import our `command` object defined in the `src/commands/roles.ts` that contains the data for Discord to register our command.

```ts
import { bot } from './index.js'
import roles from './commands/roles.js'

// insert-next-line
const guildId = 'REPLACE WITH YOUR GUILD ID'

// insert-next-line
await bot.rest.upsertGuildApplicationCommands(guildId, [roles])
```

Now the only thing that you need to change is to use your actual server's guild ID in the `guildId` variable. All you need to do is replace the `REPLACE WITH YOUR GUILD ID` with your actual server ID that you will use for testing. This will make the bot automatically update every command whenever the bot is started.

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
In this guide we manually import the file and add it to the map, but you can get creative and structure the command discovery in any way you like. For example, you could list all the files in a folder, then after verifying that they export a command, add it to this commands map; or you could rely on the files to call a function that will add them to the map; or you can import the map in the file and add it from there.
:::

Now every time you want to add a new command to your bot you can add it in the array together with the `roles` array and it will be stored in the `commands` map.

Going back to `src/register-commands.ts` we now need to use the map we just created, so let's import it and use it.

```ts
import { bot } from './index.js'
// remove-next-line
import roles from './commands/roles.js'
// insert-next-line
import commands from './commands/index.js'

// By now this variable should have your server guild id instead of REPLACE WITH YOUR GUILD ID
const guildId = 'REPLACE WITH YOUR GUILD ID'

// remove-next-line
await bot.rest.upsertGuildApplicationCommands(guildId, [roles])
// insert-next-line
await bot.rest.upsertGuildApplicationCommands(guildId, [...commands.values()])
```

Go ahead and start your bot. You should see the command is available on your server by typing `/roles reactions create`. If you try and execute the command, it will fail since we have not write any code handling the command

## Command Execution Handling

We now need to handle the data that Discord send us when a user types the command. To do this, we can add an event listener on the `interactionCreate` event.

Create the `src/events/interactionCreate.ts` file so that we can add a new event to handle the data. In here we need to check that the interaction type is a command. This is necessary because interactions can be commands, modals, buttons, commands ran from right-clicking on a user's profile (context menus), and so on. We also need to verify that this interaction has a data object or we won't able to get the name of the command the user wants to run.

We need to parse all the options Discord has provided us. In the `/roles reactions create` example, we defined a few options, and now we need to get them from the interaction object. This can be accomplished by using the `commandOptionsParser` helper that Discordeno provides.

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

Now we need to create the `src/events/index.ts` file to collect all of our events and give it to the bot object.

```ts
import type { EventHandlers } from '@discordeno/bot'
import { event as interactionCreateEvent } from './interactionCreate.js'

export const events = {
  interactionCreate: interactionCreateEvent,
} as Partial<EventHandlers>

export default events
```

In this file we can add all of the events we want. In this guide we only need the `interactionCreate` event, but there some other events that might be useful to you, for example the `ready` event, which fires when the bot has established a connection with Discord's gateway.

To tell Discordeno to run the events, we need another change. Go back to the `src/index.ts` file.

```ts
import { createBot } from '@discordeno/bot'
import { config } from 'dotenv'

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

If we go to the `src/events/interactionCreate.ts` file, we'll see an error from TypeScript. It is telling us that the `command` does not have an `.execute()` handler. To fix this, we need to customize our command just a little bit. Let's make an interface for a custom Command object and use it for our map. Go to the `src/commands/index.ts` file

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

Next, we should edit the command file at `src/commands/role.ts` to have an execute handler.

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

Now that it's finished, let's add a type for args so we can get some nice autocomplete when we code.

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

Finally, we can begin writing code to handle the `/roles` command. Let's implement the `create` subcommand. In this command the user will find themself in a menu with 3 options

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

In this piece of code we are doing 2 things:
- Send a message to the channel where the command was run, with a button everyone can click to add/remove the roles that the user who run this command has set up.
- Send a private message so that only the user who run the command can see it and allow them to edit the message we just sent.

Since we never created an actual button before, let's try to understand the properties in these objects.

Let's start by trying to understand the object we pass to `sendMessage` that allows us to define what data the message should have. A message has a content string and a component array. The component array can have up to 5 action rows inside of it. Each action row can have 1 select menu, 1 input text, or up to 5 buttons. Later we will discuss what a select menu and input text is as well as how to use them. For now, let's focus on buttons. We can recognize them by the `type: MessageComponentTypes.Button`, and it has a different requirement comparing to action rows. Buttons need to have:

- A `style` - How Discord should display them,
- A `label` or `emoji` - What Discord should display as the text in the buttons
- A `customId` - Developer defined ID that can be up to 100 characters long. This is where we can store information and use it to tell the buttons apart from one another. We will see how this is useful soon

This also applies to the `interaction.respond` function that we call. It too has a `content` for the message and a `components` array, inside of which is an action row containing 3 buttons that we defined.

If you save and then run the bot, you might noticed that Discord still says that the application did not respond, but how is that possibile?

Although we just added the code to respond to the interaction, we have forgot a Discordeno concept called `desired properties`. This is an optimization Discordeno uses to make your code more performant but can be found annoying or unnecessary.

To explain how the `desired properties` work we need to talk about how Discord sends us data. Discord uses its own way to require/give data to who consumes the API. This guide won't go deep into this, but if you are interested can refer to the official documentation.

The way Discord sends us data is not the way that we (might) want it and for that reason Discordeno needs to map it from the Discord format to the Discordeno format. This is done via `transformers` defined in the `bot.transformers` object to tell Discordeno what we need from the pile of data Discord provides us.

Looking through the code we have written so far we can see that

- We use `interaction.type` and `interaction.data` in the `src/events/interactionCreate.ts` file.
- We use `interaction.channelId`, `interaction.id`, `interaction.token`, and `role.id` in our command.

We need to add all of properties that we use to the `desired properties` list, and to do so we go back to `src/index.ts` and add a few lines:

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

bot.transformers.desiredProperties.role.id = true
// insert-end

// REST OF YOUR CODE
```

:::tip
As said before the code you are creating is your code, and in being so you can structure it how you find it better for you. This means that if you don't like having to specify the `bot.transformers.desiredProperties` lines in your index.ts nothing is preventing you from moving them somewhere else and make your code call them in a way or another, a way is for example moving to a file apart and creating a function that will edit all the values.
:::

:::note
If you want, you can disable the `desired properties` with the `defaultDesiredPropertiesValue` option in the createBot object, it isn't recommended but it's there to allow the developer to choose, keep in mind this will give you a warning in the console when you run the bot and memory/cpu usage WILL be higher.
:::

If we try again now we'll finally see our message with 3 buttons. But if we click any of the buttons, they don't do anything! This is expected, since we did not write any code to handle buttons. So let's talk about how to react to users' interactions beyond just commands

### Handling interaction beyond commands

Discord is saying that we aren't responding to the button click, so we still need to make more changes to our command and event files. The problem is rather simple: we need a way to get the interaction of the user clicking, for example, the interaction of that "Add" button after the user uses the command.

Interactions do not "chain", but they do have some data we can use to connect them. In this case we can use the `message` property, (which is defined if the interaction Discord sent us comes from a user interacting with a message component, like a button). This seems perfect, we now have a way to tell whether or not we need to do something with an interaction. We still face an issue: **how** do we get the data from the interaction of the button click in our command?

You can get creative and do what you think is the most appropriate thing to handle this situation, a few examples are:

- `Collectors` - What we will use in this example guide.
- Manual check of the customId in the global event.

To explain what a `collector` is, let's take an array as an example. In an array, we can read, add, and remove items. So what if we had a structure which can "collect" items, and notify us when it collects an item we actually need? This sounds like it solves our issue, so let's implement this Collector class. In this guide we will write it in a very simple way, but there are enhancements you might want to add, which we will discuss later.

Let's create a `src/collector.ts` file. We will be using NodeJS's `EventEmitter` feature to create this Collector class. We won't explain what an event emitter is, just know it makes your life easier to create this:

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

In here you are defining a `Set` (for what we use, we can see it exactly the same as an array with a few helpful methods) of these collectors and when we receive an interaction from Discord we collect in all the collectors that have been added to then handle the interaction, so if the have just received the button click interaction we will now able to respond to it.

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

      await i.respond("Hello world");
    })

    // insert-end
  }
}

// THE REST OF YOUR CODE
```

In the `onItem` function, we are making sure we are only responding if the message object of the interaction is for this command. This is accomplished by checking the `i.message.id` and comparing it to the id of the message we just sent. But wait, you might think, we don't have the ID of the message we just sent, do we? And you would be right, as of right now, we don't. We need to make a small change: we can get the message object from the return value of `interaction.respond`. We also need to add an `interaction.defer` before `interaction.respond`. We won't go into details as for why we need to do this, just know it is due to how Discord interactions work.

:::warning
A mis-use of the interaction from the code that uses these interaction by using the ItemCollector can lead to unexpected behavior, so make sure to check the interaction "nature" before using it, like in our example by making sure it is related to our message.
:::

You might remember from before that we discussed the desired properties, and we now need to update them, we are now using `i.message` and we are using the `.id` of a message (`i.message.id`) so we need to add 2 lines to our list in the `src/index.ts`:

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

### Handling the menu

We now need to handle correctly the 3 buttons we declared before, as mentioned before Discord allows us to declare custom ids we can reference in our code, so let's start with that:

First we can implement the easiest buttons out of the 3, the save button. Since we are going to "live" edit a message after our menu message, we just need to delete the menu message, then we can remove the collector since we don't need it anymore

```ts
itemCollector.onItem(async i => {
  if (i.message?.id.toString() !== message.id) {
    return
  }

  // remove-next-line
  await i.respond('Hello world')

  // insert-start
  if (i.data?.customId === 'reactionRoles-save') {
    collectors.delete(itemCollector)

    await i.defer(true)
    await i.delete()

    return
  }
  // insert-end

  // REST OF YOUR CODE
})

// REST OF YOUR CODE
```

If we now try to click the save button, the menu will close, so we are done!

Let's move on the add and remove button. We have a new problem: we need a way to update the buttons shown in the final message, and we also need to know what reaction buttons the user has created up to this point.

Let's start with the second issue. We can store in an array all the buttons the user created:

```ts
// insert-next-line
let roles = [args.reactions.create]

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
        },
      ],
    },
  ],
})
```

Now we can deal with the first problem. We need to have something to create these button objects. We can do this by creating a pretty easy function that will:

- Create an action row array
- Add an action row if we have some buttons to add
- If we have reached the limit imposed by Discord (5 buttons per action row) it creates another action row and start using that

```ts
function getRoleButtons(
  roles: Array<{
    role: Role
    emoji: string
    color: ButtonStyles
    label?: string | undefined
  }>,
): ActionRow[] {
  const actionRows: ActionRow[] = []

  if (roles.length === 0) return actionRows

  // We add the components later, so we need to make typescript know that we are sure that it will be a compatibile components array
  actionRows.push({
    type: MessageComponentTypes.ActionRow,
    components: [] as unknown as ActionRow['components'],
  })

  for (const roleInfo of roles) {
    let actionRow = actionRows.at(-1)

    if (!actionRow) {
      throw new Error('Unable to get actionRow')
    }

    if (actionRow.components.length === 5) {
      actionRow = {
        type: MessageComponentTypes.ActionRow,
        components: [] as unknown as ActionRow['components'],
      }
      actionRows.push(actionRow)
    }

    actionRow?.components.push({
      type: MessageComponentTypes.Button,
      style: roleInfo.color,
      emoji: {
        name: roleInfo.emoji,
      },
      label: roleInfo.label,
      customId: `reactionRoles-role-${roleInfo.role.id}`,
    })
  }

  return actionRows
}
```

:::note
Remember to import all the types we are using. Some IDE/Text editors will offer an option to quickly fix the errors about the types not being found and import them
:::

Now we can use this function. Let's go back right after we declare the roles array

```ts
let roles = [args.reactions.create]

const roleMessage = await bot.helpers.sendMessage(interaction.channelId, {
  content: 'Pick your roles',
  // remove-start
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
        },
      ],
    },
  ],
  // remove-end
  // insert-next-line
  components: getRoleButtons(roles),
})
```

Now let's implement the remove button, as it is the next easiest one. To implement this we want to give the user the choice to select between an already exiting reaction roles buttons. To do this we can use a select menu:

```ts
itemCollector.onItem(async i => {
  if (i.message?.id.toString() !== message.id) {
    return
  }

  if (i.data?.customId === 'reactionRoles-save') {
    collectors.delete(itemCollector)

    await i.defer(true)
    await i.delete()

    return
  }

  // insert-start
  if (i.data?.customId === 'reactionRoles-remove') {
    const options: SelectOption[] = []

    for (const roleInfo of roles) {
      options.push({
        label: `${roleInfo.emoji} ${roleInfo.label}`,
        value: roleInfo.role.id.toString(),
      })
    }

    await i.defer(true)
    await i.edit({
      content: 'Select what reaction role to remove',
      components: [
        {
          type: MessageComponentTypes.ActionRow,
          components: [
            {
              type: MessageComponentTypes.SelectMenu,
              customId: 'reactionRoles-remove-selectMenu',
              maxValues: 1,
              minValues: 1,
              placeholder: 'Select roles',
              options,
            },
          ],
        },
      ],
    })

    return
  }
  // insert-end

  // REST OF YOUR CODE
})

// REST OF YOUR CODE
```

And now we need to add the code for the select menu:

```ts
if (i.data?.customId === 'reactionRoles-remove') {
  const options: SelectOption[] = []

  for (const roleInfo of roles) {
    options.push({
      label: `${roleInfo.emoji} ${roleInfo.label}`,
      value: roleInfo.role.id.toString(),
    })
  }

  await i.defer(true)
  await i.edit({
    content: 'Select what reaction role to remove',
    components: [
      {
        type: MessageComponentTypes.ActionRow,
        components: [
          {
            type: MessageComponentTypes.SelectMenu,
            customId: 'reactionRoles-remove-selectMenu',
            maxValues: 1,
            minValues: 1,
            placeholder: 'Select roles',
            options,
          },
        ],
      },
    ],
  })

  return
}

// insert-start
if (i.data?.customId === 'reactionRoles-remove-selectMenu') {
  const roleToRemove = i.data?.values?.[0]

  await i.defer(true)

  roles = roles.filter(roleInfo => roleInfo.role.id.toString() !== roleToRemove)

  await bot.helpers.editMessage(interaction.channelId, roleMessage.id, {
    components: getRoleButtons(roles),
  })

  await i.edit({
    content: 'Use the buttons in this message to edit the message below.',
    components: [messageActionRow],
  })

  return
}
// insert-end

// REST OF YOUR CODE
```

And now we are left just one thing, the add button. For this we now need to use a new type of interaction responses: modals

Modals are popups that we can create to require the user to input something, for example the emoji and (optionally) the label. To use them with the `interaction.respond` method we can add a `title` (a required property by modals) to the objects.

Other than emoji and labels, we also need the role to give and the color for the button. Unfortunately we can't add them directly in our modal, Discord does not allow it, so we need to find another way. We can

1. Wait for the button click on the add button
1. Show the user a select menu for the role
1. Show the user a select menu but for the color this time
1. Show the user the modal for the emoji and label
1. Create our new button

Since it's a multi-step process, we need to store the partial data of this new role, so let's start with that. We can add it right before our onItem call:

```ts
// REST OF YOUR CODE

// insert-next-line
let partialRoleInfo: Partial<(typeof roles)[number]> | undefined

itemCollector.onItem(async i => {
  // REST OF YOUR CODE
})

// REST OF YOUR CODE
```

Now we can start with the code for the button click and the 2 select menu as we already know how that code looks like:

```ts
if (i.data?.customId === 'reactionRoles-remove-selectMenu') {
  const roleToRemove = i.data?.values?.[0]

  await i.defer(true)

  roles = roles.filter(roleInfo => roleInfo.role.id.toString() !== roleToRemove)

  await bot.helpers.editMessage(interaction.channelId, roleMessage.id, {
    components: getRoleButtons(roles),
  })

  await i.edit({
    content: 'Use the buttons in this message to edit the message below.',
    components: [messageActionRow],
  })

  return
}

// insert-start
if (i.data?.customId === 'reactionRoles-add') {
  await i.defer(true)

  partialRoleInfo = {}

  await i.edit({
    content: 'Pick a role for the new reaction role',
    components: [
      {
        type: MessageComponentTypes.ActionRow,
        components: [
          {
            type: MessageComponentTypes.SelectMenuRoles,
            customId: 'reactionRoles-add-role',
            maxValues: 1,
            minValues: 1,
            placeholder: 'Select a role',
          },
        ],
      },
    ],
  })
  return
}

if (i.data?.customId === 'reactionRoles-add-role') {
  const roleToAdd = i.data?.resolved?.roles?.first()

  partialRoleInfo.role = roleToAdd

  await i.defer(true)
  await i.edit({
    content: 'Pick a color for the reaction role',
    components: [
      {
        type: MessageComponentTypes.ActionRow,
        components: [
          {
            type: MessageComponentTypes.SelectMenu,
            customId: 'reactionRoles-add-color',
            options: [
              { label: 'Blue', value: ButtonStyles.Primary.toString() },
              { label: 'Green', value: ButtonStyles.Success.toString() },
              { label: 'Grey', value: ButtonStyles.Secondary.toString() },
              { label: 'Red', value: ButtonStyles.Danger.toString() },
            ],
          },
        ],
      },
    ],
  })

  return
}

if (i.data?.customId === 'reactionRoles-add-color') {
  const color = parseInt(i.data?.values?.[0])

  partialRoleInfo.color = color

  await i.respond({
    content: 'Hello world',
  })

  return
}
// insert-end

// REST OF YOUR CODE
```

Now we're only missing the modal part. For now, we'll just put a "hello world" to verify that everything is working. To create a modal we need:

- A `title` - the title for the modal that the user will see
- A `components` array - Like for messages modals require us to give a action rows
- A `customId` - to identify the modal that the user submitted

```ts
if (i.data?.customId === 'reactionRoles-add-color') {
  const color = parseInt(i.data?.values?.[0])

  partialRoleInfo.color = color

  // remove-start
  await i.respond({
    content: 'Hello world',
  })
  // remove-end
  // insert-start
  await i.respond({
    title: 'Pick an emoji and label for the reaction role',
    components: [
      {
        type: MessageComponentTypes.ActionRow,
        components: [
          {
            type: MessageComponentTypes.InputText,
            style: TextStyles.Short,
            customId: 'reactionRoles-add-emoji',
            label: 'Emoji for the reaction role',
            required: true,
          },
        ],
      },
      {
        type: MessageComponentTypes.ActionRow,
        components: [
          {
            type: MessageComponentTypes.InputText,
            style: TextStyles.Short,
            customId: 'reactionRoles-add-label',
            label: 'Label for the reaction role [OPTIONAL]',
          },
        ],
      },
    ],
    customId: 'reactionRoles-add-modal',
  })
  // insert-end

  return
}
```

You might notice that we are using a new type of message component, the input text. These are just text field the user needs to fill. It have 2 styles, short (the one that we are using in this case) and paragraph. The only difference is that an input text of style paragraph is designed to accept a longer string.

Now we just need to handle the modal interaction and we will be done with the menu.

```ts
if (i.data?.customId === 'reactionRoles-add-color') {
  const color = parseInt(i.data?.values?.[0])

  partialRoleInfo.color = color

  await i.respond({
    title: 'Pick an emoji and label for the reaction role',
    components: [
      {
        type: MessageComponentTypes.ActionRow,
        components: [
          {
            type: MessageComponentTypes.InputText,
            style: TextStyles.Short,
            customId: 'reactionRoles-add-emoji',
            label: 'Emoji for the reaction role',
            required: true,
          },
        ],
      },
      {
        type: MessageComponentTypes.ActionRow,
        components: [
          {
            type: MessageComponentTypes.InputText,
            style: TextStyles.Short,
            customId: 'reactionRoles-add-label',
            label: 'Label for the reaction role [OPTIONAL]',
          },
        ],
      },
    ],
    customId: 'reactionRoles-add-modal',
  })

  return
}

// insert-start
if (i.data?.customId === 'reactionRoles-add-modal') {
  const emoji = i.data.components?.[0]?.components?.[0].value
  const label = i.data.components?.[1]?.components?.[0].value

  partialRoleInfo.emoji = emoji
  partialRoleInfo.label = label

  roles.push(partialRoleInfo)

  await bot.helpers.editMessage(interaction.channelId, roleMessage.id, {
    components: getRoleButtons(roles),
  })

  partialRoleInfo = undefined

  await interaction.edit({
    content: 'Use the buttons in this message to edit the message below.',
    components: [messageActionRow],
  })

  await i.respond(
    'Reaction role created successfully. You can use the message above to add/remove a role',
    { isPrivate: true },
  )

  return
}
// insert-end
```

And with this we are done with the menu. You might see that we are responding to the modal while in every other case we just edited the original message. The reason is that for modals the edit does not count as responding to it and you need to send a new message.

Finally, let's move to the handling of our role buttons

## Role buttons Handling

Let's move back to `src/events/interactionCreate.ts`. We need to add some code after the command handling:

```ts
if (interaction.type === InteractionTypes.ApplicationCommand) {
  if (!interaction.data) return

  const command = commands.get(interaction.data.name)
  if (!command) return

  try {
    await command.execute(interaction, commandOptionsParser(interaction))
  } catch (error) {
    console.error(error)
  }
}

// insert-add
if (
  interaction.type === InteractionTypes.MessageComponent &&
  interaction.data?.componentType === MessageComponentTypes.Button
) {
  if (!interaction.data?.customId?.startsWith('reactionRoles-role-')) return

  await interaction.respond('Hello world')
}
// insert-end
```

We are checking what message component interaction type we received, in this case if it's a button. We only need a couple of things from here:

1. Get the role id of the role we need to give the user
1. Assign it to them
1. Respond to the interaction

So let's do this:

```ts
if (
  interaction.type === InteractionTypes.MessageComponent &&
  interaction.data?.componentType === MessageComponentTypes.Button
) {
  if (!interaction.data?.customId?.startsWith('reactionRoles-role-')) return
  // insert-start
  const roleId = BigInt(
    interaction.data.customId.slice('reactionRoles-role-'.length),
  )

  await interaction.bot.helpers.addRole(
    interaction.guildId,
    interaction.user.id,
    roleId,
    `Reaction role button for role id ${roleId}`,
  )
  await interaction.respond(`I added to you the <@&${roleId}> role.`, {
    isPrivate: true,
  })
  // insert-end
}
```

In this final piece of code, we use some desired properties. Let's go to the `src/index.ts` file and add the last few lines of desired properties!

```ts
// REST OF YOUR CODE

// insert-next-line
bot.transformers.desiredProperties.user.id = true

bot.transformers.desiredProperties.message.id = true

bot.transformers.desiredProperties.interaction.id = true
bot.transformers.desiredProperties.interaction.data = true
bot.transformers.desiredProperties.interaction.type = true
// insert-next-line
bot.transformers.desiredProperties.interaction.user = true
bot.transformers.desiredProperties.interaction.token = true
bot.transformers.desiredProperties.interaction.message = true
// insert-next-line
bot.transformers.desiredProperties.interaction.guildId = true
bot.transformers.desiredProperties.interaction.channelId = true

bot.transformers.desiredProperties.role.id = true

// REST OF YOUR CODE
```

If we try to run the code, we will finally achieve what we want: A button that when clicked gives us the role, assuming that Discord did not return an error, which could be caused by Discord not allowing bots to add roles such as `@everyone`, roles created for bot permissions, roles that are obtained with link roles or roles that are above the bot hightest role.

One last thing we could do is removing the role if we already have it. We will need to add some code in the event and a few desired properties. Let's start with the event file `src/events/interactionCreate.ts`:

```ts
if (
  interaction.type === InteractionTypes.MessageComponent &&
  interaction.data?.componentType === MessageComponentTypes.Button
) {
  if (!interaction.data?.customId?.startsWith('reactionRoles-role-')) return
  const roleId = BigInt(
    interaction.data.customId.slice('reactionRoles-role-'.length),
  )

  // remove-start
  await interaction.bot.helpers.addRole(
    interaction.guildId,
    interaction.user.id,
    roleId,
    `Reaction role button for role id ${roleId}`,
  )
  await interaction.respond(`I added to you the <@&${roleId}> role.`, {
    isPrivate: true,
  })
  // remove-end
  // insert-start
  const alreadyHasRole = !!interaction.member.roles.find(
    role => role === roleId,
  )

  if (alreadyHasRole) {
    await interaction.bot.helpers.removeRole(
      interaction.guildId,
      interaction.user.id,
      roleId,
      `Reaction role button for role id ${roleId}`,
    )
    await interaction.respond(`I removed from you the <@&${roleId}> role.`, {
      isPrivate: true,
    })
    return
  }

  await interaction.bot.helpers.addRole(
    interaction.guildId,
    interaction.user.id,
    roleId,
    `Reaction role button for role id ${roleId}`,
  )
  await interaction.respond(`I added to you the <@&${roleId}> role.`, {
    isPrivate: true,
  })
  // insert-end
}
```

And now let's add the desired properties. In the `src/index.ts` we need just a few lines:

```ts
// REST OF YOUR CODE

bot.transformers.desiredProperties.user.id = true

bot.transformers.desiredProperties.message.id = true

// insert-next-line
bot.transformers.desiredProperties.member.roles = true

bot.transformers.desiredProperties.interaction.id = true
bot.transformers.desiredProperties.interaction.data = true
bot.transformers.desiredProperties.interaction.type = true
bot.transformers.desiredProperties.interaction.user = true
bot.transformers.desiredProperties.interaction.token = true
// insert-next-line
bot.transformers.desiredProperties.interaction.member = true
bot.transformers.desiredProperties.interaction.message = true
bot.transformers.desiredProperties.interaction.guildId = true
bot.transformers.desiredProperties.interaction.channelId = true

bot.transformers.desiredProperties.role.id = true

// REST OF YOUR CODE
```

If we test the code now, it should work. We just created a reaction role feature!

## Improvements

You might remember that we said there could be improvements to the collectors we have. Currently, if the user does not save the menu, we will have that collector class in memory until we restart the bot. This can be easily fixed by having a timeout on the collector, but that is something that you can explore on your own.

Also a more advanced thing that you can do is to generalize the collectors. We currently use the `Interaction` type for the methods implemented on it but we don't use them in any way. While we could use `any` or `unknown` instead, the best way is to generalize it using generics in typescript, so you can re-use that class without having to create another one.

In the main file (`src/index.ts`), we currently update the commands on every bot startup even if the commands haven't changed. This may cause you to hit the ratelimit for that API endpoint, especially in development where you might restart a lot your bot. You have a couple of options to fix it, such as moving the api request to another file and run that only when you update your commands. Another options is to check for the exiting commands, check if there are any changes and only then update your commands.

You could also move the various Discord objects to the bottom of the file and make them act like template if and when needed, but that is not a functional improvement but rather a maintainability one.

Also currently there are a few cases where this code could error. In fact, if you have a strict typescript configuration enabled, you might have noticed that typescript is giving you errors all over the place, especially in our command because stuff can be `undefined` and we don't check for it. To fix this you just need to add an `if` statement to ensure they exist, and if not, just return.

Also, the code will throw an error if there's no button and the user click the remove button, or if there are 25 buttons and the user click the add button.

A few of these things, to be exact the last 3, are implemented in the full example code you can find over the github repo [`/example/reaction-roles`](https://github.com/discordeno/discordeno/blob/main/examples/reaction-roles) folder that has the entire project for this guide.
