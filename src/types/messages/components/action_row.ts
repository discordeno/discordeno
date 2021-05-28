import { ButtonComponent } from "./button_component.ts";
import { SelectMenuComponent } from "./select_menu.ts";

// TODO: add docs link
export interface ActionRow {
  /** Action rows are a group of buttons. */
  type: 1;
  /** The components in this row */
  components:
    | [SelectMenuComponent | ButtonComponent]
    | [ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent];
}
