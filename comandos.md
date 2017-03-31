Aplicacion
nvm install 6   (para que actualice node a 6)

npm start       (iniciar la app)


Base de datos
mysql-ctl cli

use c9;


CREATE TABLE 'docente' (
	`docenteid` BIGINT(10) NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(100) NULL DEFAULT NULL,
	
	
	PRIMARY KEY (`docenteid`)
);



CREATE TABLE `compradetalle` (
	`compradetalleid` BIGINT(10) NOT NULL AUTO_INCREMENT,
	`compraid` BIGINT(10) NOT NULL,
	`loteid` BIGINT(10) NOT NULL,
	`cantidad` BIGINT(10) NOT NULL,
	`precio` BIGINT(10) NOT NULL,
	`descuento` BIGINT(10) NOT NULL,
	PRIMARY KEY (`compradetalleid`),
	INDEX `compraid` (`compraid`),
	INDEX `loteid` (`loteid`),
	CONSTRAINT `compradetalle_ibfk_1` FOREIGN KEY (`compraid`) REFERENCES `compra` (`compraid`),
	CONSTRAINT `compradetalle_ibfk_2` FOREIGN KEY (`loteid`) REFERENCES `loteproducto` (`loteid`)
)


;







CREATE TABLE `marca2` (
	`marcai2d` BIGINT(10) NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(50) NULL DEFAULT NULL,
	PRIMARY KEY (`marcai2d`)
)

;




 
 
 insert into pregunta (modelo,enunciado,eliminado,limite) values ('a','Observaciones','0','5');
 
 
UPDATE pregunta
SET enunciado='Mantiene en esta asignatura un balance entre diferentes actividades'
WHERE id=13;




SELECT estudiante.carnet,estudiante.nombre,estudiante.apellido,estudiante.cedula,estudiante.correo 
FROM estudiante 
INNER JOIN estsec 
ON estudiante.id=estsec.estudianteid
where estsec.seccionid='1';



insert into pregunta (modelo, enunciado,eliminado,limite) values ('b','Conoce la materia a profundidad','false','5');


SELECT Distinct docente.id as docenteid,docente.nombre as nombre,docente.apellido as apellido,departamento.nombre as nombredpto,docente.correo,evaluacion.id as evaluacionid from docente inner join evaluacion on docente.id=evaluacion.docenteid inner join docdpto on docente.id=docdpto.docenteid inner join departamento on docdpto.departamentoid=departamento.id having count(docente.id)=1;

Select AVG(respuesta.valor) as respuesta,count(respuesta.valor) as nrorespuestas, pregunta.enunciado as enunciado,concat(docente.nombre," ",docente.apellido) as docente from respuesta INNER JOIN pregunta ON respuesta.preguntaid=pregunta.id inner join evaluacion on respuesta.evaluacionid=evaluacion.id inner join seccion on evaluacion.seccionid=seccion.id inner join docente on seccion.docenteid=docente.id where respuesta.evaluacionid=157 GROUP BY respuesta.preguntaid;

