import { ActionRow } from "./actionRow.ts";
import { ButtonComponent } from "./buttonComponent.ts";
import { SelectMenuComponent } from "./selectMenu.ts";

export type ActionRoleComponents = ButtonComponent | SelectMenuComponent;

export type MessageComponents = ActionRow[];
