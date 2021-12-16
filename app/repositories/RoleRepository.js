const Repository = require('./Repository');
const { Role } = require('../models/index');

class RoleRepository extends Repository{
    constructor(){
        super();
        this.model = Role;
    }

    async findByName(name){
        return this.model.findOne({ where:{
            name:name
        }})
    }
}

module.exports = RoleRepository;