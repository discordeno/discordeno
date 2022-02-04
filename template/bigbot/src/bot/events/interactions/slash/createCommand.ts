import { ArgumentDefinition, Command } from "../../../types/command.ts";

export function createCommand<T extends readonly ArgumentDefinition[]>(
  command: Command<T>,
) {
  return command;
}
