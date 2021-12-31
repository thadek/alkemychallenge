const Repository = require('./Repository')
const { User, Role } = require('../models/index');
const { Op } = require('sequelize');

class UserRepository extends Repository {
    constructor() {
        super();
        this.model = User;
    }

    async findByEmail(mail) {
        return this.model.findOne({
            where: {
                email: mail
            },
            include:{ model:Role,attributes:['name'], through:{attributes:[]}}
        })
    }
   
    async getAll(params){
        let query = {};
        if(params.email) query ={ email:params.email };
        return this.model.findAll({where:query,
            attributes:['id','name','email']    
        })
    }
 
    async getRoles(userId){
        return this.model.findOne({
            where:{ id:userId},
            attributes:['id'],
            include:{model:Role,through:{attributes:[]},attributes:['name']}
        })
    }

    async hasRoles(userId, roleNames) {
   
        const hasRoles = await this.model.findOne({
            where: { id: userId }, attributes:[],
            include: { model: Role, through:{ attributes:[]},
                       where: { name: {[Op.or]:roleNames} } 
                }})
                
        return hasRoles ? true : false;  
}



    
}

module.exports = UserRepository;