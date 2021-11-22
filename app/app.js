const express = require('express')
const app = express()
const { sequelize } = require('./models/index');
const router = require('./routes')

//Configs
require('dotenv').config()
const port = process.env.PORT || 3000

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//Router
app.use(router);

//App
app.listen(port, () => {
  console.log(`App working on http://localhost:${port}`);
  

  sequelize.authenticate().then(()=>{
      console.log("DB Online.");
  }).catch(e=>{
      console.log("Error:",e)
  })
})