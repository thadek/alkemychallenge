const RoleRepository = require('../repositories/RoleRepository');
const validationService = require('./validationService');
const UserRepository = require('../repositories/UserRepository');
const repo = new RoleRepository();
const usrRepo = new UserRepository();
const rh = require('./responseHandler');
const responseHandler = require('./responseHandler');



const getAllRoles = async () => await repo.getAll();

const createRole = async (role) => {
    const validation = validationService.validateRole(role);
    if (validation.error) return rh.sendResponse(400, validation.error);
    const repoResponse = await repo.create(role);
    return rh.sendResponse(201, repoResponse)
}

const setDefaultRole = async (userId) => {
    const defaultRole = await repo.findByName('user');
    const res = await defaultRole.addUser(userId).then(() => { return { response: "ok" } }).catch(err => console.log(err));
    return res;
}

const addRole = async (userId, roleName) => {
    const role = await repo.findByName(roleName);
    const res = await role.addUser(userId).then(() => { return { response: "ok" } }).catch(err => console.log(err));
    return res;
}
const setRoles = async (requestUserId,userId, roleIds) => {
    const usr = await usrRepo.findById(userId)
    if(requestUserId == userId) return responseHandler.sendResponse(400,"Can't change your own roles.")
    if(!(Array.isArray(roleIds)) || isNaN(roleIds[0])) return responseHandler.sendResponse(400,"SetRoles only accepts array of roleIds")
    const res = await usr.setRoles(roleIds).then(async () => { 
        const usrRoles = await usrRepo.getRoles(userId);
        return responseHandler.sendResponse(200,{response:"User roles updated.",User:usrRoles}) }).catch(err => console.log(err));
    return res;
}

const modifyRole = async (role) => {
    if (!role.id) return rh.sendResponse(400, "ID is required field.")
    const validation = validationService.validateRole(role)
    if (validation.error) return rh.sendResponse(400, validation.error)
    const resp = await repo.update(role)
    if (resp == 0) return rh.sendResponse(400, `Nothing to update or error with role id.`)
    if (resp > 0) return rh.sendResponse(200, {response:`Role with ID ${role.id} updated.`})
}

const deleteById = async (id) => {
    if (isNaN(Number.parseInt(id))) return rh.sendResponse(400, `Invalid ID.`)
    const role = await repo.findById(id);
    if(!role) return rh.sendResponse(404, `Can't find role with ID:${id}`)
    const validation = validationService.validateRole(role)
    if (validation.error) return rh.sendResponse(400, validation.error)
    const res = await repo.deleteById(id)
    if (res.error) return rh.sendResponse(500, res.error)
    return rh.sendResponse(200, { response: `Role with ID:${id} deleted.` })
}

const roleService = {
    addRole,
    getAllRoles,
    createRole,
    setDefaultRole,
    setRoles,
    modifyRole,
    deleteById
}

module.exports = roleService;

