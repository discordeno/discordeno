import type { ActionRoleComponents } from "../../types/messages/components/message_components.ts";
import { MessageComponentTypes } from "../../types/messages/components/message_component_types.ts";
import type { SelectMenuComponent } from "../../types/messages/components/select_menu.ts";

/** A type guard function to tell if it is a button component */
export function isSelectMenu(component: ActionRoleComponents): component is SelectMenuComponent {
  return component.type === MessageComponentTypes.SelectMenu;
}
