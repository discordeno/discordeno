import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface CreateDM {
  /** The recipient to open a DM channel with */
  recipientId: string;
}

/** https://discord.com/developers/docs/resources/user#create-dm */
export type DiscordCreateDM = SnakeCasedPropertiesDeep<CreateDM>;
