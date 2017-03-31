const Sequelize=require('sequelize');
var sequelize = new Sequelize('c9', 'adriana2828', null, {});
var Estudiante=sequelize.import(__dirname+"/Estudiante.js");
var Seccion=sequelize.import(__dirname+"/Seccion.js");
module.exports = function(sequelize, DataTypes) {

  return sequelize.define('estsec', { 
      id:{type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
  
  estudianteid: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Estudiante,

     // This is the column name of the referenced model
     key: 'id',

     
   }
 },
  seccionid: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Seccion,

     // This is the column name of the referenced model
     key: 'id',

     
   },
   
 },
 
 
 
 
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});



}

