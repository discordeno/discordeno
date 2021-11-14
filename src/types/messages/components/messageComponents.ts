import { ActionRow } from "./action_row.ts";
import { ButtonComponent } from "./button_component.ts";
import { SelectMenuComponent } from "./select_menu.ts";

export type ActionRoleComponents = ButtonComponent | SelectMenuComponent;

export type MessageComponents = ActionRow[];
