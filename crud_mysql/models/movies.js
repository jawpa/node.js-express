'use strict'
// este archivo contiene la lógica de la conexión con mysql
var mysql = require('mysql'),
// podemos usar a la variable de la conexión como middleware 
	myConnection = require('express-myconnection'),
	dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '1234',
      port: 3306,
      database: 'movies'
    },
    // creo un modelo
    Movies = myConnection(mysql, dbOptions, 'request');

// exportamos el objeto movies
module.exports = Movies
