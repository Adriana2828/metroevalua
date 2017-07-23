# METROEVALUA

## Framework
![hapijs](https://camo.githubusercontent.com/16f4a37b7e2086b6e44dcb0cdfaf9e41f5738278/68747470733a2f2f7261772e6769746875622e636f6d2f686170696a732f686170692f6d61737465722f696d616765732f686170692e706e67)

## Manejador de Base de Datos

![mysql](https://upload.wikimedia.org/wikipedia/en/thumb/6/62/MySQL.svg/1200px-MySQL.svg.png)


## ORM

![sequelize](https://i.blogs.es/91493f/sequelize/650_1200.png)

## Arquitectura

Se intento implementar la arquitectura MVC (MODEL VIEW CONTROLLER), sin embargo, por cuestiones de tiempo, y falta de familiaridad con hapi js, solo se implementaron los modelos y las vistas, y el aspecto correspondiente a los controladores, esta represtado en la funcion handler de cada ruta del archivo de rutas. En hapi js, una ruta puede devolver una vista, y a esa vista se le puede asignar una funcion handler que hace las veces de controlador. 

Hay un archivo llamado Controller.js, en la carpeta de rutas, el cual solo controla el inicio de sesion.

## Concepto

Aplicacion web cuyo objetivo es automatizar el sistema de evaluacion docente de la Universidad Metropolitana de Caracas. 
Cada jefe de departamento de la Universidad tiene una cuenta, con la cual podra administrar el proceso de evaluacion del profesorado de su departamento, esto es, activar el sistema de encuestas, consultar los resultados, y realizar la evaluacion de su personal docente.

## Los estudiantes no tienen cuenta:
###### Solo reciben un email para llenar la encuesta, y solo pueden realizarla una sola vez, ya que el link proporcionado a cada estudiante, esta registrado en la base de datos, y se sabra si ya contesto o no la evaluacion.
![sequelize](https://loveforwriting674.files.wordpress.com/2017/07/metroevalua-autoevaluaciones.png)
## Solo los jefes del dpto y los miembros pertenecientes al Vicerrectorado, tienen una cuenta activa.

![sequelize](https://loveforwriting674.files.wordpress.com/2017/07/metroevalua-sesion-jefe-dpto.png)
![sequelize](https://loveforwriting674.files.wordpress.com/2017/07/metroevalua-materias.png)
![sequelize](https://loveforwriting674.files.wordpress.com/2017/07/metroevalua-secciones.png)
![sequelize](https://loveforwriting674.files.wordpress.com/2017/07/metroevalua-profesores.png)
![sequelize](https://loveforwriting674.files.wordpress.com/2017/07/metro-evalua-estudiantes.png)

## El vicerrectorado tiene todas las funciones del jefe de dpto, y ademas, puede modificar los instrumentos de evalucion.

![sequelize](https://loveforwriting674.files.wordpress.com/2017/07/metroevalua-vicerrectorado.png)

###### Activacion del sistema de encuestas: El jefe del departamento selecciona una seccion, y envia a los estudiantes un email con la encuesta correspondiente al docente de dicha seccion.

###### Consulta de resultados: En la webapp el jefe de departamento puede ver los resultados de la encuesta de un profesor, el promedio de su puntaje, a medidad que los estudiantes van respondiendo la encuesta. Cada estudiante puede realizar la encuesta solo una vez.

![sequelize](https://loveforwriting674.files.wordpress.com/2017/07/metroevalua-resultados.png)

###### Autoevaluacion: El jefe de dpto tiene acceso directo al instrumento de evaluacion correspondiente a cada docente,
y puede realizar la evaluacion como superior, y puede realizar su autoevaluacion.



## Hay dos tipos de instrumentos de evaluacion:

###### A (La encuesta que llenan los estudiantes) y B (La encuesta que llenan los profesores) 
![login](https://loveforwriting674.files.wordpress.com/2017/07/metroevalua-encuesta-completa.png)
![login](https://loveforwriting674.files.wordpress.com/2017/07/metro-evalua-encuesta.png)
![login](https://loveforwriting674.files.wordpress.com/2017/07/metroevalua-encuesta2.png)

![login](https://loveforwriting674.files.wordpress.com/2017/07/metroevalua-login.png)
