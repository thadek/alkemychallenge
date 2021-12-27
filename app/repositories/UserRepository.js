const Repository = require('./Repository')
const { User, Role } = require('../models/index');

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
   
    async getAll(){
        return this.model.findAll({
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

    async hasRole(userId, roleName) {
        const hasRol = await this.model.findOne({
            where: { id: userId }, attributes:[],
            include: { model: Role, through:{ attributes:[]},
                       where: { name: roleName } 
                }})
        return hasRol ? true : false;  
}

    
}

module.exports = UserRepository;