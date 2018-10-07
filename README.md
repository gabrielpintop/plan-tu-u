# Plan Tú U

Esta aplicación busca fidelizar a los egresados uniandinos mediante un sistema de puntos a partir de los cuales ellos obtienen beneficios. La aplicación permite que puedan ver los beneficios que pueden obtener y que administren sus puntos, entre otras funcionalidades.

## Integrantes del equipo
- Gabriel Pinto

  **Página personal:** https://glpinto10.github.io/gabriel-pinto-pineda/

- Vivian Gómez

  **Página personal:** https://viviangomez.github.io/proyect1_mypersonalpage/

## Links de importancia

**Desplegada en:** https://plan-tu-u.herokuapp.com/

## Descripción
En Plan Tú U, los egresados uniandinos pueden registrarse, acumular y redimir puntos por su participasón activa en la universidad.
Para ello, estos usuarios cuentan con 3 módulos iniciales: "Beneficios", "Puntos" y "Obtención de puntos".
- En "Beneficios", pueden encontrar el catálogo de posibles beneficios a redimir, con su respectiva descripción, categoría y
cantidad de puntos. Basta con dar click en "redimir puntos" y el beneficio quedará registrado en el usuario.
- En "Puntos", pueden encontrar toda la información relacionada con sus puntos, cuántos le quedan, los beneficios en los que los ha
redimido, las actividades a partir de las cuales los ha obtenido y una breve información sobre cómo conseguir más.
- En "Obtención de puntos" puede encontrar las actividades para ganar más puntos.

Dichos puntos son asignados por los administradores del sistema, que son personas pertenecientes a la Vicerrectoría de la misma.
La cantidad de puntos que se asigna depende la actividad realizada por el uniandino.

Este otro tipo de usuario, administrador, tiene acceso a 3 módulos: "Beneficios", "Beneficios redimidos" y "Obtención de puntos".
- En "Beneficios", pueden ver el catálogo de posibles beneficios a redimir y administrarlo, es decir, pueden editar, crear y eliminar 
beneficios de la plataforma.
- En "Beneficios redimidos", pueden encontrar toda la actividad de los egresados,es decir, los beneficios que han sido redimidos 
con su descripción, fecha de redención, cantidad de puntos redimidos y el usuario que realizó la acción (código, correo y celular).
- En "Obtención de puntos" puede encontrar las actividades para asignar puntos, las cuales denominamos "asignaciones" y tienen una
descripción, una categoría y una cantidad de puntos a asignar. Por otro lado en esta sección pueden agregar nuevas de estas mismas y 
asignar puntos a un determinado usuario.

## Objetivo

Buscamos fidelizar a los egresados uniandinos mediante un sistema de puntos e incentivos por su participacón activa en la universidad.

## Screenshot
![Alt text](public/inicioPTU.PNG?raw=true "Screenshot de PTU")

## Tecnologías utilizadas

El proyecto fue desarrollado usando el stack MERN. 

- **Mongo DB**: Se utilizo una base de datos no relacional de MongoDB que está desplegada en https://mlab.com/
- **Meteor**: Una infraestructura web basada en JavaScript, que automatiza y simplifica el desarrollo de aplicaciones web que actúan en tiempo real. 
Maneja toda la lógica y despliegue tanto del cliente como del servidor. https://www.meteor.com
- **React JS**: Una librería que permite cosas increíbles y que fue utilizada para la creación del front de la aplicación de manera integrada con Meteor https://reactjs.org/

A su vez, se usaron varias dependencias instaladas por medio de NPM.

- JSON Web TokeN
- React-router-dom
- Bootstrap

Entre otras que pueden ser observadas en los package.json de la aplicación.

Finalmente, la aplicación se encuentra despleagada en https://heroku.com/ , para acceder a ella se puede ingrasar a https://plan-tu-u.herokuapp.com/

## Instructivo para ejecución

### Requisitos

- **Meteor** 

Verificar que este instalado ejecutando "meteor --version" en el CMD o descargarlo de https://www.meteor.com/install (versión LTS).
Nota: Para usar Meteor en tu cmd necesitarás installar Chocolately, puedes hacerlo desde https://chocolatey.org/install

- **Mongo DB**

Es necesario tenerlo para correr la aplicación localmente. Se puede descargar de https://www.mongodb.com/download-center?jmp=nav#community


### Pasos para ejecutar

1) Abrir la carpeta raíz en un CMD.
2) Ejecutar "npm install" para instalar todas las dependencias necesarias.
3) Ejecutar "meteor", que despliega el cliente y el servidor en los puertos 3000 y 3001, respectivamente
3.1) Tener en cuenta que la base de datos que corre Meteor es su propia base de datos de Mongo, la corre localmente y
no es la base de datos real.
5) La aplicación será abierta de forma automática en http://localhost:3000/

