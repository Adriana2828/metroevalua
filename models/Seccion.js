const Sequelize=require('sequelize');
var sequelize = new Sequelize('c9', 'adriana2828', null, {});
var models  =  require('../models/index.js');
var Docente=sequelize.import(__dirname+"/Docente.js");
var Materia=sequelize.import(__dirname+"/Materia.js");
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seccion', { 
      id:{type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
  codigo_tri: Sequelize.STRING,
  capacidad:Sequelize.INTEGER,
  disponible:Sequelize.BOOLEAN,
   materiaid: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Materia,

     // This is the column name of the referenced model
     key: 'id',

     
   }
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
 
 
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

}
