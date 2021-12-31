const userService = require('../services/userService')
const roleService = require('../services/roleService')
module.exports = {

    getUsers:(req,res) =>{
        userService.getUsers(req.query).then(serviceResponse=>{
            res.status(serviceResponse.status).json(serviceResponse.response)
        }).catch(error => {
            res.status(500).json({ error: error });})
    },

    getUserRoles:(req,res) =>{
       userService.getUserRoles(req.params.id).then(serviceResponse=>{
        res.status(serviceResponse.status).json(serviceResponse.response)
    })
    },

    setUserRoles:(req,res) =>{
       roleService.setRoles(req.user.id,req.params.id,req.body.Roles).then(serviceResponse=>{
        res.status(serviceResponse.status).json(serviceResponse.response)
    })
    }


}