'use strict'

// requerimos la conexión con el modelo
// con este objeto, tenemos acceso a cualquier método del mismo
var MovieModel = require('../models/movie_model'), 
  // uso de prototipo
  MovieController = () => {}

// todos los controladores son middlewares en express

// mostrar todas las películas
MovieController.getAll = (req, res, next) => {
	// dentro de getAll ejecutamos el callback que es pasado al getAll del modelo
	// si hay un error, enviamos el error
	// sino le pasamos la vista con las variables
	MovieModel.getAll((err,rows) =>{
		// sólo marcará los errores sintácticos sql
		if (err) {
			let locals = {
				title : 'Error al consultar en la base de datos',
				description : 'Error de Sintaxis SQL',
				error : err
			}
			// le pasamos a la vista error la variable que contiene el objeto literal js
			res.render('error',locals)
		
		// si no hay error
		}else{
			// ponemos los datos en una variable local
			let locals = {
				title : 'Lista de Películas',
				data : rows
			}
			// le pasamos datos a la vista en index.jade
	    	res.render('index2',locals);
		}
	})
}

// buscamos una película para editarla
MovieController.getOne = (req, res, next) => {
	// necesita un id y una callback
	// el botón editar internamente es un formulario, que trae los datos del id que queremos buscar
	// extraemos vía url mediante el objeto params a movie_id
	let movie_id = req.params.movie_id 
	console.log(movie_id)
	// la callback tendrá dos parámetros: devuelve un error o las filas de la búsqueda
	MovieModel.getOne(movie_id, (err, rows) => {
		console.log(err,'....',rows)
		if(err){
			let locals = {
				title : `Error al editar la película ${movie_id} en la base de datos`,
				description : 'Error de Sintaxis SQL',
				error : err
			}
			// le pasamos a la vista error.jada la variable que contiene el objeto literal js
			res.render('error',locals)
		}else{
			// almacenamos los datos de la película a editar
			let locals = {
				title : 'Editar Película',
				data : rows
			}

			// enviamos los datos a un formulario
			res.render('edit-movie',locals)
		}

	})
}

// reemplazamos insert y update por el método save
// MovieController.insert = (req, res, next) => {
// 	let movie = {
// 		// tomamos lo que viene del cuerpo del formulario
// 		movie_id : req.body.movie_id,
// 		title : req.body.title,
// 		release_year : req.body.release_year,
// 		rating : req.body.rating,
// 		image : req.body.image
// 	}

// 	// probamos los datos recibidos en la consola
//   	console.log(movie)

//   	// definimos la función del modelo, que la tomará
//   	// le pasamos los dos parámetros: los datos movies y la función anónima
//   	// la función recibe un parámetro error que significa un error de sintaxis sql
// 	MovieModel.insert(movie, (err) => {
// 		// si existe un error, generamos una vista de tipo error
// 		if (err) {
// 			let locals = {
// 				title : `Error al agregar la película ${movie.movie_id} en la base de datos`,
// 				description : 'Error de Sintaxis SQL',
// 				error : err
// 			}
// 			// le pasamos a la vista error la variable que contiene el objeto literal js
// 			res.render('error',locals)
// 		}
// 		// si no hay error nos redirigimos al home
// 		else{
// 			res.redirect('/')
// 		}
// 	})
// }

// // actualizamos una peli
// MovieController.update = (req, res, next) => {
// 	let movie = {
// 		// tomamos lo que viene del cuerpo del formulario de edición
// 		movie_id : req.body.movie_id,
// 		title : req.body.title,
// 		release_year : req.body.release_year,
// 		rating : req.body.rating,
// 		image : req.body.image
// 	}

// 	// probamos los datos recibidos en la consola
//   	console.log(movie)

//   	// definimos la función del modelo, que la tomará
//   	// le pasamos los dos parámetros: los datos movies y la función anónima
//   	// la función recibe un parámetro error que significa un error de sintaxis sql
// 	MovieModel.update(movie, (err) => {
// 		// si existe un error, generamos una vista de tipo error
// 		if (err) {
// 			let locals = {
// 				title : `Error al actualizar la película ${movie.movie_id} en la base de datos`,
// 				description : 'Error de Sintaxis SQL',
// 				error : err
// 			}
// 			// le pasamos a la vista error la variable que contiene el objeto literal js
// 			res.render('error',locals)
// 		}
// 		// si no hay error nos redirigimos al home para ver todas las películas con la editada
// 		else{
// 			res.redirect('/')
// 		}
// 	})
// }

MovieController.save = (req, res, next) => {
	let movie = {
		// tomamos lo que viene del cuerpo del formulario de edición
		movie_id : req.body.movie_id,
		title : req.body.title,
		release_year : req.body.release_year,
		rating : req.body.rating,
		image : req.body.image
	}

	// probamos los datos recibidos en la consola
  	console.log(movie)

  	// llamamos al método save
	MovieModel.save(movie, (err) => {
		// si existe un error, generamos una vista de tipo error
		if (err) {
			let locals = {
				title : `Error al salvar la película ${movie.movie_id} en la base de datos`,
				description : 'Error de Sintaxis SQL',
				error : err
			}
			// le pasamos a la vista error la variable que contiene el objeto literal js
			res.render('error',locals)
		}
		// si no hay error nos redirigimos al home para ver todas las películas con la editada
		else{
			res.redirect('/')
		}
	})
}



// // borramos una peli
MovieController.delete = (req, res, next) => {
	let movie_id = req.params.movie_id 
	console.log(movie_id)
	// la callback tendrá dos parámetros: devuelve un error o las filas de la búsqueda
	MovieModel.delete(movie_id, (err, rows) => {
		console.log(err,'....',rows)
		if(err){
			let locals = {
				title : `Error al eliminar la película ${movie_id} en la base de datos`,
				description : 'Error de Sintaxis SQL',
				error : err
			}
			// le pasamos a la vista error.jada la variable que contiene el objeto literal js
			res.render('error',locals)
		
		}else{
			// no tenemos que generar ninguna vista, sólo seguimos el flujo de la info
			res.redirect('/')
		}

	})
}

// solicita la vista del formulario agregar
// no hace nada en el modelo
MovieController.addForm = (req, res, next) => res.render('add-movie',{title: 'Agregar Película'})


// se comunica con la vista de error
// no hace nada e el modelo
MovieController.error404 = (req, res, next) => {
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

// exportamos como módulo al prototipo Movie
module.exports = MovieController
