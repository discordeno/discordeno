class Collection extends Map{
    constructor(){
        super();
    }

    has(key){
        if(typeof key === 'string') key = BigInt(key);
        return super.has(key);
    }

    get(key){
        if(typeof key === 'string') key = BigInt(key);
        return super.get(key);
    }

    set(key, value){
        if(typeof key === 'string') key = BigInt(key);
        return super.set(key, value);
    }

    delete(key){
        if(typeof key === 'string') key = BigInt(key);
        return super.delete(key);
    }

    first(){
        return super.get([...super.keys()][0]);
    }

    last(){
        return super.get([...super.keys()][super.size - 1]);
    }
}
module.exports = Collection;
