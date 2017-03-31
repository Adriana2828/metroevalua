const Sequelize=require('sequelize');
var sequelize = new Sequelize('c9', 'adriana2828', null, {});
var Departamento=sequelize.import(__dirname+"/Departamento.js");

module.exports = function(sequelize, DataTypes) {

  return sequelize.define('materia', { 
      id:{type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
  nombre:Sequelize.STRING,    
  codigo:Sequelize.STRING,
  departamentoid: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Departamento,

     // This is the column name of the referenced model
     key: 'id',

     
   }
 },

 
 
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});



}

