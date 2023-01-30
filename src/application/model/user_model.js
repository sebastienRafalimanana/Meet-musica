const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db_config");

class User extends Model {
  /*
  id;
  firstName;
  lastName;
  email;
  password;
  bio;
  profil;*/
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    profil: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);
module.exports = User;
