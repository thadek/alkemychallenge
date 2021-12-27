const RoleRepository = require('../repositories/RoleRepository');
const validationService = require('./validationService');
const repo = new RoleRepository();
const rh = require('./responseHandler')


const getAllRoles = async () => await repo.getAll();

const createRole = async (role) => {
    const validation = validationService.validateRole(role);
    if (validation.error) return rh.sendResponse(500, validation.error);
    const repoResponse = await repo.create(role);
    return rh.sendResponse(200, repoResponse)
}

const setDefaultRole = async (userId) => {
    const defaultRole = await repo.findByName('user');
    const res = await defaultRole.addUser(userId).then(() => { return { response: "ok" } }).catch(err => console.log(err));
    return res;
}

const setRole = async (userId, roleName) => {
    const role = await repo.findByName(roleName);
    const res = await role.addUser(userId).then(() => { return { response: "ok" } }).catch(err => console.log(err));
    return res;
}

const modifyRole = async (role) => {
    if (!role.id) return rh.sendResponse(400, "ID is required field.")
    const validation = validationService.validateRole(role)
    if (validation.error) return rh.sendResponse(400, validation.error)
    const resp = await repo.update(role)
    if (resp == 0) return rh.sendResponse(400, `Nothing to update or error with role id.`)
    if (resp > 0) return rh.sendResponse(200, `Role with ID ${role.id} updated.`)
}

const deleteById = async (id) => {
    if (isNaN(Number.parseInt(id))) return rh.sendResponse(400, `Invalid ID.`)
    const role = await repo.findById(id);
    if(!role) return rh.sendResponse(400, `Can't find role with ID:${id}`)
    const validation = validationService.validateRole(role)
    if (validation.error) return rh.sendResponse(400, validation.error)
    const res = await repo.deleteById(id)
    if (res.error) return rh.sendResponse(500, res.error)
    return rh.sendResponse(200, { response: `Role with ID:${id} deleted.` })
}

const roleService = {
    getAllRoles,
    createRole,
    setDefaultRole,
    setRole,
    modifyRole,
    deleteById
}

module.exports = roleService;

