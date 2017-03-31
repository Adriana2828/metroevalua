const Sequelize=require('sequelize');
var sequelize = new Sequelize('c9', 'adriana2828', null, {});


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('link', { 
      id:{type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
  enlace: Sequelize.STRING,
  utilizado:Sequelize.BOOLEAN,
  
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});
}