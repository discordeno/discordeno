import { DiscordMessageComponentTypes } from "./message_component_types.ts";

export interface SelectMenuData {
  /** The type of component */
  componentType: DiscordMessageComponentTypes.SelectMenu;
  /** The custom id provided for this component. */
  customId: string;
  /** The values chosen by the user. */
  values: string[];
}
