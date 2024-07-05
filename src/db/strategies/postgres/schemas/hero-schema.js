const { Sequelize, DataTypes } = require("sequelize");
const HeroSchema = {
  name: "Herois",
  schema: {
    id: {
      type: DataTypes.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    heroName: {
      type: DataTypes.STRING,
      required: true,
    },
    heroPower: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  options: {
    tableName: "TB_HEROIS",
    freezeTableName: false,
    timestamps: false,
  },
};

module.exports = { 
    HeroSchema
}
