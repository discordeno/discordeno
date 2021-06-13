import { Interaction, SlashCommandInteraction } from "../../types/interactions/interaction.ts";
import { DiscordInteractionTypes } from "../../types/interactions/interaction_types.ts";

/** A type guard function to tell if it is a slash command interaction */
export function isSlashCommand(interaction: Interaction): interaction is SlashCommandInteraction {
  return interaction.type === DiscordInteractionTypes.ApplicationCommand;
}
