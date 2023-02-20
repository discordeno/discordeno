import { events } from './mod.ts.js';
import { updateGuildCommands } from '../utils/helpers.ts.js';

events.guildCreate = async (bot, guild) => await updateGuildCommands(bot, guild);
