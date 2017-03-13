const Sequelize=require('sequelize');
var sequelize = new Sequelize('c9', 'adriana2828', null, {});


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persona2', { //crea una tabla llamada persona2s, al definir el modelo el crea la tabla en la bd
      id:{type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
  nombre: Sequelize.STRING,
  cedula: Sequelize.STRING
});
}