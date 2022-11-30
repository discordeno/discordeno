import { AutoModerationActionType, AutoModerationEventTypes, AutoModerationTriggerTypes } from "../../types/discord.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[automod] Run automod tests",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();

    await t.step("[automod] Create a MessageSend rule for Keyword with BlockMessage action.", async () => {
      const rule = await bot.helpers.createAutomodRule(CACHED_COMMUNITY_GUILD_ID, {
        name: "test",
        eventType: AutoModerationEventTypes.MessageSend,
        triggerType: AutoModerationTriggerTypes.Keyword,
        triggerMetadata: {
          keywordFilter: ["iblamewolf"],
        },
        actions: [
          {
            type: AutoModerationActionType.BlockMessage,
          },
        ],
      });

      assertExists(rule.id);

      const fetchedRule = await bot.helpers.getAutomodRule(
        CACHED_COMMUNITY_GUILD_ID,
        rule.id,
      );
      assertExists(fetchedRule.id);
      assertEquals(fetchedRule.name, rule.name);
      assertEquals(fetchedRule.eventType, AutoModerationEventTypes.MessageSend);
      assertEquals(fetchedRule.triggerType, AutoModerationTriggerTypes.Keyword);
      assertEquals(fetchedRule.triggerMetadata?.keywordFilter?.[0], "iblamewolf");
      assertExists(fetchedRule.actions);
      assertExists(fetchedRule.actions[0]);
      assertEquals(fetchedRule.actions[0].type, AutoModerationActionType.BlockMessage);

      await bot.helpers.deleteAutomodRule(CACHED_COMMUNITY_GUILD_ID, rule.id);
    });

    await t.step("[automod] Create a MessageSend rule for Keyword with SendAlertMessage action.", async () => {
      const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
        name: "test",
      });
      assertExists(channel.id);

      const rule = await bot.helpers.createAutomodRule(CACHED_COMMUNITY_GUILD_ID, {
        name: "test",
        eventType: AutoModerationEventTypes.MessageSend,
        triggerType: AutoModerationTriggerTypes.Keyword,
        triggerMetadata: {
          keywordFilter: ["iblamewolf"],
        },
        actions: [
          {
            type: AutoModerationActionType.SendAlertMessage,
            metadata: {
              channelId: channel.id,
            },
          },
        ],
      });

      assertExists(rule.id);

      const fetchedRule = await bot.helpers.getAutomodRule(
        CACHED_COMMUNITY_GUILD_ID,
        rule.id,
      );
      assertExists(fetchedRule.id);
      assertEquals(fetchedRule.name, rule.name);
      assertEquals(fetchedRule.eventType, AutoModerationEventTypes.MessageSend);
      assertEquals(fetchedRule.triggerType, AutoModerationTriggerTypes.Keyword);
      assertEquals(fetchedRule.triggerMetadata?.keywordFilter?.[0], "iblamewolf");
      assertExists(fetchedRule.actions);
      assertExists(fetchedRule.actions[0]);
      assertEquals(fetchedRule.actions[0].type, AutoModerationActionType.SendAlertMessage);
      assertEquals(fetchedRule.actions[0].metadata?.channelId, channel.id);

      await bot.helpers.deleteAutomodRule(CACHED_COMMUNITY_GUILD_ID, rule.id);
      await bot.helpers.deleteChannel(channel.id);
    });

    await t.step("[automod] Create a MessageSend rule for Keyword with Timeout action.", async () => {
      const rule = await bot.helpers.createAutomodRule(CACHED_COMMUNITY_GUILD_ID, {
        name: "test",
        eventType: AutoModerationEventTypes.MessageSend,
        triggerType: AutoModerationTriggerTypes.Keyword,
        triggerMetadata: {
          keywordFilter: ["iblamewolf"],
        },
        actions: [
          {
            type: AutoModerationActionType.Timeout,
            metadata: {
              durationSeconds: 10,
            },
          },
        ],
      });

      assertExists(rule.id);

      const fetchedRule = await bot.helpers.getAutomodRule(
        CACHED_COMMUNITY_GUILD_ID,
        rule.id,
      );
      assertExists(fetchedRule.id);
      assertEquals(fetchedRule.name, rule.name);
      assertEquals(fetchedRule.eventType, AutoModerationEventTypes.MessageSend);
      assertEquals(fetchedRule.triggerType, AutoModerationTriggerTypes.Keyword);
      assertEquals(fetchedRule.triggerMetadata?.keywordFilter?.[0], "iblamewolf");
      assertExists(fetchedRule.actions);
      assertExists(fetchedRule.actions[0]);
      assertEquals(fetchedRule.actions[0].type, AutoModerationActionType.Timeout);
      assertEquals(fetchedRule.actions[0].metadata?.durationSeconds, 10);

      await bot.helpers.deleteAutomodRule(CACHED_COMMUNITY_GUILD_ID, rule.id);
    });

    await t.step("[automod] Create a MessageSend rule for Keyword with BlockMessage & Timeout action.", async () => {
      const rule = await bot.helpers.createAutomodRule(CACHED_COMMUNITY_GUILD_ID, {
        name: "test",
        eventType: AutoModerationEventTypes.MessageSend,
        triggerType: AutoModerationTriggerTypes.Keyword,
        triggerMetadata: {
          keywordFilter: ["iblamewolf"],
        },
        actions: [
          {
            type: AutoModerationActionType.BlockMessage,
          },
          {
            type: AutoModerationActionType.Timeout,
            metadata: {
              durationSeconds: 10,
            },
          },
        ],
      });

      assertExists(rule.id);

      await bot.helpers.deleteAutomodRule(CACHED_COMMUNITY_GUILD_ID, rule.id);
    });

    await t.step(
      "[automod] Create a MessageSend rule for Keyword with SendAlertMessage & Timeout action.",
      async () => {
        const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
          name: "test",
        });
        assertExists(channel.id);

        const rule = await bot.helpers.createAutomodRule(CACHED_COMMUNITY_GUILD_ID, {
          name: "test",
          eventType: AutoModerationEventTypes.MessageSend,
          triggerType: AutoModerationTriggerTypes.Keyword,
          triggerMetadata: {
            keywordFilter: ["iblamewolf"],
          },
          actions: [
            {
              type: AutoModerationActionType.SendAlertMessage,
              metadata: {
                channelId: channel.id,
              },
            },
            {
              type: AutoModerationActionType.Timeout,
              metadata: {
                durationSeconds: 10,
              },
            },
          ],
        });

        assertExists(rule.id);

        await bot.helpers.deleteAutomodRule(CACHED_COMMUNITY_GUILD_ID, rule.id);
        await bot.helpers.deleteChannel(channel.id);
      },
    );

    await t.step(
      "[automod] Create a MessageSend rule for Keyword with BlockMessage & SendAlertMessage & Timeout action.",
      async (t) => {
        const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
          name: "test",
        });
        assertExists(channel.id);

        const rule = await bot.helpers.createAutomodRule(CACHED_COMMUNITY_GUILD_ID, {
          name: "test",
          eventType: AutoModerationEventTypes.MessageSend,
          triggerType: AutoModerationTriggerTypes.Keyword,
          triggerMetadata: {
            keywordFilter: ["iblamewolf"],
          },
          actions: [
            {
              type: AutoModerationActionType.BlockMessage,
            },
            {
              type: AutoModerationActionType.SendAlertMessage,
              metadata: {
                channelId: channel.id,
              },
            },
            {
              type: AutoModerationActionType.Timeout,
              metadata: {
                durationSeconds: 10,
              },
            },
          ],
        });

        assertExists(rule.id);

        // Get the rule again to make sure it was created correctly
        await t.step("[automod] Get a automod rule", async () => {
          const fetchedRule = await bot.helpers.getAutomodRule(
            CACHED_COMMUNITY_GUILD_ID,
            rule.id,
          );
          assertExists(fetchedRule.id);
          assertEquals(fetchedRule.name, rule.name);
          assertEquals(fetchedRule.eventType, AutoModerationEventTypes.MessageSend);
          assertEquals(fetchedRule.triggerType, AutoModerationTriggerTypes.Keyword);
          assertEquals(fetchedRule.triggerMetadata?.keywordFilter?.[0], "iblamewolf");
          assertExists(fetchedRule.actions);
          assertExists(fetchedRule.actions[0]);
          assertExists(fetchedRule.actions[1].metadata);
          assertExists(fetchedRule.actions[2].metadata);
          assertEquals(fetchedRule.actions[1].metadata.channelId, channel.id);
          assertEquals(fetchedRule.actions[2].metadata.durationSeconds, 10);
          assertEquals(fetchedRule.actions[0].type, AutoModerationActionType.BlockMessage);
          assertEquals(fetchedRule.actions[1].type, AutoModerationActionType.SendAlertMessage);
          assertEquals(fetchedRule.actions[2].type, AutoModerationActionType.Timeout);
        });

        await bot.helpers.deleteAutomodRule(CACHED_COMMUNITY_GUILD_ID, rule.id);
        await bot.helpers.deleteChannel(channel.id);
      },
    );
  },
});
