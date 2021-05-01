import { ActionRow } from "../../types/messages/components/action_row.ts";
import { MessageComponent } from "../../types/messages/components/message_components.ts";
import { MessageComponentTypes } from "../../types/messages/components/message_component_types.ts";

/** A type guard function to tell if it is a action row component */
export function isActionRow(
  component: MessageComponent,
): component is ActionRow {
  return component.type === MessageComponentTypes.ActionRow;
}
