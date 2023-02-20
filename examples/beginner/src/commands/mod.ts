import { Bot } from '../../bot.ts.js';
import type { Command } from '../types/commands.ts.js';

export function createCommand(command: Command) {
  Bot.commands.set(command.name, command);
}
