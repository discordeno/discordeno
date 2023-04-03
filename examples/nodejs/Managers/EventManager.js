const fs = require('fs')
const path = require('path')
const resolveFolder = (folderName) => path.resolve(__dirname, '.', folderName)

const EventEmitter = require('events')

class EventManager extends EventEmitter {
  constructor() {
    super()
    this.cache = new Map()
    this.allEvents = {}
  }

  load(options = {}) {
    const eventsFolder = resolveFolder('../events')
    let i = 0
    fs.readdirSync(eventsFolder).map(async (file) => {
      if (!file.endsWith('.js')) return
      i++
      const fileName = path.join(eventsFolder, file)
      const event = require(fileName)
      const eventName = file.split('.')[0]

      this.allEvents[`${eventName}`] = (...args) => {
        this.emit(eventName, ...args)
        return event(...args)
      }
    })
    return this.allEvents
  }
}
module.exports = EventManager
