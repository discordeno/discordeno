// This file allows you to tell typescript about any additions you have made to the internal discordeno objects.
import { InteractionResponse, Message } from "discordeno";

declare module "discordeno" {
    // We want to add something to the Interaction object.
  interface Interaction {
    // Normally, to send a response you would have to do something like bot.helpers.sendInteractionResponse(interaction.id, interaction.token, { type: InteractionResponseTypes.ChannelMessageWithSource, data: { content: "text here" } })
    // But with this reply method we added, it is as simple as interaction.reply("text here").
    // Feel free to delete these comments once you have understood the concept.
    /** Send a reply to an interaction. */
    reply(response: InteractionResponse | string): Promise<Message | undefined>;
  }
}
