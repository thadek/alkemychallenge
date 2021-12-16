'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    
    static associate(models) {
      Role.belongsToMany(models.User,{through:'user_roles'}); 
    }
  };
  Role.init({
    name: {
     type:DataTypes.STRING,
     unique:true,
     allowNull:false
    },
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Role',
  });
  return Role;
};