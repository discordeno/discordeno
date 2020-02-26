import { create_guild } from "../structures/guild.ts";
import { create_channel } from "../structures/channel.ts";

export type Guild = ReturnType<typeof create_guild>;
export type Channel = ReturnType<typeof create_channel>
