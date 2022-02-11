import { MessageComponentTypes } from "./messageComponentTypes.ts";

// TODO: add dock link
export interface SelectMenuData {
  /** The type of component */
  componentType: MessageComponentTypes.SelectMenu;
  /** The custom id provided for this component. */
  customId: string;
  /** The values chosen by the user. */
  values: string[];
}
