'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
  
    static associate(models) {       
      Character.belongsToMany(models.Movie, {through:'character_movies'});
    
    }
  };
  Character.init({
    imageURL: {
      type:DataTypes.STRING,
      allowNull:false
      
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
      
    } ,
    age: {type:DataTypes.INTEGER,allowNull:false},
    weight: {type:DataTypes.INTEGER,allowNull:false},
    history: {type:DataTypes.TEXT,allowNull:false}
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Character',
  });
  return Character;
};