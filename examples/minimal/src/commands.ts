import { bot } from './bot.js';
import type { Command } from './types/commands.js';

export function createCommand(command: Command): void {
  bot.commands.set(command.name, command);
}
