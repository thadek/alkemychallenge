const Repository = require('./Repository');
const { Character, Movie } = require('../models/index');
const { Op } = require('sequelize');

class CharacterRepository extends Repository {
    constructor() {
        super();
        this.model = Character;
    }

    verifyIdsArray(array) {
        return this.model.findAll({ where: { id: { [Op.or]: array } }, attributes: ['id'], raw: true })
    }

    findOrCreate(character) {
        return this.model.findOrCreate({
            where: {
                name: character.name,
                imageURL: character.imageURL,
            },
            defaults: {
                age: character.age,
                weight: character.weight,
                history: character.history
            }
        })
    }

    findWithParams(params) {
        const name = params.name || ''
        const age = params.age || ''
        const movies = params.movies || ''

        if (params.movies) {
            return this.model.findAll({
                attributes: ['id', 'imageURL', 'name'],
                where: {
                    [Op.and]: [
                        { name: { [Op.like]: '%' + name } },
                        { age: { [Op.like]: '%' + age } }
                    ]
                },
                include: [{ model: Movie, through: { attributes: [] }, where: { id: { [Op.like]: '%' + movies } }, attributes: [] }]
            })
        }else{
            return this.model.findAll({
                attributes: ['id', 'imageURL', 'name'],
                where: {
                    [Op.and]: [
                        { name: { [Op.like]: '%' + name } },
                        { age: { [Op.like]: '%' + age } }
                    ]
                }
            })
        }



    };


    findById(id) {
        return this.model.findOne({ where: { id: id }, include: { model: Movie, through: { attributes: [] } } })
    }

}

module.exports = CharacterRepository;