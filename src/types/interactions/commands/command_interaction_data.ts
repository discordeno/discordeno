import { SnakeCaseProps } from "../../util.ts";
import { CommandInteractionDataOption } from "./command_interaction_data_option.ts";

export interface CommandInteractionData {
  /** The ID of the invoked command */
  id: string;
  /** The name of the invoked command */
  name: string;
  /** The params + values from the user */
  options?: CommandInteractionDataOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata */
export type DiscordCommandInteractionData = SnakeCaseProps<
  CommandInteractionData
>;
