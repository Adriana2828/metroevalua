const Sequelize=require('sequelize');
var sequelize = new Sequelize('c9', 'adriana2828', null, {});


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departamento', { 
      id:{type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
  nombre: Sequelize.STRING,
  
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});
}