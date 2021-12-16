const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {

encryptPass(password){
    return bcrypt.hashSync(password, Number.parseInt(process.env.AUTH_ROUNDS));
},

verifyPass(password,encryptedPass){
     return bcrypt.compareSync(password,encryptedPass)
}

}