import { events } from "./mod.ts";
import { updateGuildCommands } from "../utils/helpers.ts";

events.guildCreate = async (bot, guild) => await updateGuildCommands(bot, guild);
