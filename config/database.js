require('dotenv').config();

module.exports = {
  //Db Conf.
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || 'alkemychallenge',
    port:process.env.DB_PORT || '3306',
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging:false,

  // Config de Seeds
  seederStorage:"sequelize",
  seederStorageTableName:"seeds",

  //Config de Migrations
  migrationStorage: "sequelize",
  migrationStorageTableName:"migrations"

}


  

