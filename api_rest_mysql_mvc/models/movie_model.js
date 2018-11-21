'use strict'

// requerimos la conexión a mysql
var conn = require('./movie_connection'), 
  // uso de prototipo
  MovieModel = () => {}

// creamos una función anónima por cada una de las tareas necesarias para el crud 
// que tengan que ver con la base de datos

// mostrar todas las películas
// recibe una callback como argumento por parte del controlador
// 
MovieModel.getAll = (cb) => conn.query('SELECT * from movie',cb)

// mostramos una película para editar
// le pasamos el id y la callback
MovieModel.getOne = (id,cb) => conn.query('SELECT * FROM movie WHERE movie_id = ?',id,cb)



// inserta película
// como parámetros el insert necesita los datos que se van a insertar y la callback previamente definida en el controlador
// MovieModel.insert = (data,cb) =>  conn.query('INSERT INTO movie set ? ', data, cb)


// actualizamos una peli
// MovieModel.update = (data,cb) => conn.query('UPDATE movie SET ? WHERE movie_id = ? ',[data,data.movie_id], cb)

// salvamos la película
// traemos a la película buscada, si existe, la actualizamos sino la insertamos
MovieModel.save = (data,cb) =>  {
	conn.query('SELECT * FROM movie WHERE movie_id = ?',data.movie_id,(err, rows) => {
		console.log(`Número de registros afectados: ${rows.length} `)

		if(err){
			return err
		}
		else{
			return (rows.length) ? conn.query('UPDATE movie SET ? WHERE movie_id = ? ',[data,data.movie_id], cb) : conn.query('INSERT INTO movie set ? ', data, cb)
		}

		
	})
}



// borramos una peli
MovieModel.delete = (id,cb) => conn.query('DELETE FROM movie WHERE movie_id = ?',id,cb)


MovieModel.close = () => conn.end()


// exportamos como módulo al prototipo Movie
module.exports = MovieModel
