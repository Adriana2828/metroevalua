const Sequelize=require('sequelize');
var sequelize = new Sequelize('c9', 'adriana2828', null, {});


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pregunta', { 
      id:{type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
  modelo:{ type: DataTypes.ENUM('a', 'b')},
  enunciado:Sequelize.STRING,
  eliminado:Sequelize.BOOLEAN,
  limite:{ type: DataTypes.ENUM('4', '5')},

}, {
  freezeTableName: true // Model tableName will be the same as the model name
});
}