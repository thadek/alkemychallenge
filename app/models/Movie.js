'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    
    static associate(models) {
      Movie.belongsToMany(models.Character, { through: 'character_movies' });
      Movie.belongsTo(models.Genre)
    }
  };

  Movie.init({
    imageURL: DataTypes.STRING,
    title: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }

    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Movie',
  });
  return Movie;
};