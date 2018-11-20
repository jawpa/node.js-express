'use strict'

var express = require('express'),
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	// no es necesario requerir jade
	// jade = require('jade'),
	morgan = require('morgan'),
	// ('_method') es un método oculto, puede llamarse como queramos
	// puede ser un método o atributo
	// en las vistas hay que enviar ese valor de manera oculta
	restFul = require('express-method-override')('_method'),
	routes = require('./routes/movie_router.js'),
	// url de nuestra aplicación
	faviconURL = `${__dirname}/public/img/node-favicon.png`,
	// definimos el directorio de archivos estáticos
	publicDir = express.static(`${__dirname}/public`),
	// definimos la ruta de las vistas
	viewDir = `${__dirname}/views`,
	// el puerto
	port = (process.env.PORT || 3000),
	// la variable que ejecuta express
	app = express();

// configuración de la aplicación
app
	// establecemos el directorio de las vistas
    .set('views',viewDir)
    // espccificamos el motor de las plantillas
     // 'view engine' busca en la dependencia node_modules a jade
    .set('view engine','jade')
    // escuchamos al puerto
    .set('port',port)
    // ejecutamos middleware
	// el método favicon
	.use(favicon(faviconURL))
	// tienen que estar después del favicon
	// para que trabaje con los datos del json
	.use(bodyParser.json())
	// para que bodyparser trabaje con los datos del formulario
	// parse application/x-www-form-urlencoded
	.use(bodyParser.urlencoded({extended: false}))
	// implementamos el middleware restful
	.use(restFul)
	// lo ejecutamos en forma development
	.use(morgan('dev'))
	// esteblecemos el directorio público
	.use(publicDir)
	// ejecutamos al middleware enrutador
	// no especificamos una ruta en particular
	.use(routes)

// exportamos como módulo independiente la app
module.exports = app