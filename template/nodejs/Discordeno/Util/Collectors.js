const {EventEmitter} = require('events');
class Collector extends EventEmitter {
    constructor(event, options = {}){
        super();

        this.event = event;

        this.client = options.client;

        this.items = new Map();

        this.filter = options.filter || ((a) => true);

        this.max = options.max;

        this._timeout = options.timeout || 10000;

        this._collectFunction = this.collectFunction.bind(this);

        this.startCollector();
    }

    startCollector(){
        this.client.eventListener.on(this.event, this._collectFunction);
        this.timeout = setTimeout(() => {
            this.emit("end", this.items);
            this.client.eventListener.removeListener(this.event, this._collectFunction);
        },  this._timeout)
    }

    stop(options = {}){
        if(options.emit === undefined) options.emit = true;
        clearTimeout(this.timeout);
        if(options.emit) this.emit("end", this.items);
        return this.client.eventListener.removeListener(this.event, this._collectFunction);
    }


    collectFunction(...args){
        args.shift();
        if(this.filter(...args)){
            if(this.max && this.items.size >= this.max) {
                return this.stop({emit: true});
            }
            this.items.set(args[0].id, args[0]);
            this.emit("collect", ...args);
        }
    }
}
module.exports = Collector;