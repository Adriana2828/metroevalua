var Sequelize = require('sequelize');


// initialize database connection
var sequelize = new Sequelize('c9', 'adriana2828', "", {
host: 'localhost',
dialect: 'mysql',

pool: {
    max: 5,
    min: 0,
    idle: 10000
}
});

// load models
var models = [
'Departamento',
'DocDpto',
'Docente',
'Ejemplo',
'EstSec',
'Estudiante',
'Evaluacion',
'Materia',
'Pregunta',
'Respuesta',
'Seccion',
'Vicerrectorado',
'Link'
];
models.forEach(function(model) {
module.exports[model] = sequelize.import(__dirname + '/' + model);
});



// export connection
module.exports.sequelize = sequelize;