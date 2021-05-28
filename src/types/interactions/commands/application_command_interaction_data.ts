import { ApplicationCommandInteractionDataOption } from "./application_command_interaction_data_option.ts";
import { ApplicationCommandInteractionDataResolved } from "./application_command_interaction_data_resolved.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata */
export interface ApplicationCommandInteractionData {
  /** The Id of the invoked command */
  id?: string;
  /** The name of the invoked command */
  name?: string;
  /** Converted users + roles + channels */
  resolved?: ApplicationCommandInteractionDataResolved;
  /** The params + values from the user */
  options?: ApplicationCommandInteractionDataOption[];
}
