import { User } from "../structures/user.ts";
import { Guild, Channel } from "../types/return-type.ts";

export const cache = {
	guilds: new Map<string, Guild>(),
	users: new Map<string, User>(),
	channels: new Map<string, Channel>(),
	unavailableGuilds: new Map<string, number>()
}
