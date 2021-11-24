import { bot, guild } from '../mod.ts';

Deno.test("[typing] start typing", async () => {
    const channel = await bot.helpers.createChannel(guild.id, { name: "typing"})
    await bot.helpers.startTyping(channel.id)
})