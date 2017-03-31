const Sequelize=require('sequelize');
var sequelize = new Sequelize('c9', 'adriana2828', null, {});
var Docente=sequelize.import(__dirname+"/Docente.js");
var Departamento=sequelize.import(__dirname+"/Departamento.js");
module.exports = function(sequelize, DataTypes) {

  return sequelize.define('docdpto', { 
      id:{type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
  
  docenteid: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Docente,

     // This is the column name of the referenced model
     key: 'id',

     
   }
 },
  departamentoid: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Departamento,

     // This is the column name of the referenced model
     key: 'id',

     
   },
   
 },
 jefedpto:Sequelize.BOOLEAN,
 
 
 
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});



}

