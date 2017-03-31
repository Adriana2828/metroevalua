const Sequelize=require('sequelize');
var sequelize = new Sequelize('c9', 'adriana2828', null, {});
var Docente=sequelize.import(__dirname+"/Docente.js");
var Seccion=sequelize.import(__dirname+"/Seccion.js");
module.exports = function(sequelize, DataTypes) {

  return sequelize.define('evaluacion', { 
      id:{type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
  
  docenteid: {
   type: Sequelize.INTEGER,
   allowNull: true,
   references: {
     // This is a reference to another model
     model: Docente,

     // This is the column name of the referenced model
     key: 'id',

     
   }
 },
  seccionid: {
   type: Sequelize.INTEGER,
   allowNull: true, //en la implementacion habra que poner -1 para asumir que es null la seccion xq la
                    // tabla no se pudo modificar para agregarle este cambio de que seccionid aceptar null.
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

