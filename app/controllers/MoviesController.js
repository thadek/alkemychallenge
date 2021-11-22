const { Movie, Character } = require('../models/index');
const validationService = require('../services/validationService');
const characterService = require('../services/characterService')
const { Op } = require("sequelize");
module.exports = {

    //CRUD

    // 1 - Create
    async createMovie(req, res) {
        const validation = validationService.validateMovie(req.body)

        if (!validation.error) {
            //Other validations
            const movCreationDate = Date.parse(req.body.creationDate)
            //Characters processing magic hole         
            const validatedCharArray = await characterService.processArray(req.body.Characters)
            //Verify if movie exists
            const movieData = await Movie.findOne({
                where: {
                    title: req.body.title
                }
            }).then(m => m).catch(err => res.status(500).json(err))
            //If movie not exists -> verify charactersArray.
            if (!movieData) {
                //If characters arrays is proccesed without errors -> Create movie
                if (!validatedCharArray.error) {

                    const MovieCreated = await Movie.create({
                        imageURL: req.body.imageURL,
                        title: req.body.title,
                        creationDate: movCreationDate,
                        GenreId: req.body.GenreId,
                        rating: req.body.rating,
                    }).then(m => m).catch(err => {
                        res.status(500).json(err)
                    })

                    const promises = [];

                    if (validatedCharArray.existentVerified) {
                        validatedCharArray.existentVerified.forEach(c => promises.push(MovieCreated.addCharacter(c)))
                    }

                    if (validatedCharArray.newCharacters.added) {
                        validatedCharArray.newCharacters.added.forEach(c => promises.push(MovieCreated.addCharacter(c)))
                    }

                    Promise.all(promises).then(c => c)

                    setTimeout(() => {
                        Movie.findOne({
                            where: { id: MovieCreated.id },
                            include: {
                                model: Character,
                                through: {
                                    attributes: []
                                }
                            }
                        }).then(mov => res.json(mov)).catch(err => res.status(500).json(err))
                    }, 40)

                } else {
                    res.status(500).json({ error: "Movie not created. Reason => Error with characters array.", CharactersServiceResponse: validatedCharArray })
                }
            } else {
                res.status(500).json({ error: `The movie with title ${movieData.title} already exists.` })

            }

        } else {
            res.status(500).json({ error: validation.error })
        }
    },

    // 2 - Read
    async findAll(req, res) {

        if (req.query.title || req.query.name) {
            const query = req.query.title || req.query.name;
            await Movie.findAll({
                attributes: [
                    'title', 'imageURL', 'creationDate'
                ],
                where: {
                    title: {
                        [Op.like]: `%${query}%`
                    }
                }
            }).then(mov => res.json(mov)).catch(err => res.status(500).json(err));

        } else if (req.query.genre) {

            await Movie.findAll({
                attributes: [
                    'title', 'imageURL', 'creationDate'
                ],
                where: {
                    GenreId: +req.query.genre
                }
            }).then(mov => res.json(mov)).catch(err => res.status(500).json(err));

        } else if (req.query.order) {

            const query = req.query.order.toUpperCase()    
            if (query === "ASC" || query === "DESC") {
                await Movie.findAll({
                    attributes: [
                        'title', 'imageURL', 'creationDate'
                    ],
                    order: [
                        ['creationDate', `${query.toUpperCase()}`]
                    ]

                }).then(mov => res.json(mov)).catch(err => res.status(500).json(err));

            } else {
                res.status(500).json({ error: "order parameter only accepts: ASC - DESC" })
            }







        } else {
            await Movie.findAll({
                attributes: [
                    'title', 'imageURL', 'creationDate'
                ]
            }).then(mov => res.json(mov)).catch(err => res.status(500).json(err));
        }




    },
    async findById(req, res) {

        const movie = await Movie.findOne({
            where: { id: req.params.id },
            include: {
                model: Character,

            }

        });

        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ error: `Movie with id ${req.params.id} not found.` })
        }


    },

    // 3 - Update
    async updateMovie(req, res) {
        const validation = validationService.validateMovie(req.body)
        const arr = []
        if (!validation.error) {

            const validationCharacters = await characterService.existentCharactersVerify(req.body.Characters)

            if (!validationCharacters.error) {
                validationCharacters.forEach(character => arr.push(character.id))
                const mov = await Movie.findOne({
                    where: { id: req.body.id }, include: {
                        model: Character,
                    }
                }).then(m => m).catch(err => res.status(500).json(err))

                if (mov) {
                    await mov.setCharacters(arr).then(m => {
                        Movie.update(req.body, {
                            where: {
                                id: req.body.id
                            }
                        }).then(s =>
                            res.json({ res: `Changed movie ${req.body.title} with id: ${req.body.id}.` }))
                            .catch(err => res.status(500).json(err))
                    }).catch(err => res.status(500).json(err))

                } else {
                    res.status(404).json({ error: `The movie with ID:${req.body.id} doesn't exist.` })
                }

            } else {
                res.status(500).json({ error: "One or more characters doesn't exist." })
            }

        } else {
            res.status(500).json({ error: validation.error })
        }
    },
    // 4 - Delete
    async deleteMovie(req, res) {

        await Movie.destroy({
            where: {
                id: req.body.id
            }
        })
            .then(result => {
                if (result == 0) {
                    res.status(500).json({ error: `Can't find movie with ID:${req.body.id}` })
                } else {
                    res.status(200).json({ msj: `Movie with ID:${req.body.id} deleted.` })
                }
            })

            .catch(err => {
                if (!req.body.id) {
                    res.status(500).json({ error: "ID is required." })
                } else {
                    res.status(500).json({ error: "Error deleting movie." })
                }

            })
    }



}