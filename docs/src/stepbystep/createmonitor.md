# Creating Monitors!

Holy bananza! You even got the entire languages complete. You are well on your
way to mastering 23 different languages. Now we are going to down and dirty with
monitors.

## What is a monitor?

Monitors are functions that will run on every single message that is sent in
every channel that your bot has permissions to read. When you want to do
something on every single message that is sent, the best way to do that is to
create a new monitor.

## Command Handler Monitor

Discordeno come built with a monitor called `commandHandler`. This monitor runs
on every message sent and figures out if it is a command and executes the
command. If it is a valid command with a valid prefix, Discordeno runs that
command.

Let's try and create our own monitor so we can understand it better. Suppose we
wanted to build a filter that would delete any message which included a discord
invite link.

## Creating Invite Filter Monitor

To start, we make a new file in the monitors folder called `inviteFilter.ts`.
Then you can paste in the following base monitor snippet.

```ts
import { botCache } from "../../deps.ts";

botCache.monitors.set("monitorname", {
  name: "monitorname",
  ignoreBots: true,
  ignoreOthers: false,
  ignoreEdits: false,
  ignoreDM: true,
  userServerPermissions: [],
  userChannelPermissions: [],
  botServerPermissions: [],
  botChannelPermissions: [],
  execute: async function (message) {
    // Your code goes here
  },
});
```

## Understanding Monitor Options

The monitor options are very similar in functionality with the command options.

### Monitor Name

Similar to the command name, we will specify a unique name for the monitors. In
this case let's call it inviteFilter

```ts
botCache.monitors.set("inviteFilter", {
	name: "inviteFilter",
```

### Ignore Options

The ignore options are filters that you can use to enable/disable the monitor
from running in those specific circumstances. The default option for each
monitor is shown in the base snippet above.

- **ignoreBots**: Should this monitor run on a message sent by a bot. In our
  example, if we set this false then no bot would be allowed to post links in
  the server. Since we don't want other bot's posting invite links either we can
  simply just set this to `false`.
- **ignoreOthers**: Should this monitor run on other USERS. If we set this as
  false, then any user will not be allowed to post discord links. Since the
  default option for this is already `false`, let's go ahead and just delete
  this line.
- **ignoreEdits**: Should this monitor run on edited messaged. If we set this as
  false, then it would also be filtering messages that are edited. It would be
  important to prevent users from editing a message and posting a discord invite
  link so let's keep this `false`. Since the default is false, we can just
  delete this line.
- **ignoreDM**: Should this monitor run on direct messages. If we set this as
  false, then this monitor would not run when the bot is sent a dm. Since we
  don't care if the users send our bot a dm with an invite link we can just
  simply set this to `true` Since the default is `true` for this option we can
  simple delete this line.

The default options were chosen for what the majority of monitors will use to
help keep your code clean and clear.

## Permission Options

The permission options are the exact same from the commands guide. These options
first make sure that either the bot or user has those necessary permissions to
run this monitor. For example, our invite filter would mean we need **MANAGE
MESSAGES** permission so we can delete messages sent with an invite URL.

```ts
botChannelPermissions:
["MANAGE_MESSAGES"];
```

## Adding The Code

```ts
import { botCache, deleteMessage } from "../../deps.ts";
import { translate } from "../utils/i18next.ts";

botCache.monitors.set("inviteFilter", {
  name: "inviteFilter",
  ignoreBots: false,
  botChannelPermissions: ["MANAGE_MESSAGES"],
  execute: async function (message) {
    // Use a regex to test if the content of the message has a valid discord invite link
    const hasInviteLink =
      /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/
        .test(message.content);
    // If the message does not have an invite link cancel out.
    if (!hasInviteLink) return;

    // This message has an invite link, so delete the message.
    try {
      // Delete the invite link
      message.delete(
        translate(message.guildID, `monitors/invitefilter:DELETE_REASON`),
      );
      // Send a message to the user so they know why the message was deleted. Then delete the response after 5 seconds to prevent spam.
      message.alertResponse(
        translate(
          message.guildID,
          "monitors/invitefilter:DELETE_ALERT_MESSAGE",
        ),
        5,
      );
    } catch (error) {
      return botCache.eventHandlers.discordLog(error);
    }
  },
});
```

Nice! Now take some time and add these translation keys to their appropriate
files. Once, you are ready, let's jump into creating some command inhibitors.
