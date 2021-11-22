const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {



    if (req.headers.authorization) {

        //Verifico token.
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {

            if (err) {
                res.status(500).json({ error: "Error decoding token.", errorData: err })
            } else {
               req.user = decoded;
               next();
            }
        })
        
    } else {
        //Sin token en header
        res.status(401).json({ error: "401 - Unauthorized" })
    }



}
