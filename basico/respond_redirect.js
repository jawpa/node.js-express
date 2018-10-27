'use strict';

var express = require('express');
// constructor, variable que inicia express
var app = express();

// lo redireccionamos a google, con el código no encontrado
// status 301 es una redirección permanente
app.get('/copri', (req, res) => {
  	res.redirect(301,'https://www.google.com');
});

app.listen(3000, () => {
  	console.log('Example app listening on port 3000!');
});




