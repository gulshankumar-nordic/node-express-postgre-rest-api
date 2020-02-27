const Sequelize = require("sequelize");
const db = require("../config/database");

const CourseSchema = db.define(
  "course",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    //timestamps: false
  }
);

module.exports = CourseSchema;
