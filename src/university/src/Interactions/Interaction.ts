import { Interaction as InteractionPayload } from "../../../types/interactions/interaction.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import Base from "../Base.ts";
import Client from "../Client.ts";

export class Interaction extends Base {
  constructor(client: Client, payload: InteractionPayload) {
    super(client, snowflakeToBigint(payload.id));
  }
}

export default Interaction;
