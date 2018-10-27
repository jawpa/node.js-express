var express = require('express');
// constructor, variable que inicia express
var app = express();

// la estructura de get es una ruta y n cantidad de callbacks
app.get('/', (req, res) => {
  	res.sendFile(__dirname + '/assets/hola_mundo.html');
});

app.listen(3000, () => {
  	console.log('Example app listening on port 3000!');
});

