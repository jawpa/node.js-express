'use strict'

// requerimos este módulo
var app = require('./app.js'),
	// obtenemos la variable port de app.js
	// la variable va a estar escuchando el puerto y ejecutando la función anónima
	server = app.listen(app.get('port'),() =>{
		console.log(`escuchando puerto ${app.get('port')} `);
	});


