import { Command } from "../../types/command.ts";
import ping from "./slash/general/ping.ts";

// deno-lint-ignore no-explicit-any
export const commands: Record<string, Command<any>> = {
  ping,
};

export default commands;
