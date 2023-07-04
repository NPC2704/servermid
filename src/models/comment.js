"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Work, {
        foreignKey: "id_cmt",
        targetKey: "id",
        as: "id_Cmt",
      });
    }
  }
  Comment.init(
    {
      cmt: DataTypes.STRING,
      id_cmt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
