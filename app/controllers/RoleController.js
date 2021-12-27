const RoleService = require('../services/roleService');

module.exports = {

getRoles: async (req,res) => res.json(await RoleService.getRoles()),

createRole: (req,res) => {
    RoleService.createRole(req.body)
    .then(serviceResponse=>{res.status(serviceResponse.status).json(serviceResponse.response)})
    .catch(err=>{res.status(500).json(err)})
},

modifyRole: (req,res) => {
    RoleService.modifyRole(req.body)
    .then(serviceResponse=>{ res.status(serviceResponse.status).json(serviceResponse.response)})
    .catch(err=>{res.status(500).json(err)})
},

deleteRole: (req,res) => {
    RoleService.deleteById(req.params.id)
    .then(serviceResponse=>{ res.status(serviceResponse.status).json(serviceResponse.response)})
    
}

}


 


