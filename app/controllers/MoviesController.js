const ms = require('../services/movieService');
module.exports = {

    createMovie: (req, res) => {
        ms.createMovie(req.body).then(serviceResponse=>{ res.status(serviceResponse.status).json(serviceResponse.response) })
    },
    findAll: (req, res) => {
        ms.getMovies(req.query).then(serviceResponse=>{ res.status(serviceResponse.status).json(serviceResponse.response) })
    },
    findById: (req, res) => {
        ms.findById(req.params.id).then(serviceResponse => { res.status(serviceResponse.status).json(serviceResponse.response) })
    },
    updateMovie: (req, res) => {
        ms.updateMovie(req.body).then(serviceResponse => { res.status(serviceResponse.status).json(serviceResponse.response) })
    },
    deleteMovie: (req, res) => {
       ms.deleteById(req.params.id).then(serviceResponse=>{res.status(serviceResponse.status).json(serviceResponse.response)})
    }

}
