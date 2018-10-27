var express = require('express');
// constructor, variable que inicia express
var app = express();


// quiero ver la id del usuario que hace la petición
// los dos puntos indica que podemos pasar parámetros
// generamos un objeto literal req.params (tiene tantos elementos como parámetros invocados)
// http://localhost:3000/user/2-pitlulo-30
// obtenemos: hola pitulo, tu id es 2 y tenés 30 años
app.get('/user/:id-:name-:age', (req, res) => {
  	res.end(`<h1>hola <b>${req.params.name}</b>, tu id es <b>${req.params.id}</b> 
  		    y tenés <b>${req.params.age}</b> años</h1>`);
});
app.listen(3000, () => {
  	console.log('Example app listening on port 3000!');
});

