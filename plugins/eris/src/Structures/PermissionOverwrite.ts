import { DiscordOverwrite, OverwriteTypes } from "../../deps.ts";
import { Base } from "../Base.ts";
import { BigString } from "../Client.ts";
import Permission from "./Permission.ts";

export class PermissionOverwrite extends Permission {
  id: BigString;
  type: OverwriteTypes;

  constructor(data: DiscordOverwrite) {
    super(data.allow, data.deny);

    this.id = data.id;
    this.type = data.type;
  }

  toJSON(props: string[] = []) {
    return Base.prototype.toJSON.call([
      "id",
      "type",
      ...props,
    ]);
  }
}

export default PermissionOverwrite;
