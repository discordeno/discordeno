import { MessageComponentTypes } from "./messageComponentTypes.ts";

export interface ButtonData {
  /** with the value you defined for this component */
  customId: string;
  /** The type of this component */
  componentType: MessageComponentTypes.Button;
}
