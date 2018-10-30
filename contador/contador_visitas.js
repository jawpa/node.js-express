// creamos una sesión en tiempo real con cookies
// para manejar las sesiones, necesitamos dos módulos de npm
// cookie-parser y cookie_session

var express = require('express'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session');

// constructor, variable que inicia express
var app = express();
// usamos el método de express use
app.use(cookieParser());

app.use(cookieSession({
  secret: 'secreto',
  keys: ['key1', 'key2']
}))


// un middleware es una función que se ejecuta entre el proceso de ejecuión del usuario  
// y la respuesta del servidor 

app.get('/', (req, res) => {
	// si la variable req.session.visitas existe, le sumo uno
	// si no, la inicializo en 0
	req.session.visitas || (req.session.visitas = 0)
		let n = req.session.visitas++;	
		res.end(`<h1>Hola, me has visitado ${n} veces</h1>`); 
});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

