class Collection extends Map{
    constructor(){
        super();
    }

    first(){
        return super.get([...super.keys()][0]);
    }

    last(){
        return super.get([...super.keys()][super.size - 1]);
    }
}
module.exports = Collection;
