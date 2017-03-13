const Sequelize=require('sequelize');
const sequelize = new Sequelize('c9', 'adriana2828', "", {
  host: 'localhost',
  dialect: 'mysql',
})
var Ejemplo=sequelize.import(__dirname+"/Ejemplo.js"); 
const Bcrypt = require('bcrypt');
const users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret' 
        name: 'John Doe',
        id: '2133d32a'
    }
};

 
var baseRoutes = {
  register: function (server, options, next) {
    var routes = [ //arreglo de rutas
      // RUTA DE EJEMPLO
            {
  method: 'GET',
  path: '/hello',
  handler: function (request, reply) {
    return reply('Hello world');
    }
  }, 
    
 
 
   
  //Vistas del Proyecto
      

           {
  method: 'GET',
  path: '/',
  handler:  {
     view:'iniciarsesion'
    }
  }, 
     
     
     







{
    method:[ 'POST', 'PUT' ],
    path:'/validar',
    handler:
function(request,reply){ //login temporal
     var username1="jefedpto";
     var password1="password";
     console.log(request.payload);
     var username=request.payload.username; 
     var password=request.payload.password;
     if((username1==username)&&(password1==password)){
         
         reply.view('sesionjefedpto');
         
     }
     else{
         
         reply('Usuario No autorizado');
     }
    
}
},

{
    method:'GET',
    path:'/vicerrectorado',
    handler:{
        
        view:'sesionvicerrectorado'
    }
},


{
    method:'GET',
    path:'/enviar_evaluacion_docente',
    handler:{
        
        view:'enviar_evaluacion_docente'
    }
},



//________


{
    method: 'GET',
    path:'/enviar_evaluacion_estudiante', 
    handler:function (request,reply){ 
      
     
      Ejemplo.sequelize.sync();    
      Ejemplo.findAll().then(function(ejemplo) {
      //
      // En este caso ejemplo es un arreglo.
      // objeto1 es un json que tiene un arreglo que se llama personas.
      // a cada elemento i de personas le agregamos un elemento i de ejemplo.
      //  
   var i;   
   var   objeto1={personas:[
                          
                          ]
                };

  for(i=0;i<2;i++){
    
      
      
   objeto1.personas[i]={nombre:ejemplo[i].dataValues.nombre, 
                    cedula:ejemplo[i].dataValues.cedula
                    };
 
  }

    console.log(ejemplo);
       
  return reply.view('enviar_evaluacion_estudiante',objeto1);
  });
  
    }      
},




//________
    

/*
{
    method:'GET',
    path:'/enviar_evaluacion_estudiante',
    handler:{
        
        view:'enviar_evaluacion_estudiante'
    }
},*/




{
    method:'GET',
    path:'/fortune',
    handler:{
        
        view:'fortune'
    }
}



    ]

    // add defined routes to hapi
    server.route(routes)
    next()
  }
}

baseRoutes.register.attributes = {
  name: 'base-routes',
  version: '1.0.0'
}

module.exports = baseRoutes
