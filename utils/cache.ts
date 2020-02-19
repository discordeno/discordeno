import { User } from "../structures/user";
import { Channel } from "../structures/channel";
import { Guild } from "../structures/guild";

export const cache = {
	guilds: new Map<string, Guild>(),
	users: new Map<string, User>(),
	channels: new Map<string, Channel>(),
}
