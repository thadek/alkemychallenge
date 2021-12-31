const express = require('express')
const app = express()
const { sequelize } = require('./models/index');
const router = require('./routes')

//Configs
require('dotenv').config()
const port = process.env.PORT || 3000

//Middleware request body types
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//Docs Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../thadek-disneyapi.json')
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//Router
app.use(router);

//App
module.exports = app.listen(port,() => {
  console.log('\x1b[35m%s\x1b[0m', " \n > Alkemy Challenge - Gabriel Pamich - github.com/thadek \n")
  console.log('\x1b[36m%s\x1b[0m',`App working on http://localhost:${port}`);
  console.log('\x1b[34m%s\x1b[0m','Documentation URL: http://localhost:9116/docs')
  
})



