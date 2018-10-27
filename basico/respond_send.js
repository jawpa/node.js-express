'use strict';

var express = require('express');
// constructor, variable que inicia express
var app = express();

// la estructura de get es una ruta y n cantidad de callbacks
// con el res.send puedo enviar tantos datos como necesite
app.get('/', (req, res) => {
  	res.send(`hola mundo`);
});

app.get('/popo', (req, res) => {
  	res.send(`hola popo`);
});

app.listen(3000, () => {
  	console.log('Example app listening on port 3000!');
});

