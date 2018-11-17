'use strict'

var 
  	// conectamos al archivo de las rutas con el controlador
    MovieController = require('../controllers/movie_controller'),
    express = require('express'),
	// creamos un objeto router
	router = express.Router();

// lo único que pide el router son las rutas y los métodos del controlador
router

	// le decimos que en la ruta home ejecute el middleware que está en el archivo controller
	.get('/', MovieController.getAll)

	// ruta agregar (del home al formulario alta película)
	.get('/agregar', MovieController.addForm)


	// ruta para insertar los datos del formmulario de creación
	.post('/', MovieController.insert)


	// ruta editar, con paso de parámetro (lo recibimos del form index)
	// muestra el formulario para cambiar los valores
	.get('/editar/:movie_id', MovieController.getOne)


	// ruta para actualizar la película (lo recibimos del form de editar)
	.post('/actualizar/:movie_id', MovieController.update)


	// ruta para borrar película (desde el form del home)
	.post('/eliminar/:movie_id',MovieController.delete)

	// no puedo usar el método get porque necesito una ruta
	// le decimos que use el middleware
	// tiene que estar declarado al final para que no marque error
	.use(MovieController.error404)

module.exports = router