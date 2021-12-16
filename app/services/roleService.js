const RoleRepository = require('../repositories/RoleRepository');
const repo = new RoleRepository();

const getRoles = async () => await repo.getAll();

const createRole = async (name) => await repo.create({name:name});

const setDefaultRole = async(userId) => {
 const defaultRole = await repo.findByName('user');
 const res = await defaultRole.addUser(userId).then(()=>{return{response:"ok"}}).catch(err=>console.log(err));
 return res;
}

const setRole = async(userId,roleName) => {
const role = await repo.findByName(roleName);
const res = await role.addUser(userId).then(()=>{return{response:"ok"}}).catch(err=>console.log(err));
 return res;
}

const roleService = {
    createRole,
    getRoles,
    setDefaultRole,
    setRole
}
 
module.exports = roleService;

