import { botId } from "../../src/bot.ts";
import { cache } from "../../src/cache.ts";
import { cloneChannel } from "../../src/helpers/channels/clone_channel.ts";
import { createChannel } from "../../src/helpers/channels/create_channel.ts";
import { DiscordChannelTypes } from "../../src/types/channels/channel_types.ts";
import { DiscordOverwriteTypes } from "../../src/types/channels/overwrite_types.ts";
import { CreateGuildChannel } from "../../src/types/guilds/create_guild_channel.ts";
import { bigintToSnowflake } from "../../src/util/bigint.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { delayUntil } from "../util/delay_until.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";

async function ifItFailsBlameWolf(options: CreateGuildChannel, useGetter = false, reason?: string) {
  const channel = await createChannel(tempData.guildId, options);

  const cloned = useGetter ? await channel.clone(reason) : await cloneChannel(channel.id, reason);

  //Assertations
  assertExists(cloned);
  assertEquals(cloned.type, channel.type);

  // Delay the execution to allow CHANNEL_CREATE event to be processed
  await delayUntil(10000, () => cache.channels.has(cloned.id));

  if (!cache.channels.has(cloned.id)) {
    throw new Error(`The channel seemed to be cloned but was not cached.`);
  }

  if (channel.topic && cloned.topic !== channel.topic) {
    throw new Error("The clone was supposed to have a topic but it does not appear to be the same topic.");
  }

  if (channel.bitrate && cloned.bitrate !== channel.bitrate) {
    throw new Error("The clone was supposed to have a bitrate but it does not appear to be the same bitrate.");
  }

  if (channel.permissionOverwrites && cloned.permissionOverwrites?.length !== channel.permissionOverwrites.length) {
    throw new Error(
      "The clone was supposed to have a permissionOverwrites but it does not appear to be the same permissionOverwrites."
    );
  }
}

Deno.test({
  name: "[channel] clone a new text channel",
  async fn() {
    await ifItFailsBlameWolf({ name: "Discordeno-clone-test" });
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new text channel w/reason",
  async fn() {
    await ifItFailsBlameWolf({ name: "Discordeno-clone-test" }, false, "w/reason");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new category channel",
  async fn() {
    await ifItFailsBlameWolf({
      name: "Discordeno-clone-test",
      type: DiscordChannelTypes.GuildCategory,
    });
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new category channel w/reason",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        type: DiscordChannelTypes.GuildCategory,
      },
      false,
      "w/reason"
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new voice channel",
  async fn() {
    await ifItFailsBlameWolf({
      name: "Discordeno-clone-test",
      type: DiscordChannelTypes.GuildVoice,
    });
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new voice channel w/reason",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        type: DiscordChannelTypes.GuildVoice,
      },
      false,
      "w/reason"
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new voice channel with a bitrate",
  async fn() {
    await ifItFailsBlameWolf({
      name: "discordeno-clone-test",
      type: DiscordChannelTypes.GuildVoice,
      bitrate: 32000,
    });
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new voice channel with a bitrate w/reason",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "discordeno-clone-test",
        type: DiscordChannelTypes.GuildVoice,
        bitrate: 32000,
      },
      false,
      "w/reason"
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new voice channel with a user limit",
  async fn() {
    await ifItFailsBlameWolf({
      name: "Discordeno-clone-test",
      type: DiscordChannelTypes.GuildVoice,
      userLimit: 32,
    });
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new voice channel with a user limit w/reason",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        type: DiscordChannelTypes.GuildVoice,
        userLimit: 32,
      },
      false,
      "w/reason"
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new text channel with a rate limit per user",
  async fn() {
    await ifItFailsBlameWolf({
      name: "Discordeno-clone-test",
      rateLimitPerUser: 2423,
    });
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new text channel with a rate limit per user w/reason",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        rateLimitPerUser: 2423,
      },
      false,
      "w/reason"
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new text channel with NSFW",
  async fn() {
    await ifItFailsBlameWolf({ name: "Discordeno-clone-test", nsfw: true });
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new text channel with NSFW w/reason",
  async fn() {
    await ifItFailsBlameWolf({ name: "Discordeno-clone-test", nsfw: true }, false, "w/reason");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new text channel with permission overwrites",
  async fn() {
    await ifItFailsBlameWolf({
      name: "Discordeno-clone-test",
      permissionOverwrites: [
        {
          id: bigintToSnowflake(botId),
          type: DiscordOverwriteTypes.Member,
          allow: ["VIEW_CHANNEL"],
          deny: [],
        },
      ],
    });
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone a new text channel with permission overwrites",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        permissionOverwrites: [
          {
            id: bigintToSnowflake(botId),
            type: DiscordOverwriteTypes.Member,
            allow: ["VIEW_CHANNEL"],
            deny: [],
          },
        ],
      },
      false,
      "w/reason"
    );
  },
  ...defaultTestOptions,
});

// GETTERS

Deno.test({
  name: "[channel] clone() a new text channel",
  async fn() {
    await ifItFailsBlameWolf({ name: "Discordeno-clone-test" }, true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new text channel w/reason",
  async fn() {
    await ifItFailsBlameWolf({ name: "Discordeno-clone-test" }, true, "w/reason");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new category channel",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        type: DiscordChannelTypes.GuildCategory,
      },
      true
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new category channel w/reason",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        type: DiscordChannelTypes.GuildCategory,
      },
      true,
      "w/reason"
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new voice channel",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        type: DiscordChannelTypes.GuildVoice,
      },
      true
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new voice channel w/reason",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        type: DiscordChannelTypes.GuildVoice,
      },
      true,
      "w/reason"
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new voice channel with a bitrate",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "discordeno-clone-test",
        type: DiscordChannelTypes.GuildVoice,
        bitrate: 32000,
      },
      true
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new voice channel with a bitrate w/reason",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "discordeno-clone-test",
        type: DiscordChannelTypes.GuildVoice,
        bitrate: 32000,
      },
      true,
      "w/reason"
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new voice channel with a user limit",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        type: DiscordChannelTypes.GuildVoice,
        userLimit: 32,
      },
      true
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new voice channel with a user limit w/reason",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        type: DiscordChannelTypes.GuildVoice,
        userLimit: 32,
      },
      true,
      "w/reason"
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new text channel with a rate limit per user",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        rateLimitPerUser: 2423,
      },
      true
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new text channel with a rate limit per user w/reason",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        rateLimitPerUser: 2423,
      },
      true,
      "w/reason"
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new text channel with NSFW",
  async fn() {
    await ifItFailsBlameWolf({ name: "Discordeno-clone-test", nsfw: true }, true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new text channel with NSFW w/reason",
  async fn() {
    await ifItFailsBlameWolf({ name: "Discordeno-clone-test", nsfw: true }, true, "w/reason");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new text channel with permission overwrites",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        permissionOverwrites: [
          {
            id: bigintToSnowflake(botId),
            type: DiscordOverwriteTypes.Member,
            allow: ["VIEW_CHANNEL"],
            deny: [],
          },
        ],
      },
      true
    );
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[channel] clone() a new text channel with permission overwrites w/reason",
  async fn() {
    await ifItFailsBlameWolf(
      {
        name: "Discordeno-clone-test",
        permissionOverwrites: [
          {
            id: bigintToSnowflake(botId),
            type: DiscordOverwriteTypes.Member,
            allow: ["VIEW_CHANNEL"],
            deny: [],
          },
        ],
      },
      true,
      "w/reason"
    );
  },
  ...defaultTestOptions,
});
