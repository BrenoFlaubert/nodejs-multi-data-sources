class NotImplementedExeption extends Error {
    constructor(){
        super("Not implemented Exception")
    }
}
class ICrud {
    create(item){
        throw new NotImplementedExeption()
    }
    read(query){
        throw new NotImplementedExeption()
    }
    update(id, item){
        throw new NotImplementedExeption()
    }
    delete(id){
        throw new NotImplementedExeption()
    }
    // connect, isconnected, defineModel
}

module.exports = {
    ICrud
}