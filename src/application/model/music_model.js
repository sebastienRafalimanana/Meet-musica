const {DataTypes, Model } = require("sequelize");
const sequelize = require ('../../config/db_config')

class Music extends Model {
  id;
  author;
  title;
  categorie;
}

Music.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categorie: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize, 
    modelName: "Music",
  }
);

module.exports = Music
