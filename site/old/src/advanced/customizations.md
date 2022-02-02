# Customizing Discordeno

This guide is only for extremely advanced developers. This feature is extremely
powerful but comes with huge risks. When I was building Discordeno, there was
always one goal I had in my mind that I wanted because when I used other
libraries I always felt this was missing. I hated forking a library just to
customize it as then it made staying up to date a much larger hassle. Discordeno
was designed with customizability in mind. A vast majority of the library can be
overridden allowing you to make it work however you would like for your bot.

## Customizing Structures

Discordeno provides the ability to customize structures. You have the ability to
override the function that creates the structures inside Discordeno. **THIS DOES
NOT MODIFY THE PROTOTYPE!** I wanted to make sure that Discordeno handled this
without encouraging bad practices such as prototype pollution which can make
your bots inherintly unstable and unpredictable. Discordeno allows you to take
control over the functions that create the structures.

### Customizing Member Structure

Let's take into consideration that you wanted to add some custom properties to
the member structure. For instance, let's add a couple of properties that could
help make working with the bot easier such as `member.tag`, `member.guild`,
`member.avatarURL`. We are going to add these, simple as an example for the
purpose of this guide. Please note, that these don't exist in the library itself
because they take up quite a bit of RAM/memory since as your bot grows you can
hit millions of members which adds up to GB of memory. Keeping this minimal can
help allow your bots to grow larger without increasing the cost. However, if you
are advanced enough and feel adding/customizing the structures is necessary then
this feature allows you to do that.

To begin customizing, create a file in the structures folder called `member.ts`.
The name of the file is not important at all.

```ts
async function createMemberStruct() {
}
```

We start by declaring a function that will be run to create the structure. Once
again the name here is not important. The function must take the same arguments
that the internal function takes. In this case the createMemberStruct function
takes 2 arguments. `data: MemberCreatePayload, guildID: string`

```ts
async function createMemberStruct(data: MemberCreatePayload, guildID: string) {
}
```

The next step is to fill in this function. You can make this do whatever you
want. My recommendation is to start by copying the current code from the
internal libraries structure.

```ts
async function createMemberStruct(data: MemberCreatePayload, guildID: string) {
  const {
    joined_at: joinedAt,
    premium_since: premiumSince,
    ...rest
  } = data;

  const {
    mfa_enabled: mfaEnabled,
    premium_type: premiumType,
    ...user
  } = data.user || {};

  const member = {
    ...rest,
    // Only use those that we have not removed above
    user,
    /** When the user joined the guild */
    joinedAt: Date.parse(joinedAt),
    /** When the user used their nitro boost on the server. */
    premiumSince: premiumSince ? Date.parse(premiumSince) : undefined,
    /** The guild id where this member exists */
    guildID,
    /** Whether or not this user has 2FA enabled. */
    mfaEnabled,
    /** The premium type for this user */
    premiumType,
  };

  return member;
}
```

Now we have a base to work with. We can now add a `tag`, `avatarURL`, `mention`,
and `guild` properties to the member.

```ts
import { rawAvatarURL } from "../../deps.ts";

async function createMemberStruct(data: MemberCreatePayload, guildID: string) {
  // Hidden code here to make it easier to see the changes

  const member = {
    ...rest,
    // Hidden code here to make it easier to see the changes

    /** The premium type for this user */
    premiumType,
    /** The username#discriminator tag for this member. */
    tag: `${user.username}#${user.discriminator}`,
    /** The avatarURL made easily accessible */
    avatarURL: rawAvatarURL(data.id, user.discriminator, user.avatar),
    /** The guild object for where this member is located */
    guild: await cacheHandler.get("guilds", guildID),
    /** Easily mention the member */
    mention: `<@${data.user.id}>`,
  };

  return member;
}
```

Now we need to use this function and telling Discordeno to override the internal
createMemberStruct function. To do this, we will modify the internal functions.
This is where we reassign the value of the function.

```ts
structures.createMemberStruct = createMemberStruct;
```

Awesome. Now, we have one more step to complete which is to declare these new
properties on our typings for the member structure. At the bottom, of the file
we will write the following code.

```ts
declare module "../../deps.ts" {
  interface Member {
    tag: string;
    avatarURL: string;
    guild: Guild;
    mention: string;
  }
}
```

> **Important:** when you modify structures, it is important to restart the bot
> so it takes effect on all members that have already be constructed.

The code should look like this right now:

```ts
async function createMemberStruct(data: MemberCreatePayload, guildID: string) {
  const {
    joined_at: joinedAt,
    premium_since: premiumSince,
    ...rest
  } = data;

  const {
    mfa_enabled: mfaEnabled,
    premium_type: premiumType,
    ...user
  } = data.user || {};

  const member = {
    ...rest,
    // Only use those that we have not removed above
    user,
    /** When the user joined the guild */
    joinedAt: Date.parse(joinedAt),
    /** When the user used their nitro boost on the server. */
    premiumSince: premiumSince ? Date.parse(premiumSince) : undefined,
    /** The guild id where this member exists */
    guildID,
    /** Whether or not this user has 2FA enabled. */
    mfaEnabled,
    /** The premium type for this user */
    premiumType,
    /** The username#discriminator tag for this member. */
    tag: `${user.username}#${user.discriminator}`,
    /** The avatarURL made easily accessible */
    avatarURL: rawAvatarURL(data.id, user.discriminator, user.avatar),
    /** The guild object for where this member is located */
    guild: await cacheHandler.get("guilds", guildID),
    /** Easily mention the member */
    mention: `<@${data.user.id}>`,
  };

  return member;
}

structures.createMemberStruct = createMemberStruct;

declare module "../../deps.ts" {
  interface Member {
    tag: string;
    avatarURL: string;
    guild: Guild;
    mention: string;
  }
}
```

#### Removing Properties

Now, that we have added the properties we want, we can discuss how to remove
properties we don't want. Remember every property that exists on member can
become very expensive as your bot grows.

To do a little easy math, let's suppose we had 1,000,000 member objects. Each
one of them could possibly store an avatar string which can take up about 32
bytes. Now that comes to a total of around 32MB for every 1 million members.

Now let's go ahead and delete the `avatar`, `username` and `discriminator`
strings since we already used them and don't really want them to be duplicated
as we will never need their raw counterparts in our bot(Note: You may in your
bot and this is why this is an advanced feature. Decide carefully what you wish
to add or remove). In fact, for the purposes of this guide let's go a little
crazy and remove everything we don't specifically want to have.

The following is the current base data available to us when we create the
member.

```ts
user: {
    /** The user's id */
    id: string;
    /** the user's username, not unique across the platform */
    username: string;
    /** The user's 4 digit discord tag */
    discriminator: string;
    /** The user's avatar hash */
    avatar: string | null;
    /** Whether the user is a bot */
    bot?: boolean;
    /** Whether the user is an official discord system user (part of the urgent message system.) */
    system?: boolean;
    /** Whether the user has two factor enabled on their account */
    mfa_enabled?: boolean;
    /** the user's chosen language option */
    locale?: string;
    /** Whether the email on this account has been verified */
    verified?: boolean;
    /** The user's email */
    email?: string;
    /** The flags on a user's account. */
    flags?: number;
    /** The type of Nitro subscription on a user's account. */
    premium_type?: number;
  },
  /** The user's guild nickname if one is set. */
  nick?: string;
  /** Array of role ids that the member has */
  roles: string[];
  /** When the user joined the guild. */
  joined_at: string;
  /** When the user used their nitro boost on the server. */
  premium_since?: string;
  /** Whether the user is deafened in voice channels */
  deaf: boolean;
  /** Whether the user is muted in voice channels */
  mute: boolean;
```

Let's just keep `nick`, `roles`, `joinedAt`, `bot` and `id` plus the new stuff
we have added above.

```ts
import {
  cacheHandlers,
  Guild,
  MemberCreatePayload,
  rawAvatarURL,
} from "../../deps.ts";

async function createMemberStruct(data: MemberCreatePayload, guildID: string) {
  const {
    id,
    bot,
    username,
    discriminator,
    avatar,
    ...user
  } = data.user || {};

  return {
    id,
    bot,
    nick: data.nick,
    roles: data.roles,
    joinedAt: Date.parse(data.joined_at),
    tag: `${username}#${discriminator}`,
    avatarURL: rawAvatarURL(id, discriminator, avatar),
    guild: await cacheHandlers.get("guilds", guildID),
    mention: `<@${id}>`,
  };
}

structures.createMemberStruct = createMemberStruct;

declare module "../../deps.ts" {
  interface Member {
    bot: boolean;
    tag: string;
    avatarURL: string;
    guild: Guild;
    mention: string;
  }
}
```

You might be seeing an error on `structures.createMemberStruct`. This is
happening because our new member structures is modifying/removing existing
properties that the lib internally said it would have. To solve this, simply
just add a ts-ignore above it as you know better than TS that the typings are
being overwritten.

```ts
// @ts-ignore
structures.createMemberStruct = createMemberStruct;
```

## Custom Cache

One of the features that Discordeno has is the ability to customize the cache.
In order to do this, we will simply override the cache handlers. For the
purposes of this guide, we are going to use Redis for our custom cache solution.
You can use anything you like, this guide purpose is just to teach the basics of
how to customize. We will not be discussing how to use Redis.

```ts
import { cacheHandlers } from "../../../deps.ts";

cacheHandlers.has = async function (table, key) {
  return Redis.tables(table).has(key);
};
```

This code now overrides the `has` method which will check from Redis. The basic
concept is that the function `has` takes a table name and a key. The `has`
method returns whether or not a value exists. You can do anything you like
inside this function, like connecting to a database or any other solution you
would like to use.

Similarily, since we want to use Redis we would want to customize all the
methods on the cacheHandlers. The current list of methods available are:

- has
- get
- delete
- clear
- set
- forEach

## Custom Gateway Payload Handling (Handlers)

Handlers are one of the most powerful features of Discordeno. They allow you to
take control of how Discordeno handles the Discord payloads from the gateway.
When an event comes in, you can override and control how you want it to work.
For example, if your bot does not use emojis at all, you could simply just take
control over the GUILD_EMOJIS_UPDATE event and prevent anyone from caching any
emojis at all. Another example, is if you are building a custom module/framework
around Discordeno and you want to provide more custom events such as when
someone boosts the server or some other custom event this is possible as well.

Someone once asked if it was possible to make Discordeno, show the number of
users currently typing in the server. He had managed to build this himself in
his bot, but he wanted to do it inside the library itself. In order to keep
Discordeno minimalistic and memory efficient I avoided adding this. So let's see
how we could achieve this same thing:

```ts
import { eventHandlers, handlers, TypingStartPayload } from "../../../deps.ts";

const typingUsers = new Map<String, number>();

function createTimeout(userID: String) {
  return setTimeout(() => {
    typingUsers.delete(userID);
  }, 10000);
}

handlers.TYPING_START = function (data) {
  const payload = data.d as TypingStartPayload;
  eventHandlers.typingStart?.(payload);

  if (typingUsers.has(payload.user_id)) {
    clearTimeout(typingUsers.get(payload.user_id));
  }

  typingUsers.set(payload.user_id, createTimeout(payload.user_id));
};
```

This is just a basic example but it's true potential is only limited by your
imagination. I would love to see what you all can create.

Something worth noting about why Discordeno handlers are so amazing is that it
allows you to never depend on me. When Discord releases something new, you don't
need to wait for me to update the library to access it. Without handlers, if you
wanted access to a feature you would need to wait for the library to be updated
or have to fork it, modify it and modify your code for it. Then when the library
does get updated, you need to switch back to it and modify your code again
possibly to how the lib designed it. With handlers, you never have to fork or
anything. Just take control!

Remember with great power comes great bugs!
