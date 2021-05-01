import { SnakeCasedPropertiesDeep } from "../../util.ts";
import { ButtonComponent } from "./button_component.ts";

export interface ActionRow {
  /** Action rows are a group of buttons. */
  type: 1;
  /** The button components */
  components: ButtonComponent[];
}

export type DiscordActionRow = SnakeCasedPropertiesDeep<ActionRow>;