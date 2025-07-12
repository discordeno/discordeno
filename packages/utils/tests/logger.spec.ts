import { expect } from 'chai'
import { describe, it } from 'mocha'
import { createLogger, LogLevels } from '../src/logger.js'

describe('Logger', () => {
  it('create logger with default options', () => {
    const loggy = createLogger()
    loggy.setLevel(LogLevels.Debug)
    loggy.debug('debugging')
    loggy.error('error')
    loggy.fatal('fatal')
    loggy.info('info')
    loggy.warn('warn')

    loggy.debug('debugging')
    loggy.error('error')
    loggy.fatal('fatal')
    loggy.info('info')
    loggy.warn('warn')
  })

  it('create logger with a name', () => {
    const loggy = createLogger({ name: 'loggy' })
    expect(loggy).to.exist
  })

  it('Handle fake level', () => {
    const loggy = createLogger({ name: 'fake level' })
    const level = 123 as LogLevels
    loggy.log(level, 'idk')
  })
})
