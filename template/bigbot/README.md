# Discordeno Big Bot Template

Support: <https://discord.gg/ddeno>

This template is designed for bots that aim or are already in millions of Discord servers.

## Setup

- Use the template generator button to make your own copy.
- Delete all the template folders except the `bigbot` folder.
- Move all files from the `bigbot` folder to the root of the project.
  - You may encounter an issue with .vscode but force move the files to the root of the project. We have setup special
    import maps in this template that should override the general .vscode folder already in the root folder.
- Rename the `.env.example` file to `.env`
- Fill out the `.env` file
- Go to `configs.ts` file and remove all the intents you don't want in your bot.

## Usage

- Always run the `rest` process first. `deno task rest`
- Start the `bot` process next. `deno task bot`
- Lastly, start the `gateway` process. `deno task gateway`

Note: The `gateway` process and `rest` are designed not to be shut off. So once those are on, the only thing you should
be doing is restarting your `bot` process.

## Details

### Translating Application Commands

The template supports translations for application commands. This is possible using guild commands. If you use global
commands, translations will not work and will default to english.

If you prefer a different default(not english), please use the Find And Replace to change the `'english'` everywhere
necessary.

#### Autocomplete & Type Checking

One cool thing about the translations is that you will get autocomplete and type checking built in for all the keys.
This will ensure you do not miss a key to be translated. It will also make it easier to code by providing the
autocomplete functionality.

### Updating Application Commands

The template is designed in a way that you will no longer need to worry about updating or maintaing your commands.

- Global Commands: For simplicity you can add a line in mod.ts to update them globally. This generally takes 1 call and
  isn't a deal breaker.
  - `/update global` is also available on your development server, to trigger manually.
- Guild Commands: This is a bit more complicated. By default, our system will update guild commands on demand! Instead
  of making a million requests for all your servers, we will update them as needed.

**Guild Commands Kwik & Command Versioning**

For Global Commands you can make 1 request to api to update all commands on restart. Its not a big deal. But with Guild
commands essentially you need to make a request per guild. This can get spammy. That would be crazy. To solve this we
created the concept of `commandVersions`. This basically will decide whether or not guild commands should be updated.

Kwik is a file based database I used in order to make this setup easy and allow any dev using this template to use a
database of their choice for their bot. I do not recommend using Kwik as your database. Please add a full database of
your choice for your bot. You can even replace Kwik should you choose in the database folder.

Process:

1. You update your command options/args or create new commands etc...
2. Increment the `CURRENT_SLASH_COMMAND_VERSION` in `src/database/commandVersion.ts`

- I recommend moving this into your database so you can build a dev command or eval and update this on the fly as you
  wish.

3. Now whenever a guild emits any event, this will make sure to update the guild commands if necessary. If it already
   has the latest commands, it will just ignore. If it was never updated or is using an outdated version, it will update
   it.

Aside from the automated system, there is also the option of `/update guild id` to update a guild manually.
