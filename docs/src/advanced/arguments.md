# Command Arguments

Command Arguments is a really cool and powerful feature that will parse,
validate and handle arguments for your commands. Sometimes, you want certain
commands to have arguments provided. For example, in a `ban` command, you will
need a `member` and an optional reason to ban them. Discordeno will handle this
for you even before the code reaches your commands execution.

## Built-In Arguments

Discordeno comes with the most useful command arguments already built for you.
The command arguments can be found in the `src/arguments` folder.

### General

- `string` A valid **1 word** string with atleast 1 character. This is the
  default argument type. If you don't provide a type, it will use string
- `...string` Sometimes you will want strings but with more than 1 word. For
  example, in our ban command we will need a longer reason argument. For that we
  use `...string`. Note, this should always be your FINAL argument.
- `boolean` When you want the user to provide `true` or `false`. This also
  supports `on` or `off`.
- `command` When you want a command name or an command alias.
- `duration` When you want the user to provide a string like `12d2h5m`. This
  will be converted to milliseconds for you.
- `guild` When you want a guild object and the user provides a guild id.
- `member` When you want a member object and the user can provide a member id,
  @mention or their username/nickname.
- `number` When you want a number.
- `role` When you want a role object. The user can provide the role id, mention
  or role name.
- `snowflake` When you just want a snowflake. A snowflake is an ID generation
  format from Twitter that Discord uses to make their IDs unique. These IDs do
  never change and are used to identify users, guilds, emojis, and more.
- `...snowflakes` When you want to check if the mentioned ID is a valid
  snowflake. Note that this is similar to ...string, it will take all coming
  arguments and check them. This should always be your FINAL argument.
- `subcommand` When your command has subcommands.

### Channels

- `categorychannel` Must be a category channel id or name or mention.
- `newschannel` Must be a news channel id or name or mention.
- `textchannel` Must be a text channel id or name or mention.
- `voicechannel` Must be a voice channel id or name or mention.

Any of these can be easily modified, in their files. Let's go ahead and try and
modify one of the command arguments as an example.

## Modifying Existing Command Arguments

Suppose you wanted to make it possible so that the boolean argument could accept
other options as well. By default, it supports:

- `true` and `on` which will be true
- `false` and `off` which will be false

What if we also wanted to support, `yes` and `no`? Let's open up the
`boolean.ts` file in the arguments folder and get started.

```ts
import { botCache } from "../../deps.ts";

botCache.arguments.set("boolean", {
  name: "boolean",
  execute: function (_argument, parameters) {
    const [boolean] = parameters;

    const valid = ["true", "false", "on", "off"].includes(boolean);
    if (valid) return ["true", "on"].includes(boolean);
  },
});
```

Simply update the code so it looks like the following:

```ts
import { botCache } from "../../deps.ts";

botCache.arguments.set("boolean", {
  name: "boolean",
  execute: function (_argument, parameters) {
    const [boolean] = parameters;

    const valid = ["true", "false", "on", "off", "yes", "no"].includes(boolean);
    if (valid) return ["true", "on", "yes"].includes(boolean);
  },
});
```

Awesome. You just managed to modify one of the existing command arguments. But
what if we wanted to create our own custom command argument. Let's do that next.

## Creating A Command Argument

Let's create a command argument for the purposes of this guide so we can learn
how to create one. For example, let's say we wanted a command argument for urls.

First, we need to update the **CommandArgument** interface in
`src/types/commands.ts`.

- Add your argument type to the list of types in the interface. In this case we
  will add **"url"**. You can add it in any order here you like. The specific
  order does not matter.
- Once that's done, we can go and create the code for it. Now, lets create a new
  file in `src/arguments` folder called `url.ts` and paste the base snippet for
  a command argument below.

```ts
import { botCache } from "../../deps.ts";

botCache.arguments.set("argumentname", {
  name: "argumentname",
  execute: async function (argument, parameters, message) {
    // Your code goes here
  },
});
```

First let's change the `argumentname` to be `url`. Then we can start adding the
pseudo-code.

```ts
import { botCache } from "../../deps.ts";

botCache.arguments.set("url", {
  name: "url",
  execute: async function (argument, parameters, message) {
    // Get the provided parameter

    // The regex we will use to test if it's a valid url

    // Use the regex to test if it is a valid url
  },
});
```

Now we can get started.

```ts
import { botCache } from "../../deps.ts";

botCache.arguments.set("url", {
  name: "url",
  execute: async function (argument, parameters, message) {
    // Get the provided parameter
    const [url] = parameters;
    if (!url) return;

    // The regex we will use to test if it's a valid url
    const urlRegex =
      /^((https?):\/\/)?([w|W]{3}\.)*[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    // Use the regex to test if it is a valid url
    const validURL = urlRegex.test(url);
    if (!validURL) return;

    return url;
  },
});
```

Feel free to use any other regex you prefer. There are so many URL regexes out
there. Use the one that fits you best.
[URL Regex Comparison](https://mathiasbynens.be/demo/url-regex)

Awesome! You just created your very own command argument. Now let's check out
how to use command arguments.

## Using Command Arguments

When you create a command, you have the option to provide an array of command
arguments using the `arguments` property on a command. A CommandArgument must
follow the following rules.

```ts
arguments:
[
  // Each argument goes here
  {
    // This is required. You can name it anything you like. This will be used when you want to access the properties. For example, `args.url` will be done to use this argument when the command code is written.
    name: "url",
    // This is optional. It will default to string. There are various types available and will be shown to you through auto-completion. For our case, let's use the `url` argument we just created.
    type: "url",
    // This is optional. A function can be provided which is executed when the user does not provide a valid argument.
    missing: function (message) {
      // Useful for sending a response to the user saying x thing wasnt provided properly.
    },
    // This is optional. By default this is set to true. If this is true and a command was NOT provided, the command will not be executed UNLESS a defaultValue was provided.
    required: true,
    // This is optional. The default is false. If the type was a string or ...string, this can forcibly lowercase the string.
    lowercase: true,
    // This is optional BUT it is required if the type is subcommand.  When you have a type of string or subcommand you can sometimes want very specific keywords like `add` or `remove`.
    literals: ["add", "remove"],
    // This is optional. If a argument is not provided it can be given a default argument. Useful for a default subcommand if you wish.
    defaultValue: "my default value here",
  },
];
```

We already covered using the arguments in a command in our guide when we created
the role command, so we can skip that here. To re-read that you can check it out
[here](https://discordeno.mod.land/stepbystep/createcommand.html#arguments).

Command arguments are an extremely powerful feature that can help make creating
bots a lot easier. Discordeno provides extremely flexible command arguments. As
a side benefit, command arguments are designed to be hot reloadable from the
reload command. 🎉
