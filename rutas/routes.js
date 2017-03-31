var models  =  require('../models/index.js');
var Estudiante=models.Estudiante;
var Docente=models.Docente;
var Materia=models.Materia;
var Seccion=models.Seccion; 
var EstSec=models.EstSec;
var Evaluacion=models.Evaluacion;
var Link=models.Link;
var Pregunta=models.Pregunta;
var Respuesta=models.Respuesta;
var SendGrid = require('sendgrid-nodejs').SendGrid;
var sendgrid = new SendGrid('adriana2828', 'Oliver.80');
const Sequelize=require('sequelize');
const sequelize = new Sequelize('c9', 'adriana2828', "", {
  host: 'localhost',
  dialect: 'mysql',
});
var SendGrid = require('sendgrid-nodejs').SendGrid;
var sendgrid = new SendGrid('adriana2828', 'Oliver.80');
//______________________________________________________________________________


var baseRoutes = {
  register: function (server, options, next) {
    var routes = [ //arreglo de rutas
    
//_____________________ RUTAS DE EJEMPLO________________________________________
            {
  method: 'GET',
  path: '/hello/{id}/{id2}',
  handler: function (request, reply) {
      var id=request.params.id;
      var id2=request.params.id2;
      console.log('HELLO:_'+id);
      console.log('HELLO:_'+id2);
      return reply('Hello world');
    }
  }, 
  {  
   method: ['POST','PUT'],
  path: '/test',
   handler:function (request,reply){ 
    
          console.log('PREGUNTA:_'+request.payload.preguntaid);
          console.log('EVALUACION:_'+request.payload.evaluacionid);
          console.log('VALOR:_'+request.payload.seccionid);
          console.log('PREGUNTA:_'+request.payload.materiaid);
          console.log('EVALUACION:_'+request.payload.estudianteid);
         //console.log("esto es lo que test esta recibiendo:_"+valor);
          return reply.view('test');
 
    } 
  },
  
  

//_____________________ RUTAS DE EJEMPLO________________________________________ 
   
//_____________________ RUTAS del Proyecto______________________________________
/*     
{
  method: 'GET',
  path: '/',
  handler:  {
              view:'iniciarsesion'
            }
  },
*/ 
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
/*
{
    method:'GET',
    path:'/sesionjefedpto',
    handler:{
        
        view:'sesionjefedpto'
    }
},*/

//__________________MODIFICAR INSTRUMENTO DE EVALUACION_________________________
{
    method:'GET',
    path:'/modificar_a/{modelo}',
    handler:function(request,reply){
      var modelo=request.params.modelo;
      var letra;
      if (modelo=='a'){
          letra=modelo;
      }
      else {
          letra='b'
      }
      Pregunta.sequelize.sync();    
      Pregunta.findAll(
          {
           where: {
                   modelo: letra
                  }
           }).then(function(e) 
          {
           //
           // En este caso ejemplo es un arreglo.
           // objeto1 es un json que tiene un arreglo que se llama personas.
           // a cada elemento i de personas le agregamos un elemento i de ejemplo.
           //  
             var i;   
             var   objeto1={
                            preguntas:[],
                            nombres:{
                            }
                           };

             for(i=0;i<e.length-1;i++)
             
             {
               objeto1.preguntas[i]={  enunciado:e[i].dataValues.enunciado, 
                                       preguntaid:e[i].dataValues.id,
                                     
                                    };
 
             }
  
             //var objeto2={preguntas:[ {enunciado:'El profesor es rata o no', id:'1'}]}
             //console.log(e);
              console.log(letra);
              if (letra=='a'){
              objeto1.nombres={
                      titulo:'Evaluacion al Docente',
                      modelo:'a',
                      tipo:'estudiante'
              }      
              
                  
              }
              else{
                  
                  objeto1.nombres={
                      titulo:'Evaluacion al Docente',
                      modelo:'b',
                      tipo:'docente'
              }      
              }
              return reply.view('modificar_a',objeto1);
        });
    }
},

{
    method:'POST',
    path:'/ejecutar_modificar',
    handler:function(request,reply){
            var opcion=request.payload.opcion;//arreglo
            var enunciado=request.payload.enunciado;//arreglo
            var pregunta=request.payload.preguntaid;//arreglo
            var enunciado=enunciado;//arreglo
        
        var i;
        for(i=0;i<enunciado.length;i++)
        {    
            
            
            if(opcion[i]=='1'){
             Pregunta.sequelize.sync(); 
             Pregunta.update({
               
               enunciado:enunciado[i] 
             },
          {
           where: {
                   id:pregunta[i] 
                  }
           })
            }
            if(opcion[i]=='2'){
                 Pregunta.update({
               
               eliminado:'true' 
             },
          {
           where: {
                   id:pregunta[i] 
                  }
           })
            }
            if(opcion[i]=='3'){
                 Pregunta.create({
                                modelo:'a',
                                enunciado:enunciado,
                                eliminado:'false',
                                limite:'5'
                               });
            }
             if(opcion[i]=='4'){
                 console.log('opcion 4 seleccionada');
            }
            
        }
        
        reply('Instrumeto de Evaluacion Modificado Exitosamente!');
    }
},

//__________________ACTIVAR EVALUACION DEL ESTUDIANTE___________________________
//1--materias
{
    method: ['GET','POST','PUT'],
    path:'/materias/{departamentoid}/{departamentonombre2}', 
    handler:function (request,reply)
    { 
      var departamentoid=request.params.departamentoid;
      var departamentonombre=request.params.departamentonombre2;
      
      
      Materia.sequelize.sync();    
      Materia.findAll(
          {
           where: {
                   departamentoid: departamentoid //Como no hay login todavia, se esta trabajando con el dpto 3.
                   }
                    }).then(function(e) 
    {
      //
      // En este caso ejemplo es un arreglo.
      // objeto1 es un json que tiene un arreglo que se llama personas.
      // a cada elemento i de personas le agregamos un elemento i de ejemplo.
      //  
      var i;   
      var objeto1={
                   materias:[],
                   nombres:[
                        {departamentonombre:departamentonombre,
                        }
                       ]
                  };

      for(i=0;i<e.length;i++)
      {
    
        objeto1.materias[i]={   
                              nombre:e[i].dataValues.nombre, 
                              codigo:e[i].dataValues.codigo,
                              departamentoid:e[i].dataValues.departamentoid,
                              id:e[i].dataValues.id
                            };
 
      }

       console.log(e);
       return reply.view('materias',objeto1);
  });
}      
},
//2--secciones
{
    method: ['POST','PUT'],
    path:'/secciones', 
    handler:function (request,reply)
    { 
      
      var matid=request.payload.id;
      var materianombre=request.payload.nombre;
      Seccion.sequelize.sync();    
      Seccion.findAll({
      where: {
              materiaid: matid
             }
                     }).then(function(e) 
    {
      //
      // En este caso ejemplo es un arreglo.
      // objeto1 es un json que tiene un arreglo que se llama personas.
      // a cada elemento i de personas le agregamos un elemento i de ejemplo.
      //  
         var i;   
         var objeto1={
                      secciones:[],
                      
                     };

     for(i=0;i<e.length;i++)
     {
       objeto1.secciones[i]={   
                              codigo_tri:e[i].dataValues.codigo_tri, 
                              capacidad:e[i].dataValues.capacidad,
                              disponible:e[i].dataValues.disponible,
                              materiaid:e[i].dataValues.materiaid,
                              docenteid:e[i].dataValues.docenteid,
                              id:e[i].dataValues.id,
                              materianombre:materianombre
                            };    
 
     }

    //console.log(e);
    //console.log("el id es:_"+id);   
    
    return reply.view('secciones',objeto1);
  });
  }      
},
//3--enviar_evaluacion_estudiante
{
    method: ['POST','PUT'],
    path:'/enviar_evaluacion_estudiante', 
    handler:function (request,reply)
    { 
      var docenteid=request.payload.docenteid;    
      var materiaid=request.payload.materiaid;
      var seccionid=request.payload.id
      var materianombre=request.payload.materianombre;
      var codigoseccion=request.payload.codigo_tri;
      
      //console.log('materianombre:_'+materianombre);
      //console.log('seccionid:_es'+seccionid);
      
      var evaluacionid;
      Evaluacion.create({
                        seccionid:seccionid,
                        
                     }).then(function(e)
                     {evaluacionid=e.id
      
      Estudiante.sequelize.sync();    
      Estudiante.sequelize.query('SELECT docente.nombre as profesornombre, docente.apellido as profesorapellido, estudiante.id,estudiante.carnet,estudiante.nombre,estudiante.apellido,estudiante.cedula,estudiante.correo FROM estudiante INNER JOIN estsec ON estudiante.id=estsec.estudianteid INNER JOIN seccion ON seccion.id=estsec.seccionid INNER JOIN docente ON seccion.docenteid=docente.id where estsec.seccionid='+seccionid+';' ,{ type: sequelize.QueryTypes.SELECT})
      .then(function(e) 
      {
      //
      // En este caso ejemplo es un arreglo.
      // objeto1 es un json que tiene un arreglo que se llama personas.
      // a cada elemento i de personas le agregamos un elemento i de ejemplo.
      //  
     
     
     
     var i;   
     var   objeto1={
                     estudiantes:[],
                   
                    };
     var profesornombre=e[0].profesornombre;
     var profesorapellido=e[0].profesorapellido;                
                    
     //console.log('seccionid:_'+seccionid);
     
     for(i=0;i<e.length;i++)
    { 
      objeto1.estudiantes[i]={
                               nombre:e[i].nombre, 
                               apellido:e[i].apellido,
                               cedula:e[i].cedula,
                               carnet:e[i].carnet,
                               correo:e[i].correo,
                               
                             };
   
      var estudianteid=e[i].id;
      
      Link.sequelize.sync();
      Link.create({enlace:'https://epsilon-16172si-adriana2828.c9users.io/evaluacion_estudiante/'+profesornombre+'/'+profesorapellido+'/'+materianombre+'/'+codigoseccion+'/'+evaluacionid+'/'+materiaid+'/'+seccionid+'/'+estudianteid+'',
                             utilizado:false
      })
      
       sendgrid.send(
          {
            to: e[i].correo,
            from: 'metroevalua@unimet.edu.ve',
            subject: 'Evaluacion al Docente',
            html:'<h1 style="color:blue;">Evaluación al Docente</h1>'+'<p style="font-size:20px;" align="justify"> Estimado estudiante, el vicerrectorado de la Universidad Metropolitana requiere su colaboración, por favor, ingrese al siguiente link y realice la evaluación docente.<br><br>'+'<a href=https://epsilon-16172si-adriana2828.c9users.io/evaluacion_estudiante/'+profesornombre+'/'+profesorapellido+'/'+materianombre+'/'+codigoseccion+'/'+evaluacionid+'/'+materiaid+'/'+seccionid+'/'+estudianteid+'>Evaluación al Docente: '+profesornombre+' '+profesorapellido+'</a>'+'<br><br>Saludos Cordiales.'+'</p>'+''
            //text: 'https://epsilon-16172si-adriana2828.c9users.io/evaluacion_estudiante/'+profesornombre+'/'+profesorapellido+'/'+materianombre+'/'+codigoseccion+'/'+evaluacionid+'/'+materiaid+'/'+seccionid+'/'+estudianteid+''
          }
                   );       
             
             
             
 
      //console.log(estudianteid);
   
      
              
    }

  
       
    return reply.view('enviar_evaluacion_estudiante',objeto1);
   
   });
                         
   });
   }      
},
//4--evaluacion_estudiante
{
    method:'GET',
    path:'/evaluacion_estudiante/{profesornombre}/{profesorapellido}/{materianombre}/{codigoseccion}/{evaluacionid}/{materiaid}/{seccionid}/{estudianteid}',
    handler:function (request,reply)
    { var materianombre=request.params.materianombre;
      var evaluacionid=request.params.evaluacionid;            
      var materiaid=request.params.materiaid;
      var seccionid=request.params.seccionid;
      var estudianteid=request.params.estudianteid;
      var profesornombre=request.params.profesornombre;
      var profesorapellido=request.params.profesorapellido;
      var codigoseccion=request.params.codigoseccion;
      
      
      console.log('SECCION:_'+seccionid);
      console.log('ESTUDIANTE:_'+estudianteid);
      console.log('MATERIA:_'+materianombre);
      Link.sequelize.sync();
      Link.findAll({
          
          where:{
              enlace:'https://epsilon-16172si-adriana2828.c9users.io/evaluacion_estudiante/'+profesornombre+'/'+profesorapellido+'/'+materianombre+'/'+codigoseccion+'/'+evaluacionid+'/'+materiaid+'/'+seccionid+'/'+estudianteid+''
              
          }
      }).then(function(l){
          
          if(l[0].dataValues.utilizado==true){
              reply("usted ya realizo esta evaluacion");
          }
          else{
              
              
                Pregunta.sequelize.sync();    
      Pregunta.findAll(
          {
           where: {
                   modelo: 'a'
                  }
           }).then(function(e) 
          {
           //
           // En este caso ejemplo es un arreglo.
           // objeto1 es un json que tiene un arreglo que se llama personas.
           // a cada elemento i de personas le agregamos un elemento i de ejemplo.
           //  
             var i;   
             var   objeto1={
                            preguntas:[],
                            nombres:[{
                                      materia:materianombre,
                                      nombre:profesornombre,
                                      apellido:profesorapellido,
                                      seccion:codigoseccion,
                                      
                                     }],
                            otros:[{
                                materianombre:materianombre,
                                codigoseccion:codigoseccion,
                                profesornombre:profesornombre,
                                profesorapellido:profesorapellido,
                                codigoseccion:codigoseccion
                                
                            }]         
                           };

             for(i=0;i<e.length;i++)
             
             if(e[i].eliminado==false){
             
             {
               objeto1.preguntas[i]={  enunciado:e[i].dataValues.enunciado, 
                                       preguntaid:e[i].dataValues.id,
                                       evaluacionid:evaluacionid,
                                       materiaid:materiaid,
                                       seccionid:seccionid,
                                       estudianteid:estudianteid,
                                       
                                    };
 
             }
             }
          
             //console.log(e);
       
              return reply.view('evaluacion_estudiante',objeto1);
        });
              
              
          }
          
      });
    
    }
},
//5--email_estudiante

{
    method:['GET','POST','PUT'],
    path:'/email_estudiante',
    handler:function (request,reply)
    { 
      //esta ruta recibe el post de la evaluacion, y almacena las respuestas solo si es la primera vez que el estudiante esta usando el link.
        var materiaid=request.payload.materiaid[0];
        var seccionid=request.payload.seccionid[0];
        var estudianteid=request.payload.estudianteid[0];
        var evaluacionid=request.payload.evaluacionid[0]; 
        var preguntaid=request.payload.preguntaid;//arreglo
        var valor=request.payload.valor;//arreglo
        var profesornombre=request.payload.profesornombre;
        var profesorapellido=request.payload.profesorapellido;
        var materianombre=request.payload.materianombre;
        var codigoseccion=request.payload.codigoseccion;
        var j;
       Link.sequelize.sync();
       Link.sequelize.query('update link set utilizado=true where enlace="'+'https://epsilon-16172si-adriana2828.c9users.io/evaluacion_estudiante/'+profesornombre+'/'+profesorapellido+'/'+materianombre+'/'+codigoseccion+'/'+evaluacionid+'/'+materiaid+'/'+seccionid+'/'+estudianteid+'"'+';').spread(function(results, metadata) {
                             // Results will be an empty array and metadata will contain the number of affected rows.
                           })
           
        
        for(j=0;j<valor.length;j++)
        {
               Respuesta.sequelize.sync();// cada vez q se va a modificar la bd primero hay q llamar a sync();    
               Respuesta.create(
                   {
                     evaluacionid:evaluacionid,
                     preguntaid:preguntaid[j],
                     valor:valor[j]
                    });
            
        } 
         
            
            return reply('Evaluacion realizada exitosamente!');   
            
    }
},
//__________________ACTIVAR EVALUACION DEL ESTUDIANTE___________________________
//__________________ACTIVAR EVALUACION DEL JEFE DE DPTO_________________________
//1--Mostrar docentes

{
    method: 'GET',
    path:'/docentes_j/{departamentoid}', 
    handler:function (request,reply)
    { 
      var departamentoid=request.params.departamentoid;
      Docente.sequelize.sync();    
      Docente.sequelize.query('SELECT docente.id,docente.nombre,docente.apellido,docente.cedula,docente.carnet,docente.correo from docente inner join docdpto on docente.id=docdpto.docenteid where docdpto.departamentoid='+departamentoid+';' ,{ type: sequelize.QueryTypes.SELECT}).then(function(e) 
    {
      //
      // En este caso ejemplo es un arreglo.
      // objeto1 es un json que tiene un arreglo que se llama personas.
      // a cada elemento i de personas le agregamos un elemento i de ejemplo.
      //  
      var i;   
      console.log(e);
      var objeto1={
                   profesores:[]
                  };

      for(i=0;i<e.length;i++)
      {
        
        objeto1.profesores[i]={   
                              nombre:e[i].nombre,
                              apellido:e[i].apellido,
                              carnet:e[i].carnet,
                              cedula:e[i].cedula,
                              docenteid:e[i].id,
                              correo:e[i].correo,
                              correo2:e[i].correo
                            };
 
      }

       console.log(e);
       return reply.view('enviar_evaluacion_jefe',objeto1);
  });
}      
},
//2--Evaluar al docente
{
    method: ['GET','POST'],
    path:'/preparar_evaluacion_jefe', 
    handler:function (request,reply)
   {
        var docenteid=request.payload.docenteid;
        var objeto1={
                 preguntas:[]
        }
        //console.log("docenteid "+docenteid);
        Evaluacion.sequelize.sync();
        Evaluacion.create({
             docenteid:docenteid
        }).then(function(e){
            
            Pregunta.findAll({
                where:{
                    modelo:"b"
                }
            }).then(function(p){
                
                var i;
                for(i=0;i<p.length;i++){
                    
                    objeto1.preguntas[i]={
                        enunciado:p[i].enunciado,
                        preguntaid:p[i].id,
                        evaluacionid:e.id
                    }
                    
                }
                
                
            })
            
         reply.view("evaluacion_jefe_dpto",objeto1);   
        })
         
         
         
         
   }
},
{
    method:['GET','POST'],
    path:'/email_jefe',
    handler:function(request,reply){
        
    var valor=request.payload.valor;
    var evaluacionid=request.payload.evaluacionid[0];
    var preguntaid=request.payload.preguntaid;
    console.log("evaluacion id "+ evaluacionid);
    console.log("preguntaid "+preguntaid);
    console.log("valor "+valor);
        
    var j;
      for(j=0;j<valor.length;j++)
        {
               Respuesta.sequelize.sync();   
               Respuesta.create(
                   {
                     evaluacionid:evaluacionid,
                     preguntaid:preguntaid[j],
                     valor:valor[j]
                    });
            
        }
         
            
            return reply('Evaluacion realizada exitosamente!');   
        
        
        
        
        
    }
},
//__________________ACTIVAR EVALUACION DEL JEFE DE DPTO_________________________
//__________________ACTIVAR EVALUACION DEL DOCENTE______________________________
//1--docentes
{
    method: 'GET',
    path:'/docentes/{departamentoid}/{departamentonombre2}', 
    handler:function (request,reply)
    { 
      var departamentoid=request.params.departamentoid;
      var departamentonombre=request.params.departamentonombre2;
      Docente.sequelize.sync();    
      Docente.sequelize.query('SELECT docente.id,docente.nombre,docente.apellido,docente.cedula,docente.carnet,docente.correo from docente inner join docdpto on docente.id=docdpto.docenteid where docdpto.departamentoid='+departamentoid+' ;' ,{ type: sequelize.QueryTypes.SELECT}).then(function(e) 
    {
      //
      // En este caso ejemplo es un arreglo.
      // objeto1 es un json que tiene un arreglo que se llama personas.
      // a cada elemento i de personas le agregamos un elemento i de ejemplo.
      //  
      var i;   
      console.log(e);
      var objeto1={
                   profesores:[],
                   nombres:[{
                       nombredpto:departamentonombre
                   }]
                  };

      for(i=0;i<e.length;i++)
      {
         Evaluacion.create({
               docenteid:e[i].id,
               
           })
            objeto1.profesores[i]={   
                              nombre:e[i].nombre,
                              apellido:e[i].apellido,
                              carnet:e[i].carnet,
                              cedula:e[i].cedula,
                              id:e[i].id,
                              correo:e[i].correo,
                              correo2:e[i].correo,
                              
                            };
           
           
        
      }

       console.log(e);
       return reply.view('enviar_evaluacion_docente',objeto1);
  });
}      
},
//--Evaluacion_docentes
{
    method: 'POST',
    path:'/preparar_evaluacion_docente', 
    handler:function (request,reply)
     { 
        
       var docenteid=request.payload.id;
       var correo=request.payload.correo2;
       var info={evaluaciones:[]
                };
       var i;
       /*
       for(i=0;i<docenteid.length;i++){
           Evaluacion.create({
               docenteid:docenteid[i],
               
           })
       }
         */ 
       Docente.sequelize.query('SELECT docente.id as docenteid,docente.nombre as nombre,docente.apellido as apellido,departamento.nombre as nombredpto,docente.correo,evaluacion.id as evaluacionid from docente inner join evaluacion on docente.id=evaluacion.docenteid inner join docdpto on docente.id=docdpto.docenteid inner join departamento on docdpto.departamentoid=departamento.id;' ,{ type: sequelize.QueryTypes.SELECT})
      .then(function(d) {
          
         var j;
         for(j=0;j<d.length;j++){
        
          Link.sequelize.sync();
          Link.create({
              enlace:'https://epsilon-16172si-adriana2828.c9users.io/evaluacion_docente/'+d[j].evaluacionid+'/'+d[j].docenteid+'/'+d[j].nombre+'/'+d[j].apellido+'/'+d[j].nombredpto+'',
              utilizado:false
          });
       
            sendgrid.send(
          {
            to: d[j].correo,
            from: 'metroevalua@unimet.edu.ve',
            subject: 'Autoevaluación Docente',
            html:'<h1 style="color:blue;">Autoevaluación Docente</h1>'+'<p style="font-size:20px;" align="justify"> Estimado docente, el vicerrectorado de la Universidad Metropolitana requiere su colaboración, por favor, ingrese al siguiente link y realice la autoevaluación docente.<br><br>'+'<a href=https://epsilon-16172si-adriana2828.c9users.io/evaluacion_docente/'+d[j].evaluacionid+'/'+d[j].docenteid+'/'+d[j].nombre+'/'+d[j].apellido+'/'+d[j].nombredpto+'>Autoevaluación Docente: '+d[j].nombre+' '+d[j].apellido+'</a>'+'<br><br>Saludos Cordiales.'+'</p>'+''
            //text: 'https://epsilon-16172si-adriana2828.c9users.io/evaluacion_docente/'+d[j].evaluacionid+'/'+d[j].docenteid+'/'+d[j].nombre+'/'+d[j].apellido+'/'+d[j].nombredpto+''
          }
                   );
          
         }
      })
      
   
        reply("Envio realizado exitosamente!"); 
         
         
         
     }
},
//--3
{
    method: ['GET','POST'],
    path:'/evaluacion_docente/{evaluacionid}/{docenteid}/{nombre}/{apellido}/{nombredpto}', 
    handler:function (request,reply)
     {
       var evaluacionid=request.params.evaluacionid;
       var docenteid=request.params.docenteid;
       var nombre=request.params.nombre;
       var apellido=request.params.apellido;
       var nombredpto=request.params.nombredpto;
       var objeto1={
           preguntas:[]
       };
        Link.sequelize.sync();
      Link.findAll({
          
          where:{
              enlace:'https://epsilon-16172si-adriana2828.c9users.io/evaluacion_docente/'+evaluacionid+'/'+docenteid+'/'+nombre+'/'+apellido+'/'+nombredpto+''
              
          }
      }).then(function(l){
          
          if(l[0].dataValues.utilizado==true){
              reply("usted ya realizo esta evaluacion");}
              
          else{
              
      Pregunta.sequelize.sync();    
      Pregunta.findAll(
          {
           where: {
                   modelo: 'b'
                  }
           }).then(function(e) 
          {
           //
           // En este caso ejemplo es un arreglo.
           // objeto1 es un json que tiene un arreglo que se llama personas.
           // a cada elemento i de personas le agregamos un elemento i de ejemplo.
           //  
             var i;   
             
             

             for(i=0;i<e.length;i++){
             
             if(e[i].eliminado==false){
             
             {
               objeto1.preguntas[i]={  enunciado:e[i].dataValues.enunciado, 
                                       preguntaid:e[i].dataValues.id,
                                       evaluacionid:evaluacionid,
                                       nombre:nombre,
                                       apellido:apellido,
                                       nombredpto:nombredpto,
                                       docenteid:docenteid
                                    };
               objeto1.nombres={
                    nombre:nombre,
                                       apellido:apellido,
                                       nombredpto:nombredpto,
                   
               }
             }
             }
             }
       
              return reply.view('evaluacion_docente',objeto1);
        });
      
              
              
          }      
              
          });
     
   
 
   }    
},
//--4
{
    method: ['GET','POST','PUT'],
    path:'/email_docente', 
    handler:function (request,reply)
     { var preguntaid=request.payload.preguntaid;
       var docenteid=request.payload.docenteid;
       var valor=request.payload.valor;
       var evaluacionid=request.payload.evaluacionid;
       var nombredpto=request.payload.nombredpto;
       var nombre=request.payload.nombre;
       var apellido=request.payload.apellido;
       console.log("evaluacionid "+evaluacionid);
       console.log("preguntaid "+preguntaid);
       console.log("valor "+valor);
       //aqui es donde se registran las respuestas
       Link.sequelize.sync();
       Link.sequelize.query('update link set utilizado=true where enlace="'+'https://epsilon-16172si-adriana2828.c9users.io/evaluacion_docente/'+evaluacionid[0]+'/'+docenteid[0]+'/'+nombre[0]+'/'+apellido[0]+'/'+nombredpto[0]+'"'+';').spread(function(results, metadata) {
                             // Results will be an empty array and metadata will contain the number of affected rows.
                           })
      var j;
      for(j=0;j<valor.length;j++)
        {
               Respuesta.sequelize.sync();// cada vez q se va a modificar la bd primero hay q llamar a sync();    
               Respuesta.create(
                   {
                     evaluacionid:evaluacionid[j],
                     preguntaid:preguntaid[j],
                     valor:valor[j]
                    });
            
        }
         
            
            return reply('Evaluacion realizada exitosamente!');   
    
     }
 
      
},





//__________________ACTIVAR EVALUACION DEL DOCENTE______________________________

//__________________MOSTRAR RESULTADOS DE EVALUACION POR SECCION________________
 {
    method: ['GET'],
    path:'/secciones2/{departamentoid}/{departamentonombre2}', 
    handler:function (request,reply)
    { var departamentoid=request.params.departamentoid;
      var departamentonombre=request.params.departamentonombre2;
      
      
      Seccion.sequelize.sync();    
      Seccion.sequelize.query('select evaluacion.id as evaluacionid,seccion.id,seccion.codigo_tri,seccion.capacidad,seccion.disponible,seccion.materiaid,seccion.docenteid,materia.nombre as materianombre from evaluacion inner join seccion on seccion.id=evaluacion.seccionid inner join materia on seccion.materiaid=materia.id inner join departamento on materia.departamentoid=departamento.id where materia.departamentoid='+departamentoid+';' ,{ type: sequelize.QueryTypes.SELECT}).then(function(e) 
    {
      //
      // En este caso ejemplo es un arreglo.
      // objeto1 es un json que tiene un arreglo que se llama personas.
      // a cada elemento i de personas le agregamos un elemento i de ejemplo.
      //  
         var i;   
         var objeto1={
                      secciones:[],
                      
                     };
     console.log(e);
     for(i=0;i<e.length;i++)
     {
       objeto1.secciones[i]={   
                              codigo_tri:e[i].codigo_tri, 
                              capacidad:e[i].capacidad,
                              disponible:e[i].disponible,
                              materiaid:e[i].materiaid,
                              docenteid:e[i].docenteid,
                              id:e[i].id,
                              materianombre:e[i].materianombre,
                              evaluacionid:e[i].evaluacionid,
                            };    
 
     }

    //console.log(e);
    //console.log("el id es:_"+id);   
    
    return reply.view('secciones_resultados',objeto1);
  });
  }      
},
 {
    method: ['GET','POST','PUT'],
    path:'/mostrar_resultados', 
    handler:function (request,reply)
    { 
      var seccionid=request.payload.id;
      var codigo_tri=request.payload.codigo_tri;
      var evaluacionid=request.payload.evaluacionid;
      var info={resultados:[],
                nombres:[],
                total:[]
      }
      console.log("seccionid "+seccionid);
      console.log("evaluacionid"+evaluacionid);
      console.log("codigo_tri"+codigo_tri);
      Respuesta.sequelize.sync();
      Respuesta.sequelize.query('Select AVG(respuesta.valor) as respuesta, pregunta.enunciado as enunciado,concat(docente.nombre," ",docente.apellido) as docente from respuesta INNER JOIN pregunta ON respuesta.preguntaid=pregunta.id inner join evaluacion on respuesta.evaluacionid=evaluacion.id inner join seccion on evaluacion.seccionid=seccion.id inner join docente on seccion.docenteid=docente.id where respuesta.evaluacionid='+evaluacionid+' GROUP BY respuesta.preguntaid;' ,{ type: sequelize.QueryTypes.SELECT}).then(function(r){
      Respuesta.sequelize.query('select round(sum(promedios)/count(promedios)) as total from (select avg(respuesta.valor) as promedios from respuesta where respuesta.evaluacionid='+evaluacionid+' group by preguntaid) as a;',{ type: sequelize.QueryTypes.SELECT}).then(function(s){
         info.total={puntajetotal:s[0].total}
          var i;
          for(i=0;i<r.length;i++){
              
             info.resultados[i]={
                                 enunciado:r[i].enunciado,
                                 respuesta:r[i].respuesta,
                                 docente:r[i].docente
             } 
             info.nombres={
                 docente:r[i].docente,
                 seccion:codigo_tri
             }

          }
          console.log("s total"+s.total);
          
        })      
    
        reply.view("resultados",info);              
          });
        
          
        
      
       
    
  }      
},


//------------------MOSTRAR RESULTADOS DE EVALUACION POR SECCION----------------
//------------------MOSTRAR RESULTADOS DE LA AUTOEVALUACION DE CADA DOCENTE-----
//1--Buscar docentes que hayan hecho su autoevaluacion
{
    method: ['GET'],
    path:'/docentes_2/{departamentoid}/{departamentonombre2}', 
    handler:function (request,reply)
    { 
      var departamentoid=request.params.departamentoid;
      var departamentonombre=request.params.departamentonombre2;
      
      Docente.sequelize.sync();    
      Docente.sequelize.query('select evaluacion.id as evaluacionid,docente.id as docenteid,docente.nombre as nombre, docente.apellido as apellido from evaluacion inner join docente on docente.id=evaluacion.docenteid inner join docdpto on docente.id=docdpto.docenteid where docdpto.departamentoid='+departamentoid+';' ,{ type: sequelize.QueryTypes.SELECT}).then(function(e) 
    {
      //
      // En este caso ejemplo es un arreglo.
      // objeto1 es un json que tiene un arreglo que se llama personas.
      // a cada elemento i de personas le agregamos un elemento i de ejemplo.
      //  
         var i;   
         var objeto1={
                      docentes:[],
                      
                     };
     console.log(e);
     for(i=0;i<e.length;i++)
     {
       objeto1.docentes[i]={   
                              nombre:e[i].nombre,
                              apellido:e[i].apellido,
                              docenteid:e[i].docenteid,
                              evaluacionid:e[i].evaluacionid,
                              nombre2:e[i].nombre,
                              apellido2:e[i].apellido,
                            };    
 
     }

    //console.log(e);
    //console.log("el id es:_"+id); 
    return reply.view('docentes_resultados',objeto1);
  });
  }      
},
//2--Mostrar Resultados

 {
    method: ['GET','POST','PUT'],
    path:'/mostrar_resultados_2', 
    handler:function (request,reply)
    { 
      var docenteid=request.payload.docenteid;
      var nombre=request.payload.nombre2;
      var apellido=request.payload.apellido2;
      var evaluacionid=request.payload.evaluacionid;
      var info={resultados:[],
                nombres:[],
                total:[]
      }
      console.log("docenteid "+docenteid);
      console.log("evaluacionid "+evaluacionid);
      console.log("nombre "+nombre);
      Respuesta.sequelize.query(' select respuesta.valor as respuesta, pregunta.enunciado as enunciado from respuesta inner join evaluacion on respuesta.evaluacionid=evaluacion.id inner join pregunta on respuesta.preguntaid=pregunta.id where respuesta.evaluacionid='+evaluacionid+';',{ type: sequelize.QueryTypes.SELECT}).then(function(r){
      Respuesta.sequelize.query('select round(avg(respuesta.valor)) as total from respuesta inner join evaluacion on respuesta.evaluacionid=evaluacion.id inner join pregunta on respuesta.preguntaid=pregunta.id where respuesta.evaluacionid='+evaluacionid+';',{ type: sequelize.QueryTypes.SELECT}).then(function(x){
          
          info.total={puntajetotal:x[0].total}
          var i;
          for(i=0;i<r.length;i++){
              
             info.resultados[i]={
                                 enunciado:r[i].enunciado,
                                 respuesta:r[i].respuesta,
                                 docente:r[i].docente
             } 
             info.nombres={
                 docente:nombre,
                 lastname:apellido
             }

          }
          
      })
      reply.view("resultados_2",info); 
      })
              
        
      
       
    
  }      
},
//-------AUTORIZAR ACCESO A RESULTADOS DE LA AUTOEVALUACION DOCENTE-----
//1--docentes
{
    method: 'GET',
    path:'/docentes2/{departamentoid}/{departamentonombre2}', 
    handler:function (request,reply)
    { 
      var departamentoid=request.params.departamentoid;
      var departamentonombre=request.params.departamentonombre2;
      Docente.sequelize.sync();    
      Docente.sequelize.query('SELECT docente.id,docente.nombre,docente.apellido,docente.cedula,docente.carnet,docente.correo from docente inner join docdpto on docente.id=docdpto.docenteid where docdpto.departamentoid='+departamentoid+' ;' ,{ type: sequelize.QueryTypes.SELECT}).then(function(e) 
    {
      //
      // En este caso ejemplo es un arreglo.
      // objeto1 es un json que tiene un arreglo que se llama personas.
      // a cada elemento i de personas le agregamos un elemento i de ejemplo.
      //  
      var i;   
      console.log(e);
      var objeto1={
                   profesores:[],
                   nombres:[{
                       nombredpto:departamentonombre
                   }]
                  };

      for(i=0;i<e.length;i++)
      {
        
            objeto1.profesores[i]={   
                              nombre:e[i].nombre,
                              apellido:e[i].apellido,
                              carnet:e[i].carnet,
                              cedula:e[i].cedula,
                              id:e[i].id,
                              correo:e[i].correo,
                              correo2:e[i].correo,
                              
                            };
           
           
        
      }

       console.log(e);
       return reply.view('autorizar_evaluacion_docente',objeto1);
  });
}      
},
//2--Preparar link de acceso a resultados
{
    method: ['GET','POST'],
    path:'/preparar_autorizacion_docente', 
    handler:function (request,reply)
    { 
      var docenteid=request.payload.id;
      var correo=request.payload.correo2;
     
 
       Docente.sequelize.query('select evaluacion.seccionid as seccionid,seccion.codigo_tri as codigo_tri,evaluacion.id as evaluacionid from evaluacion inner join seccion on evaluacion.seccionid=seccion.id where seccion.docenteid='+docenteid+';' ,{ type: sequelize.QueryTypes.SELECT})
      .then(function(d) {
         var i;
         for(i=0;i<d.length;i++){
            sendgrid.send(
          {
            to: correo,
            from: 'metroevalua@unimet.edu.ve',
            subject: 'Resultados Evaluacion Docente',
            html:'<h1 style="color:blue;">Resultado de La Evaluacion Docente</h1>'+'<p style="font-size:20px;" align="justify"> Estimado docente, el vicerrectorado de la Universidad Metropolitana,se complace en notificarle que los resultados de la evaluacion realizada por sus alumnos esta disponible,puede ingresar al siguiente link para consultarlos.<br><br>'+'<a href=https://epsilon-16172si-adriana2828.c9users.io/mostrar_resultados2/'+d[i].seccionid+'/'+d[i].codigo_tri+'/'+d[i].evaluacionid+'>Resultados de la seccion '+d[i].codigo_tri+'</a>'+'<br><br>Saludos Cordiales.'+'</p>'+''
            
          }
                   );
          
         }
      })
      
   
        reply("Resultados enviados exitosamente!"); 
         
         
         
     }
},
{
    method: 'GET',
    path:'/mostrar_resultados2/{seccionid}/{codigo_tri}/{evaluacionid}', 
    handler:function (request,reply)
    { 
      var seccionid=request.params.seccionid;
      var codigo_tri=request.params.codigo_tri;
      var evaluacionid=request.params.evaluacionid;
      
      var info={resultados:[],
                nombres:[],
                nombre:[{seccion:codigo_tri}],
                total:[]
      }
      console.log("seccionid "+seccionid);
      console.log("evaluacionid"+evaluacionid);
      console.log("codigo_tri"+codigo_tri);
      Respuesta.sequelize.sync();
      Respuesta.sequelize.query('Select AVG(respuesta.valor) as respuesta, pregunta.enunciado as enunciado,concat(docente.nombre," ",docente.apellido) as docente from respuesta INNER JOIN pregunta ON respuesta.preguntaid=pregunta.id inner join evaluacion on respuesta.evaluacionid=evaluacion.id inner join seccion on evaluacion.seccionid=seccion.id inner join docente on seccion.docenteid=docente.id where respuesta.evaluacionid='+evaluacionid+' GROUP BY respuesta.preguntaid;' ,{ type: sequelize.QueryTypes.SELECT}).then(function(r){
      Respuesta.sequelize.query('select round(sum(promedios)/count(promedios)) as total from (select avg(respuesta.valor) as promedios from respuesta where respuesta.evaluacionid='+evaluacionid+' group by preguntaid) as a;',{ type: sequelize.QueryTypes.SELECT}).then(function(s){
         info.total={puntajetotal:s[0].total}
          var i;
          for(i=0;i<r.length;i++){
              
             info.resultados[i]={
                                 enunciado:r[i].enunciado,
                                 respuesta:r[i].respuesta,
                                 docente:r[i].docente
             } 
             info.nombres={
                 docente:r[i].docente,
                 seccion:codigo_tri
             }

          }
          console.log("s total"+s.total);
          
        })      
    
        reply.view("resultados2",info);              
          });
        
          
        
 
 
     }
},
//_____AUTORIZAR ACCESO A RESULTADOS DE LA EVALUACION DOCENTE___________________
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
