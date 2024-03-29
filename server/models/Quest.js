const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Quest extends Model {}

Quest.init(
  {
    quest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    questName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quest_log_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'QuestLog', 
        key: 'quest_log_id', 
      },
    },
    quest_location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'QuestLocation', 
        key: 'quest_location_id', 
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Quest',
  }
);

module.exports = Quest;
