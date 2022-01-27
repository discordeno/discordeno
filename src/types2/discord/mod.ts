import { User } from "../lib/mod.ts";
import { ToDiscordType } from "./toDiscordType.ts";

export interface DiscordUser extends ToDiscordType<User> {}
