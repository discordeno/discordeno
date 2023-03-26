import { describe, it } from 'mocha'
import { LogDepth, LogLevels, createLogger } from '../src/logger.js'
import { expect } from 'chai'

describe('Logger', () => {
  it('create logger with default options', () => {
    const loggy = createLogger()
    loggy.setLevel(LogLevels.Debug)
    loggy.setDepth(LogDepth.Full)

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
    // @ts-expect-error intentionally high value for level to bypass ts check and run the `default` handler
    loggy.log(123, 'idk')
  })
})
