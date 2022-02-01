# Creating Languages!

Woot! You have mastered Discordeno events already. Now it's time to finally make
our bot multi-lingual. Vàmanos!

## What Is A Discordeno Language?

A Discordeno language is a folder that will hold all our responses that the bot
sends. By having various different language files you can have a multi-lingual
bot that can be used in different languages.

## i18next

By default, Discordeno comes built with support for i18next (one of if not the
best localization libraries). If you want to learn more, go to
[i18next website](https://www.i18next.com/). For now, there is probably not
going to be anything you will need to learn there. As most of the functionality
has already been created for you right here in Discordeno.

## Default Language

The default language with Discordeno is American English which uses the name
`en_US`. So when you open the `src/languages/` folder you will find a folder
called `en_US`. This is where all the strings can be kept for your bot that can
be easily translated by other translators.

## Understanding The Folder Structure

The first folder inside the languages folder must be a language folder following
the name pattern like `en_US`. So for example, if we wanted to add a Spanish
(Spain) language to our bot we would create a new folder called `es_ES`.

You can have as many folder in here as you like. For example I can do something
like `src/languages/en_US/commands/fun/hug.json`. Notice that I have created
categories to help keep them categorized and easier to find. You can do it
however you wish to have them. For now, just remember that files must always be
`.json` files in these folders. **JSON is required.**

## Adding Hug Strings

Earlier in the guide, we made a hug command. So let's make that commands
translations work properly now.

- Create the `hug.json` file in the `src/languages/en_US/commands/fun/` folder.

```json
{
  "DESCRIPTION": "Hug yourself or another user."
}
```

Most of the time, you should start with this base. The `DESCRIPTION` key, is
used in the help command and provides the description for the command. When
someone types `!help hug` they would see this description you typed.

In our hug command we also had 2 other keys we used. `SELF` and `OTHER` so let's
add those in.

```json
{
  "DESCRIPTION": "Hug yourself or another user.",
  "SELF": "If you had no one to hug you could have hugged me. Years from now, when you're thinking about me, you're gonna say: 'How did I ever get along without that wonderful, constant companion?' *Woof.*",
  "OTHER": "{{user}} was hugged by {{mention}}"
}
```

Now the `"SELF"` is pretty easy to understand but the `OTHER` has some
interesting things in it so let's jump into that.

## Translate Function

Discordeno provides you a built in function called `translate`. It takes in 3
different arguments.

- `guildId` the id of the server. This is used to determine which language to
  use.
- `key` the unique folderpath:KEY string that will determine which string to
  translate.
- `options` the variables that the strings have available to them.

i18next allows you to pass in variables that you can use when you want in your
strings. If you recall from our guide ealier we passed in 2 variables.

```ts
translate(
  message.guildId,
  `commands/fun/${data.name}:${type}`,
  { mention: message.member!.mention, user: member.mention },
);
```

Here we can see that we passed in:

- `mention`: The user mention who used this command. `!hug`
- `user`: The user mention of the member who was @ by the command author.
  `!hug @o'neill`

## Variables

::: v-pre Variables in i18next use the `{{}}` format. So the variable `mention`
would be used by doing `{{mention}}` :::

## Key Rules

When you create keys in the files there are a couple rules to follow.

- Never use `:` in your key name. **REQUIRED**
- ALWAYS USE UPPERCASE **OPTIONAL**
- Words are separated by `_` **OPTIONAL**

The first one is the only one that is mandatory. The other two are recommended
for you.

## Missing Keys

Every developer forgets stuff sometimes. When you forget to translate a key, it
will be marked as a missing key and you would be alerted if you have provided a
channelID in the configs file, and it will also be logged in your console.

## Spanish Version

Let's just create a spanish version of the hug command from above to see an
example of different languages.

- Create a file called `hug.json` in the folder
  `src/languages/es_ES/commands/fun/`

```json
{
  "DESCRIPTION": "Abrázate a ti mismo oa otro usuario",
  "SELF": "Si no tuvieras a nadie a quien abrazar, podrías haberme abrazado. Años a partir de ahora, cuando estés pensando en mí, dirás: '¿Cómo me las arreglé sin esa maravillosa y constante compañera?' *Guau.*",
  "OTHER": "{{user}} fue abrazado por {{mention}}"
}
```

Notice, that there are 2 thing that were **NOT** translated. The `KEY` names and
the `VARIABLES`. These 2 things should never be translated. Anything else can be
translated upon your needs.

## Localization Platform

i18next works perfectly with localization platforms. For example, you can easily
plug in `crowdin` or `transifex` to your project.

- [Transifex](https://www.transifex.com/) _This is the one I use in my bot but
  you can use anything you like._
- [Crowdin](https://crowdin.com/)

## Challenge

Wow! You have even masted languages. Go ahead and jump back to the role command
we made earlier and add translation support to it. Give it some love!

Once you are ready, let's go make our first monitor.
