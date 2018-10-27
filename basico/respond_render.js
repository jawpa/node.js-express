'use strict';

var express = require('express');
// constructor, variable que inicia express
var app = express();

// la estructura de get es una ruta y n cantidad de callbacks
// con res.render() puedo enviar una vista al cliente
// esto no funciona porque tiene que estar configurado
// hay que especificar a express dónde está la carpeta con la vista
app.get('/', (req, res) => {
  	res.render('assets/hola_mundo.html');
});


app.render('index', function(err, html) {
  app.send(html);
});


app.listen(3000, () => {
  	console.log('Example app listening on port 3000!');
});

