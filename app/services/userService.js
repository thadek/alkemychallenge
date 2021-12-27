const UserRepository = require('../repositories/UserRepository')
const encryptionServ = require('./encryptionService')
const jwt = require('jsonwebtoken')
const ms = require('./mailService');
const validationService = require('../services/validationService');
require('dotenv').config();
const repo = new UserRepository();
const roleService = require('./roleService');
const responseHandler = require('./responseHandler');

const createUser = async (usr) => {
  const validateUser = validationService.validateUser(usr);
  if (validateUser.error) return responseHandler.sendResponse(400, validateUser.error)
  const passwordEncrypted = encryptionServ.encryptPass(usr.password)
  const passWithoutEncrypt = JSON.parse(JSON.stringify(usr.password)) //Password without encrypt is used in welcome mail
  usr.password = passwordEncrypted;
  //Try to create user
  const repoResponse = await repo.create(usr)
  if (repoResponse.error) return responseHandler.sendResponse(400, repoResponse.error)
  //User created -> asign role, welcome Mail.
  await roleService.setDefaultRole(repoResponse.id)
  ms.sendWelcomeMail(repoResponse, passWithoutEncrypt)
  return responseHandler.sendResponse(200, { msg: `Welcome ${repoResponse.name}! Registration is complete. We send you a welcome mail!.` })
}

const loginUser = async (usr) => {
  const validateUser = validationService.validateLogin(usr);
  if (validateUser.error) return responseHandler.sendResponse(400, validateUser.error)
  const { email, password } = usr;
  const repoResponse = await repo.findByEmail(email).then().catch(err => console.log(err));
  if (!repoResponse) return responseHandler.sendResponse(404, "Inexistent user.")
  if (!(encryptionServ.verifyPass(password, repoResponse.password))) return responseHandler.sendResponse(401, "Incorrect login, try again.")
  const token = jwt.sign({ user: { id: repoResponse.id } }, process.env.AUTH_SECRET, {
    expiresIn: process.env.AUTH_EXPIRES
  });
  return responseHandler.sendResponse(200, { msg: `Welcome ${repoResponse.name}.`, token: token })
}

const getUsers = async() =>{ const res = await repo.getAll(); return responseHandler.sendResponse(200,res)}

const getUser = async(id) => {
  const res = repo.findById(id);
  if(!res) return responseHandler.sendResponse(404,"User not found")
  return responseHandler.sendResponse(200,res)
}

const getUserRoles = async(id) => { 
  const res = await repo.getRoles(id)
  if(!res) return responseHandler.sendResponse(404,"User not found.")
  return responseHandler.sendResponse(200,res)
}

const userService = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  getUserRoles
}
module.exports = userService;












