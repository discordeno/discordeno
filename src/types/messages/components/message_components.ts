import { ActionRow } from "./action_row.ts";
import { ButtonComponent } from "./button_component.ts";

export type MessageComponent = ActionRow | ButtonComponent;

export type MessageComponents = MessageComponent[];
