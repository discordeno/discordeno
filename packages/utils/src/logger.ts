import { bgBrightMagenta, black, bold, cyan, gray, italic, red, yellow } from './colors.js'

export enum LogLevels {
  Debug,
  Info,
  Warn,
  Error,
  Fatal,
}

export enum LogDepth {
  Minimal,
  Full,
}

const prefixes = new Map<LogLevels, string>([
  [LogLevels.Debug, 'DEBUG'],
  [LogLevels.Info, 'INFO'],
  [LogLevels.Warn, 'WARN'],
  [LogLevels.Error, 'ERROR'],
  [LogLevels.Fatal, 'FATAL'],
])

const noColor: (str: string) => string = (msg) => msg
const colorFunctions = new Map<LogLevels, (str: string) => string>([
  [LogLevels.Debug, gray],
  [LogLevels.Info, cyan],
  [LogLevels.Warn, yellow],
  [LogLevels.Error, (str: string) => red(str)],
  [LogLevels.Fatal, (str: string) => red(bold(italic(str)))],
])

export function createLogger({
  logLevel = LogLevels.Info,
  name,
}: {
  logLevel?: LogLevels
  name?: string
} = {}) {
  let depth = LogDepth.Minimal

  function log(level: LogLevels, ...args: any[]) {
    if (level < logLevel) return

    let color = colorFunctions.get(level)
    if (!color) color = noColor

    const date = new Date()
    const log = [
      bgBrightMagenta(black(`[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`)),
      color(prefixes.get(level) ?? 'DEBUG'),
      name ? `${name} >` : '>',
      ...args,
    ]

    switch (level) {
      case LogLevels.Debug:
        return console.debug(...log)
      case LogLevels.Info:
        return console.info(...log)
      case LogLevels.Warn:
        return console.warn(...log)
      case LogLevels.Error:
        return console.error(...log)
      case LogLevels.Fatal:
        return console.error(...log)
      default:
        return console.log(...log)
    }
  }

  function setLevel(level: LogLevels) {
    logLevel = level
  }

  function setDepth(level: LogDepth) {
    depth = level
  }

  function debug(...args: any[]) {
    if (LogDepth.Minimal === depth) log(LogLevels.Debug, args[0])
    else log(LogLevels.Debug, ...args)
  }

  function info(...args: any[]) {
    if (LogDepth.Minimal === depth) log(LogLevels.Info, args[0])
    else log(LogLevels.Info, ...args)
  }

  function warn(...args: any[]) {
    if (LogDepth.Minimal === depth) log(LogLevels.Warn, args[0])
    else log(LogLevels.Warn, ...args)
  }

  function error(...args: any[]) {
    if (LogDepth.Minimal === depth) log(LogLevels.Error, args[0])
    else log(LogLevels.Error, ...args)
  }

  function fatal(...args: any[]) {
    if (LogDepth.Minimal === depth) log(LogLevels.Fatal, args[0])
    else log(LogLevels.Fatal, ...args)
  }

  return {
    log,
    setDepth,
    setLevel,
    debug,
    info,
    warn,
    error,
    fatal,
  }
}

export const logger = createLogger({ name: 'Discordeno' })
export default logger
