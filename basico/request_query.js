'use strict';

var express = require('express');
// constructor, variable que inicia express
var app = express();


// con searh buscamos palabras
// usamos la letra s -por ejemplo- para capturar el parámetro de la url
// si ponemos http://localhost:3000/search obtenemos: Tu palabra buscada es: undefined
// si ponemos http://localhost:3000/search?s=como+popo obtenemos: Tu palabra buscada es: como popo
app.get('/search', (req, res) => {
  	res.end(`<h1>Tu palabra buscada es: ${req.query.s}</h1>`);
});

app.listen(3000, () => {
  	console.log('Example app listening on port 3000!');
});

