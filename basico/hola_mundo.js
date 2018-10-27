// instalamos express de manera global
// npm install -g express

var express = require('express');
// constructor, variable que inicia express
var app = express();

// la estructura de get es una ruta y n cantidad de callbacks
app.get('/', function (req, res) {
  res.end('<h1>Hello Mundo</h1>');
});

// le indico el puerto 3000
app.listen(3000);

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

