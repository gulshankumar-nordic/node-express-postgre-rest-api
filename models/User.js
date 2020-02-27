const Sequelize = require("sequelize");
const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ENVCONFIG = require("../config/config");

const UserSchema = db.define(
  "us",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING
    },
    resetPasswordToken: {
      type: Sequelize.STRING
    },
    resetPasswordExpire: {
      type: Sequelize.DATE
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    //timestamps: false
  }
);

UserSchema.beforeCreate((user, option) => {
  return bcrypt
    .hash(user.password, 10)
    .then(hash => {
      user.password = hash;
    })
    .catch(err => {
      throw new Error();
    });
});

UserSchema.prototype.getJWToken = function() {
  return jwt.sign({ id: this.id }, ENVCONFIG.jwt_secret, {
    expiresIn: ENVCONFIG.jwt_expire
  });
};

UserSchema.prototype.matchPassword = function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = UserSchema;
