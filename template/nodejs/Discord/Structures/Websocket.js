class WebSocket {
    constructor(gateway) {
        this.shards = gateway.shards;
    }

    get ping(){
        const pings = [...this.shards.values()].map(x => x.heartbeat.lastReceivedAt -x.heartbeat.lastSentAt);
        console.log(pings);
        return pings.reduce((a, b) => a + b, 0) / pings.length;
    }

    getShards(){
        const shards = [...this.shards.values()].map(x => {
            return {
                status: getStatus(x),
                ping: x.heartbeat.lastReceivedAt - x.heartbeat.lastSentAt,
                ...x
            }
        })
        return shards;
    }
}
module.exports = WebSocket;

function getStatus(x){
    if(x.ready) return 0;
    if(x.resume) return 8;
    return 5;
}