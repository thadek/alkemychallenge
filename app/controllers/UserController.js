const userService = require('../services/userService')
module.exports = {

    login: (req, res) => {
        userService.loginUser(req.body)
            .then(serviceResponse => {
                res.status(serviceResponse.status).json(serviceResponse.response)
            }).catch(err => { res.status(500).json({ error: err }) });
    },

    register: (req, res) => {
        userService.createUser(req.body)
            .then(serviceResponse => {
                res.status(serviceResponse.status).json(serviceResponse.response)
            }).catch(error => {
                res.status(500).json({ error: error });})
    },

    getUsers: async(req,res) =>{
        userService.getUsers().then(serviceResponse=>{
            res.status(serviceResponse.status).json(serviceResponse.response)
        }).catch(error => {
            res.status(500).json({ error: error });})
    },

    getUserRoles: async(req,res) =>{
       userService.getUserRoles(req.params.id).then(serviceResponse=>{
        res.status(serviceResponse.status).json(serviceResponse.response)
    })
    }

}