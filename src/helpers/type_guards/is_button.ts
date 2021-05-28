import type { ButtonComponent } from "../../types/messages/components/button_component.ts";
import type { ActionRoleComponents } from "../../types/messages/components/message_components.ts";

/** A type guard function to tell if it is a button component */
export function isButton(component: ActionRoleComponents): component is ButtonComponent {
  return Reflect.has(component, "type");
}
