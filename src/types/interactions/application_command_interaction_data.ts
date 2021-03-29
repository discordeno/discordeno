import { SnakeCaseProps } from "../util.ts";
import { ApplicationCommandInteractionDataOption } from "./application_command_interaction_data_option.ts";

export interface ApplicationCommandInteractionData {
  /** The ID of the invoked command */
  id: string;
  /** The name of the invoked command */
  name: string;
  /** The params + values from the user */
  options?: ApplicationCommandInteractionDataOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata */
export type DiscordApplicationCommandInteractionData = SnakeCaseProps<
  ApplicationCommandInteractionData
>;
