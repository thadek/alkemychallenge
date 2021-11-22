'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    
    static associate(models) {
      Genre.hasMany(models.Movie); 
    }
  };
  Genre.init({
    name: {
     type:DataTypes.STRING,
     unique:true,
     allowNull:false
    },
    imageURL: DataTypes.STRING
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Genre',
  });
  return Genre;
};