import type { ActionRoleComponents } from "../../types/messages/components/message_components.ts";
import { SelectMenuComponent } from "../../types/messages/components/select_menu.ts";

/** A type guard function to tell if it is a button component */
export function isSelectMenu(component: ActionRoleComponents): component is SelectMenuComponent {
  return !Reflect.has(component, "type");
}
