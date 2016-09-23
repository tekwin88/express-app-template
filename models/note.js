'use strict';
module.exports = function(sequelize, DataTypes) {
  var note = sequelize.define('note', {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return note;
};