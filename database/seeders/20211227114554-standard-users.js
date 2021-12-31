'use strict';
const { Role, User} = require('../../app/models/index')
const encryptionService = require('../../app/services/encryptionService')
module.exports = {
  up: async (queryInterface, Sequelize) => {
   return Promise.all([
    User.create({
      name:"admin",
      email:"admin@alkemy.org",
      password:encryptionService.encryptPass('123456'),
      Roles:[{name:"admin"}]
    },{include:[Role]}),
    
    User.create({
      name:"user",
      email:"user@alkemy.org",
      password:encryptionService.encryptPass('123456'),
      Roles:[{name:"user"}]
    },{include:[Role]}),
   
   ])
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};
