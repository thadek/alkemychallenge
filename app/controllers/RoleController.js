const RoleService = require('../services/roleService');

const getRoles = async (req,res) => res.json(await RoleService.getRoles());

const roleController = {
    getRoles
}

module.exports = roleController;