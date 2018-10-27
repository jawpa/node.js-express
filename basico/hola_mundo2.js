// instalamos express de manera global
// npm install -g express

var express = require('express');
// constructor, variable que inicia express
var app = express();

// la estructura de get es una ruta y n cantidad de callbacks
app.get('/', (req, res) => {
  	res.send('<h1>Hello Mundo</h1>');
});

app.listen(3000, () => {
  	console.log('Example app listening on port 3000!');
});

