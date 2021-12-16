const UserRepository = require('../repositories/UserRepository')
const encryptionServ = require('./encryptionService')
const jwt = require('jsonwebtoken')
const ms = require('./mailService');
const validationService = require('../services/validationService');
require('dotenv').config();
const repo = new UserRepository();
const roleService = require('./roleService');

const createUser = async (usr) => {
  const validateUser = validationService.validateUser(usr);
  if (!validateUser.error) {
    const validatePassword = validationService.validatePassword(usr.password)
    if (!validatePassword.error) {
      //Password Encrypt
      const passwordEncrypted = encryptionServ.encryptPass(usr.password)
      usr.password = passwordEncrypted;
      //Try to create user
      const userCreated = await repo.create(usr).then().catch(e => console.log(e))
      if (!userCreated.error) {
        //User correctly created -> asign role, welcome Mail.
        await roleService.setDefaultRole(userCreated.id)
        await ms.sendWelcomeMail(userCreated)
        return { status: 200, response: { user: userCreated} }
      } else {
        return { status: 500, response: userCreated }
      }

    } else {
      return { status: 500, response: { error: validatePassword.msg } }
    }
  } else {
    return { status: 500, response: { error: validateUser.error } }
  }

}

const loginUser = async (usr) => {
  const validateUser = validationService.validateLogin(usr);
  if (!validateUser.error) {
    const { email, password } = usr;
    const userRepo = await repo.findByEmail(email).then().catch(err => console.log(err));

    if (!userRepo) {
      return { status: 404, response:{error: "Inexistent user." }}
    } else {
      if (encryptionServ.verifyPass(password, userRepo.password)) {  
        const token = jwt.sign({ user: userRepo }, process.env.AUTH_SECRET, {
                        expiresIn: process.env.AUTH_EXPIRES});
        return { status:200, response:{msg:`Welcome ${userRepo.name}.`, token:token}}
      } else {
        return { status: 401, response:{error: "Incorrect login, try again." }}
      }

    }
  } else {
    return { status: 500, response:{error: validateUser.error} }
  }


}

const userService = {
  createUser,
  loginUser
}
module.exports = userService;












