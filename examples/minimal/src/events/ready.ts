import { events } from './mod.ts.js'
import { logger } from '../utils/logger.ts.js'

const log = logger({ name: 'Event: Ready' })

events.ready = () => {
  log.info('Bot Ready')
}
