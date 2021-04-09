import {
    addReaction,
    cache,
    delay,
    DiscordReaction,
    sendMessage,
} from "../../mod.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";

async function ifItFailsBlameWolf(type: "getter" | "raw") {
    const message = await sendMessage(tempData.channelId, "Hello World!");

    // Assertions
    assertExists(message);

    // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
    await delay(5000);

    if (!cache.messages.has(message.id)) {
        throw new Error(
            "The message seemed to be sent but it was not cached.",
        );
    }

    if (type === "raw") {
        await addReaction(message.channelId, message.id, "❤");
    } else {
        await message.addReaction("❤");
    }

    await delay(5000);

    assertEquals(
        await cache.messages.get(message.id)?.reactions?.filter((
            reaction: DiscordReaction,
        ) => reaction.emoji?.name === "❤").length,
        1,
    );
}

Deno.test({
    name: "[message] add a reaction",
    async fn() {
        await ifItFailsBlameWolf("raw");
    },
    ...defaultTestOptions,
});

Deno.test({
    name: "[message] message.addReaction()",
    async fn() {
        await ifItFailsBlameWolf("getter");
    },
    ...defaultTestOptions,
});
