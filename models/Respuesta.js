const Sequelize=require('sequelize');
var sequelize = new Sequelize('c9', 'adriana2828', null, {});
var Evaluacion=sequelize.import(__dirname+"/Evaluacion.js");
var Pregunta=sequelize.import(__dirname+"/Pregunta.js");
module.exports = function(sequelize, DataTypes) {

  return sequelize.define('respuesta', { 
      id:{type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
  
  evaluacionid: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Evaluacion,

     // This is the column name of the referenced model
     key: 'id',

     
   }
 },
  preguntaid: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Pregunta,

     // This is the column name of the referenced model
     key: 'id',

     
   },
   
 },
 
 valor:Sequelize.STRING,
 
 
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});



}

