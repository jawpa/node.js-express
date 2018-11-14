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
	// antes de ejecutar las rutas tenemos que ejecutar el middleware de la conexión a la base de datos
	// ejecuta el archivo models/movies.js
	// todas las rutas usan este modelo  
	.use(connection)

	// ruta al home
	// nos conectamos a mysql usando métodos del módulo express-myconnection
	.get('/',(req, res, next) => {
		req.getConnection((err, connection) => {
	    	if (err) return next(err);
	      
	      	// traemos a todas las películas
	    	connection.query('SELECT * from movie', (err, rows) => {
	    		if (err) return  next(new Error('No hay registros de películas'));
	    		// ponemos los datos en una variable local
	    		let locals = {
	    			title : 'Lista de Películas',
	    			data : rows
	    		}
	    		// le pasamos datos a la vista en index.jade
	        	res.render('index2',locals);
			});
      	});
      	// no podemos ejecutar el siguiente middleware en el stack porque sería el error
      	//next()
	})

	// ruta agregar (del home al formulario)
	.get('/agregar',(req, res, next) => {
		// llamamos a una vista
		// le pasamos un título
		res.render('add-movie',{title: 'Agregar Película'});
	})


	// ruta para crear, datos del formmulario de creación
	.post('/',(req, res, next) => {
		req.getConnection((err, connection) => {
	    	if (err) return next(err);
	      
	    	// traemos la info del formulario, mediante el atributo name
	    	let movie = {
	    		// tomamos lo que viene del cuerpo del formulario
	    		movie_id : req.body.movie_id,
	    		title : req.body.title,
	    		release_year : req.body.release_year,
	    		rating : req.body.rating,
	    		image : req.body.image
	    	}

	    	// probamos los datos recibidos en la consola
	      	console.log(movie)

	      	// reemplazamos al comodín ? por el contenido de la variable movie
	    	connection.query('INSERT INTO movie set ? ', movie, (err, rows) => {
	    		// si hay un error, que nos redirija al formulario
	    		return (err) ? res.redirect('/agregar') : res.redirect('/')

			});
      	});
      	
	})


	// ruta editar, con paso de parámetro (lo recibimos del form index)
	.get('/editar/:movie_id',(req, res, next) => {
		// obtengo el parámetro con el atributo params
		let movie_id = req.params.movie_id
		// lo imprimimos para que se vea en la consola
		console.log(movie_id)

		req.getConnection((err, connection) => {
	    	if (err) return next(err);
	      
	    	// reemplazamos al comodín ? por el contenido de la variable movie
	    	// y traemos a la película a editar
	    	connection.query('SELECT * FROM movie WHERE movie_id = ? ', movie_id, (err, rows) => {
	    		console.log(err,'....',rows)
	    		if(err){
	    			next(new Error('Error al editar la película'))
	    		}else{
	    			// almacenamos los datos de la película a editar
    				let locals = {
    					title : 'Editar Película',
    					data : rows
    				}

    				// enviamos los datos a un formulario
    				res.render('edit-movie',locals)
	    		}

			});
      	});
	})


	// ruta para actualizar la película (lo recibimos del form de editar)
	.post('/actualizar/:movie_id',(req, res, next) => {
		req.getConnection((err, connection) => {
	    	if (err) return  next(err);
	      
	    	// traemos la info del formulario, mediante el atributo name de cada input
	    	let movie = {
	    		// tomamos lo que viene del cuerpo del formulario
	    		movie_id : req.body.movie_id,
	    		title : req.body.title,
	    		release_year : req.body.release_year,
	    		rating : req.body.rating,
	    		image : req.body.image
	    	}

	    	// probamos los datos recibidos en la consola
	      	console.log(movie)

	      	// reemplazamos al primer comodín por el objeto movie
	      	// reemplazamos al segundo comodín por la propiedad movie_id
	      	// los parátros reemplazantes forman un arreglo
	    	connection.query('UPDATE movie SET ? WHERE movie_id = ? ', [movie, movie.movie_id], (err, rows) => {
	    		// si hay un error, que nos redirija al formulario editar
	    		return (err) ? res.redirect('/editar/:movie_id') : res.redirect('/')

			});
      	});
      	
	})


	// ruta para borrar película (desde el form del home)
	.post('/eliminar/:movie_id',(req, res, next) => {
		req.getConnection((err, connection) => {
	    	if (err) return next(err);

	    	let movie_id = req.params.movie_id
	      
	      	// borramos a la película indicada
	    	connection.query('DELETE FROM movie WHERE movie_id = ?',movie_id, (err, rows) => {
	    		console.log(err,'....',rows)
	    		// si hay error, ejecutamos el siguiente middleware que es el de error
	    		// definimos un nuevo error para que mostrar el mensaje
	    		// si no hay error que nos redirija a la raiz
	    		return (err) ? next(new Error('Registro no encontrado')) : res.redirect('/') 
	        	
		        
			});
      	});
	})

	// no puedo usar el método get porque necesito una ruta
	// le decimos que use el middleware
	// tiene que estar declarado al final para que no marque error
	.use(error404)
module.exports = router