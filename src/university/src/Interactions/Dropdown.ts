import { Interaction as InteractionPayload } from "../../../types/interactions/interaction.ts";
import { SelectMenuData } from "../../../types/messages/components/select_data.ts";
import Client from "../Client.ts";
import Message from "../Message.ts";
import Interaction from "./Interaction.ts";

export class Dropdown extends Interaction {
  /** Interaction data */
  data: SelectMenuData;
  /**  The message the button was attached to */
  message: Message;

  constructor(client: Client, payload: InteractionPayload) {
    super(client, payload);
    this.data = payload.data as SelectMenuData;
    this.message = new Message(client, payload.message!);
  }
}

export default Dropdown;
