const Repository = require('./Repository')
const { User } = require('../models/index');

class UserRepository extends Repository {
    constructor() {
        super();
        this.model = User;
    }

    async create(usr) {
        try {
            const returnedUser = await this.model.findOrCreate({
                where: {
                    email: usr.email
                },
                defaults: {
                    name: usr.name,
                    password: usr.password,
                }
            })

            if (!returnedUser[1]) {
                const error = { error: `The user with email ${usr.email} already exists.` }
                return error;
            } else {
                return returnedUser[0]
            }
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                return {error: err.errors[0].message }
            }else{
                return {error: err}
            }

        }


    }

    async findByEmail(mail) {
        return this.model.findOne({
            where: {
                email: mail
            }
        })
    }

    

}

module.exports = UserRepository;