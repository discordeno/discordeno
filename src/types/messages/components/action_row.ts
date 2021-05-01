import { SnakeCasedPropertiesDeep } from "../../util.ts";
import { ButtonComponent } from "./button_component.ts";

// TODO: add docs link
export interface ActionRow {
  /** Action rows are a group of buttons. */
  type: 1;
  /** The button components */
  components: ButtonComponent[];
}
