const fs = require('fs');
const path = require('path');
const resolveFolder = folderName => path.resolve(__dirname, ".", folderName);
class EventManager {
    constructor(client) {
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
        })
        return this._events;
    }

}
module.exports = EventManager;