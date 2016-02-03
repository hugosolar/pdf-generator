# PiX PDF Generator

Este escript genera un pdf a partir de una url print enviada por ajax desde pix
Retorna un código 1 si se crea el pdf, adjuntando el nombre del mismo y un codigo 0 si ocurrió un error, adjuntando el mensaje correspondiente.

Se utiliza PhantomJS mediante child process de Node para hacerlo compatible con la nueva versión de phantom la cual soporta Webfonts

_Para instalar clonar el repositorio y ejecutar la instalación de npm_

	npm install

	node app.js

_Utiliza por defecto el puerto 4730 (http://localhost:4730)_

Dependencias
----

* [PhantomJS 2](https://www.npmjs.com/package/phantomjs)

* [Body Parser](https://www.npmjs.com/package/body-parser/)
* [Express](https://www.npmjs.com/package/express)

PiX
---

Esto pertenece al proyecto [PiX](http://eadpucv.github.io/pix/)

_"PiX is a visual language specially crafted to define and model user experience within digital services."_
