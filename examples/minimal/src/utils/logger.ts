/* eslint-disable @typescript-eslint/no-unsafe-argument */
import chalk from 'chalk';

export enum LogLevels {
  Debug,
  Info,
  Warn,
  Error,
  Fatal,
}

const prefixes = new Map<LogLevels, string>([
  [LogLevels.Debug, 'DEBUG'],
  [LogLevels.Info, 'INFO'],
  [LogLevels.Warn, 'WARN'],
  [LogLevels.Error, 'ERROR'],
  [LogLevels.Fatal, 'FATAL'],
]);

const noColor: (str: string) => string = (msg) => msg;
const colorFunctions = new Map<LogLevels, (str: string) => string>([
  [LogLevels.Debug, chalk.gray],
  [LogLevels.Info, chalk.cyan],
  [LogLevels.Warn, chalk.yellow],
  [LogLevels.Error, (str: string) => chalk.red(str)],
  [LogLevels.Fatal, (str: string) => chalk.red.bold.italic(str)],
]);

export function createLogger({ logLevel = LogLevels.Info, name }: { logLevel?: LogLevels; name?: string } = {}): Logger {
  function log(level: LogLevels, ...args: any[]): void {
    if (level < logLevel) return;

    let color = colorFunctions.get(level);
    if (!color) color = noColor;

    const date = new Date();
    const log = [
      `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`,
      color(prefixes.get(level) ?? 'DEBUG'),
      name ? `${name} >` : '>',
      ...args,
    ];

    switch (level) {
      case LogLevels.Debug:
        return console.debug(...log);
      case LogLevels.Info:
        return console.info(...log);
      case LogLevels.Warn:
        return console.warn(...log);
      case LogLevels.Error:
        return console.error(...log);
      case LogLevels.Fatal:
        return console.error(...log);
      default:
        return console.log(...log);
    }
  }

  function setLevel(level: LogLevels): void {
    logLevel = level;
  }

  function debug(...args: any[]): void {
    log(LogLevels.Debug, ...args);
  }

  function info(...args: any[]): void {
    log(LogLevels.Info, ...args);
  }

  function warn(...args: any[]): void {
    log(LogLevels.Warn, ...args);
  }

  function error(...args: any[]): void {
    log(LogLevels.Error, ...args);
  }

  function fatal(...args: any[]): void {
    log(LogLevels.Fatal, ...args);
  }

  return {
    log,
    setLevel,
    debug,
    info,
    warn,
    error,
    fatal,
  };
}

export const logger = createLogger({ name: 'Main' });
export default logger;

export interface Logger {
  log: (level: LogLevels, ...args: any[]) => void;
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  fatal: (...args: any[]) => void;
  setLevel: (level: LogLevels) => void;
}
