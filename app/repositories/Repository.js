class Repository {

    async getAll() {
        return this.model.findAll();
    }

    async create(object) {
        return this.model.create(object);
    }

    async update(object){
        return this.model.update(object)
    }
    
    async deleteById(id) {
        return this.model.destroy({
            where: {
                id: id
            }
        })
    }

}

module.exports = Repository;
