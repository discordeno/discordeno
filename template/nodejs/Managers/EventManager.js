const fs = require("fs");
const path = require("path");
const resolveFolder = (folderName) => path.resolve(__dirname, ".", folderName);

const EventEmitter = require("events");

class EventManager extends EventEmitter {
  constructor(client) {
    super();
    this.cache = new Map();
    this._events = {};
  }

  load(options = {}) {
    const eventsFolder = resolveFolder("../events");
    fs.readdirSync(eventsFolder).map(async (file) => {
      if (!file.endsWith(".js")) return;
      const fileName = path.join(eventsFolder, file);
      const event = require(fileName);
      const eventName = file.split(".")[0];
      this._events[`${eventName}`] = event;
      /* When the event should be emitted on client.events.on(eventName, (...args) => {...})
                this._events[`${eventName}`] = function(...args) {
                    this.emit(eventName, ...args);
                    return event(...args);
                };
            */
    });
    return this._events;
  }
}
module.exports = EventManager;
