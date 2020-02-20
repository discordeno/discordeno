import { User } from "../structures/user";
import { Guild } from "../types/guild";
import { Channel } from "../types/channel";

export const cache = {
	guilds: new Map<string, Guild>(),
	users: new Map<string, User>(),
	channels: new Map<string, Channel>(),
}
