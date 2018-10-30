// creamos una sesión en tiempo real con cookies
// para manejar las sesiones, necesitamos dos módulos de npm
// cookie-parser y cookie_session

var express = require('express'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session');

// constructor, variable que inicia express
var app = express();
// usamos el método de express use
// usamos el middleware, se ejecuta pero no devuelve una acción sino transforma objeto
// gracias a este podemos usar las variabes req.session.visitas
app.use(cookieParser());

app.use(cookieSession({
  secret: 'secreto',
  keys: ['key1', 'key2']
}))


// un middleware es una función que se ejecuta entre el pedido de ejecuión del usuario  
// y la respuesta del servidor 
// finalizo el ciclo de pedido
// llama al próximo middleware

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

