const { Character, Movie } = require('../models/index');
const validationService = require('../services/validationService');
const characterService = require('../services/characterService')
const { Op } = require("sequelize");



module.exports = {

    //CRUD - CREATE-READ-UPDATE-DELETE

    //1 - CREATE 
    async createCharacter(req, res) {

        //Validar Object Character
        const validation = validationService.validateCharacter(req.body)

        if (!validation.error) {

            const characterCreate = await characterService.newCharactersVerifyandCreate([req.body])

            if (!characterCreate.error) {
                res.json(characterCreate.added[0])
            } else {
                res.status(500).json(characterCreate.error)
            }

        } else {
            res.status(500).json({ error: validation.error })
        }


    },

    //2 - READ
    async findAll(req, res) {


        //Filtrar si hay parametros.
        if (req.query.name) {
            await Character.findAll({
                attributes: [
                    'imageURL', 'name'
                ],
                where: {
                    name: {
                        [Op.like]: '%' + req.query.name
                    }
                }
            }).then(response => res.json(response))
                .catch(err => res.status(500).json({ error: err }));

        } else if (req.query.age) {
            await Character.findAll({
                attributes: [
                    'imageURL', 'name'
                ],
                where: {
                    age: {
                        [Op.like]: '%' + req.query.age
                    }
                }
            }).then(response => {
                if (response.length == 0) {
                    res.status(404).json({ error: `Characters with age ${req.query.age} not found.` })
                } else {
                    res.json(response)
                }
            })
                .catch(err => res.status(500).json({ error: err }));

        } else if (req.query.movies) {

            const movieData = await Movie.findOne({ where: { id: req.query.movies } })

            await Character.findAll({
                attributes: [
                    'imageURL', 'name'
                ],
                include: [{
                    model: Movie,
                    through: {
                        attributes: []
                    },
                    where: {
                        id: req.query.movies
                    },
                    attributes: []
                }]
            }).then(response => {
                if (response.length == 0) {
                    res.status(404).json({ error: "Movie not found" })
                } else {
                    res.json({ Movie: movieData.title, Characters: response })
                }
            })
                .catch(err => res.status(500).json({ error: err }));



        } else {
            const characters = await Character.findAll({
                attributes: [
                    'imageURL', 'name'
                ]
            });
            res.json(characters)
        }


    },

    async findById(req, res) {

        const char = await Character.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Movie,
                through: {
                    attributes: []
                }
            }
        }).then(char => {
            if (char) {
                res.json(char)
            } else {
                res.status(404).json({ error: "Character not found." })
            }
        }).catch(err=>res.status(500).json(err))




    },

    //3 - UPDATE 
    async updateCharacter(req, res) {

        //Validate character
        const validation = validationService.validateCharacter(req.body);

        
        if (req.body.id) {
            
            if (!validation.error) {
                await Character.update(req.body, {
                    where: {
                        id: req.body.id
                    }
                }).then(result => res.status(200).json({ result: `Successfully changed Character ID:${req.body.id}.` }))
                    .catch(err =>
                        res.status(404).json({ error: `Cannot find Character with id:${req.body.id}` })
                    )
            } else {
                res.status(500).json({ error: validation.error })
            }

        } else {
            res.status(500).json({ error: "ID is required." })

        }

    },

    //4 - DELETE
    async deletebyId(req, res) {

        await Character.destroy({
            where: {
                id: req.body.id
            }
        })
            .then(result => {
                if (result == 0) {
                    res.status(500).json({ error: `Can't find character with ID:${req.body.id}` })
                } else {
                    res.status(200).json({ msj: `Character with ID:${req.body.id} deleted.` })
                }
            })

            .catch(err => {
                if (!req.body.id) {
                    res.status(500).json({ error: "ID is required." })
                } else {
                    res.status(500).json({ error: "Error deleting character." })
                }

            })

    }
}