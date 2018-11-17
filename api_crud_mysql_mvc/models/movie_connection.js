'use strict'
// este archivo contiene la lógica de la conexión con mysql
var mysql = require('mysql'),
    // config tiene almacenado un objeto json (los archivos json pueden ser requeridos en nodeJS)
    config = require('./db_conf'),
	  dbOptions = {
      // le ponemos el valor a las propiedades dinámicamente por medio del json
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.pass,
      port: config.mysql.port,
      database: config.mysql.db
    },
    // creamos la conexión a la base
    // va a tener el objeto con los datos de conexión a la base
    myConn = mysql.createConnection(dbOptions)
	  
// nos conectamos a la base de datos    
myConn.connect((err) => {
  // si hay error mostramos el stack
  // le pasamos el id de la conexión con myConn.threadId
  return (err) ? console.log(`Error al Conectarse a Mysql: ${err.stack}`) : console.log(`conexión establecida con mysql N°: ${myConn.threadId}`)
})   

// llamamos a la propiedad mysql del archivo json, nos tiene que devolver el valor que es un objeto
// console.log(config.mysql)
// podemos llamar a una propiedad específica de ese objeto
// console.log(config.mysql.pass)

// exportamos el objeto movies
module.exports = myConn
