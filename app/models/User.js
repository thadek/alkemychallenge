'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    static associate(models) {
      User.belongsToMany(models.Role,{through:'user_roles'})
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha:{
          msg:"Name must be contain only letters."
        },
        len:{
          args: [3,255],
          msg:"Name must be 3 characters or more"
        }
        
      }

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail:{
          msg:"Invalid email adress."
        }
      }
    }
  }, {
    sequelize,
    timestamps:false,
    modelName: 'User',
  });
  return User;
};