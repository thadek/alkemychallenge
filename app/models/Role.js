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
     allowNull:false,
     validate:{
       isLowercase:{
         msg:"Role name is only accepted in lowercase."
       }
     },
     unique: {
           args: 'name',
           msg: 'The role already exists.'
        }
    },
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Role',
  });
  return Role;
};