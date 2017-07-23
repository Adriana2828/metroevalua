# METROEVALUA
## Concepto

Aplicacion web cuyo objetivo es automatizar el sistema de evaluacion docente de la Universidad Metropolitana de Caracas. 
Cada jefe de departamento de la Universidad tiene una cuenta, con la cual podra administrar el proceso de evaluacion del profesorado de su departamento, esto es, activar el sistema de encuestas, consultar los resultados, y realizar la evaluacion de su personal docente.


###### Activacion del sistema de encuestas: El jefe del departamento selecciona una seccion, y envia a los estudiantes un email con la encuesta correspondiente al docente de dicha seccion.

###### Consulta de resultados: En la webapp el jefe de departamento puede ver los resultados de la encuesta de un profesor, el promedio de su puntaje, a medidad que los estudiantes van respondiendo la encuesta. Cada estudiante puede realizar la encuesta solo una vez.

###### Autoevaluacion: El jefe de dpto tiene acceso directo al instrumento de evaluacion correspondiente a cada docente, y puede realizar la evaluacion como superior, y puede realizar su autoevaluacion.

## Los estudiantes no tienen cuenta:
###### solo reciben un email para llenar la encuesta, y solo pueden realizarla una sola vez, ya que el link proporcionado a cada estudiante, esta registrado en la base de datos, y se sabra si ya contesto o no la evaluacion.

## Solo los jefes del dpto y los miembros pertenecientes al Vicerrectorado, tienen una cuenta activa.

## El vicerrectorado tiene todas las funciones del jefe de dpto, y ademas, puede modificar los instrumentos de evalucion.

## Hay dos tipos de instrumentos de evaluacion:

###### A (La encuesta que llenan los estudiantes) y B (La encuesta que llenan los profesores) 


## Arquitectura

## Framework
