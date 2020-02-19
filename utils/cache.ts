import { Guild } from "../types/guild";

export const cache = {
	guilds: new Map<string, Guild>(),
	users: new Map<string, User>(),
	channels: new Map<string, Channel>(),
}
