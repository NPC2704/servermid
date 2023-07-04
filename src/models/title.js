"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Title extends Model {
    static associate(models) {
      Title.belongsTo(models.Work, {
        foreignKey: "code",
        targetKey: "id_title",
        as: "id_Title",
      });
    }
  }
  Title.init(
    {
      title: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Title",
    }
  );
  return Title;
};
