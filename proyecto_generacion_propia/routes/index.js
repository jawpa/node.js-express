'use strict'

var express = require('express'),
	// creamos un objeto router
	router = express.Router();

// middleware de jade para comunicar con la vista index.jade
function jade(req,res,next) {
	let locals = {
		titulo : 'Probando Jade',
		enlace: 'http://google.com',
		descripcion: 'descripción de la página es muy buena'
	}
	// la respuesta del servidor, va a mandar la plantilla index
	// ya sabe que es index.jade por app.set('view engine','jade') definido en app.js
	res.render('index',locals);
}

// los middleware necesitan el request, el respond y el next
function ejs(req,res,next) {
	let locals = {
		titulo : 'Probando EJS',
		enlace: 'http://www.embeddedjs.com/',
		descripcion: `EJS is a client-side templating language that was originally part of 
		JavaScriptMVC, which has now been replaced by DoneJS.EJS combines data and a 
		template to produce HTML.`,
		nombre: 'nombre definido en route/index.js',
		estaciones:[
			['Otoño',['Abril','Mayo','Junio']],
			['Invierno',['Julio','Agosto','Septiembre']],
			['Primavera',['Octubre','Noviembre','Diciembre']],
			['Verano',['Enero','Febrero','Marzo']]
		]
	}
	// la respuesta del servidor, va a mandar la plantilla index
	// ya sabe que es index.jade por app.set('view engine','jade') definido en app.js
	res.render('index',locals);
}

// middleware para el error
// sirve para visualizar ambas plantillas
function error404(req, res, next) {
	// ojeto tipo error de node.js
	let error = new Error(),
		locals = {
			titulo : 'Error 404',
			descripcion : 'Recurso no encontrado',
			// ponemos el error como tal con la propiedad error
			error : error
		}

	error.status = 404
	// cuando se ejecuta el middleware
	// activa la plantilla de error y le pasamos las variables	
	res.render('error',locals)	

	next()
}

router
	// ruta al home
	// cuando cargue el home, mandamos un mensaje
	.get('/',(req, res) => {
		res.end('<h1>Hola mundos</h1>');
	})
	// ruta a jade
	.get('/jade',jade)
	// método get que define la ruta ejs
	.get('/ejs',ejs)
	// no puedo usar el método get porque necesito una ruta
	// le decimos que use el middleware
	// tiene que estar declarado al final para que no marque error
	.use(error404)
module.exports = router