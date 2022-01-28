import {
  ApplicationCommandOptionChoice,
  Bot,
  InteractionResponseTypes,
} from "../deps.ts";

export async function sendAutocompleteChoices(
  bot: Bot,
  interactionId: bigint,
  interactionToken: string,
  choices: ApplicationCommandOptionChoice[]
): Promise<void> {
  await bot.helpers.sendInteractionResponse(interactionId, interactionToken, {
    type: InteractionResponseTypes.ApplicationCommandAutocompleteResult,
    data: {
      choices: choices,
    },
  });
}
