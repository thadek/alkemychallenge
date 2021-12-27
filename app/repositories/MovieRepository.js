const Repository = require('./Repository');
const { Movie, Character } = require('../models/index');
const { Op } = require('sequelize');


class MovieRepository extends Repository {
    constructor() {
        super();
        this.model = Movie;
    }

    findOrCreate(movie) {
        return this.model.findOrCreate({
            where: {
                title: movie.title
            },
            defaults: {
                imageURL: movie.imageURL,
                creationDate: movie.creationDate,
                rating: movie.rating,
                GenreId: movie.GenreId
            }
        })
    }

    findByName(name) {
        return this.model.findOne({ where: { name: name } })
    }

    async findById(id) {
        const movie = await this.model.findOne({ where: { id: id }, include: { model: Character, through: { attributes: [] } } })
        if (!movie) return { error: `Movie with id ${id} not found.`, errorCode: 404 };
        return movie;
    }

    findWithParams(params) {
        const queryName = params.name || params.title;
        const genre = +params.genre;
        const attr = ['id', 'title', 'imageURL', 'creationDate'];
        if (queryName) { return this.model.findAll({ attributes: attr, where: { title: { [Op.like]: `%${queryName}%` }, } }); }

        if (genre) { return this.model.findAll({ attributes: attr, where: { GenreId: genre } }); }
        if (params.order) {
            const order = params.order.toUpperCase();
            if (order === "ASC" || order === "DESC") {
                return this.model.findAll({ attributes: attr, order: [['creationDate', `${order}`]] });
            }
            else { return { errCode:400,error: "Only ASC | DESC is valid in order." } }
        }
        return this.model.findAll({ attributes: attr })

    }

}
module.exports = MovieRepository;