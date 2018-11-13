'use strict'

var 
  	// requerimos el objeto Movies que tiene la configuración de la conexión
  	// está en el archivo movies.js
    connection = require('../models/movies'),
    express = require('express'),
	// creamos un objeto router
	router = express.Router();



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
	// antes de ejecutar las rutas tenemos que ejecutar el middleware
	// que ejecuta el archivo movies, la conexión a mysql
	// todas las rutas usan ese modelo  
	.use(connection)

	// ruta al home
	// nos conectamos a mysql usando métodos del módulo express-myconnection
	.get('/',(req, res, next) => {
		req.getConnection((err, connection) => {
	    	if (err) return next(err);
	      
	      	// traemos a todas las películas
	    	connection.query('SELECT * from movie', (err, rows) => {
	    		if (err) return next(err);
	    		// ponemos los datos en una variable local
	    		let locals = {
	    			title : 'Lista de Películas',
	    			data : rows
	    		}
	    		// le pasamos datos a la vista en index.jade
	        	res.render('index',locals);
			});
      	});
      	// no podemos ejecutar el siguiente middleware en el stack porque sería el error
      	//next()
	})
	// no puedo usar el método get porque necesito una ruta
	// le decimos que use el middleware
	// tiene que estar declarado al final para que no marque error
	.use(error404)
module.exports = router