const characterService = require('../services/characterService')
module.exports = {
    
    createCharacter: (req, res) => {
        characterService.createCharacter(req.body).then(serviceResponse => { res.status(serviceResponse.status).json(serviceResponse.response) })
    },
    findAll: (req, res) => {
        characterService.getCharacters(req.query).then(serviceResponse => { res.status(serviceResponse.status).json(serviceResponse.response) })
    },
    findById: (req, res) => {
        characterService.getCharacter(req.params.id).then(serviceResponse => { res.status(serviceResponse.status).json(serviceResponse.response) })
    },
    updateCharacter: (req, res) => {
        characterService.updateCharacter(req.body).then(serviceResponse => { res.status(serviceResponse.status).json(serviceResponse.response) })
    },
    deletebyId: (req, res) => {
        characterService.deleteById(req.params.id).then(serviceResponse => { res.status(serviceResponse.status).json(serviceResponse.response) })
    }
}