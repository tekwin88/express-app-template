'use strict';

// at the very top, require bcrypt to use bcryptjs for windows
var bcrypt = require('bcryptjs');
var DataTypes = require('sequelize').DataTypes

var attributes = {
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: 'Invalid email address'
      }
    }
  },
  username: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: [1, 99],
        msg: 'Name must be between 1 and 99 characters'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: [8, 99],
        msg: 'Password must be between 8 and 99 characters'
      }
    }
  }
}

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', attributes, {
      hooks: {
        beforeCreate: function(createdUser, options, cb) {
          // hash the password
          var hash = bcrypt.hashSync(createdUser.password, 10);
          // store the hash as the user's password
          createdUser.password = hash;
          // continue to save the user, with no errors
          cb(null, createdUser);
        }
      },
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      },
      instanceMethods: {
        validPassword: function(password) {
        console.log('password =', password)
        console.log('this.password =', this.password)
        // return if the password matches the hash
        return bcrypt.compareSync(password, this.password);
        },
        toJSON: function() {
          // get the user's JSON data
          var jsonUser = this.get();
          // delete the password from the JSON data, and return
          delete jsonUser.password;
        return jsonUser;
        }
      }
  });
  return user;
};
