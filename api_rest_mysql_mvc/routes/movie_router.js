'use strict'

var 
  	// conectamos al archivo de las rutas con el controlador
    MovieController = require('../controllers/movie_controller'),
    express = require('express'),
	// creamos un objeto router
	router = express.Router();

// las aplicaciones restful utlizan todos los verbos
// usaremos delete y put en lugar de post
router

	// le decimos que en la ruta home ejecute el middleware que está en el archivo controller
	.get('/', MovieController.getAll)

	.get('/agregar', MovieController.addForm)

	.post('/', MovieController.insert)

	.get('/editar/:movie_id', MovieController.getOne)

	// .post('/actualizar/:movie_id', MovieController.update)
	// el api-rest usa put para actualiar
	.put('/actualizar/:movie_id', MovieController.update)

	// .post('/eliminar/:movie_id',MovieController.delete)
	// el api-rest una delete para borrar
	.delete('/eliminar/:movie_id',MovieController.delete)

	.use(MovieController.error404)

module.exports = router