'use strict';

var express = require('express');
// constructor, variable que inicia express
var app = express();

// la estructura de get es una ruta y n cantidad de callbacks
// con res.json() puedo enviar datos en formato objeto literal
// si ponemos http://localhost:3000/json
// obtenemos el objeto en formato json: {"name":"Cualunque","age":45,"mail":"cualunque@por.com"}
app.get('/json', (req, res) => {
  	res.json({
  		name : 'Cualunque',
  		age : 45,
  		mail : 'cualunque@por.com'
  	});
});

app.listen(3000, () => {
  	console.log('Example app listening on port 3000!');
});

