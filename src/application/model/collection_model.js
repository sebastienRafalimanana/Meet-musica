const { DataTypes, Model } = require("sequelize");
const User = require("./user_model");
const Music = require("./music_model");
const sequelize = require("../../config/db_config");

class Collection extends Model {
  /*
  id;
  */
}

Collection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "Collection",
  }
);
User.hasOne(Collection, {
  onDelete: "CASCADE",
});

Collection.belongsTo(User);
Collection.belongsToMany(Music, { through: "CollectionMusic" });

module.exports = Collection;
