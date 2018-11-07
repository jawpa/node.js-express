'use strict'

var express = require('express'),
	favicon = require('serve-favicon'),
	// no es necesario requerir jade
	// jade = require('jade'),
	morgan = require('morgan'),
	routes = require('./routes/index.js'),
	faviconURL = `${__dirname}/public/img/icon.png`,
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
    // sólo podemos usar un módulo de plantillas
    // 'view engine' busca en la dependencia node_modules a jade
    .set('view engine','jade')
    //.set('view engine','ejs')
    // escuchamos al puerto
    .set('port',port)
    // ejecutamos middleware
	// el método favicon
	.use(favicon(faviconURL))
	// tiene que estar después del favicon
	// lo ejecutamos en forma development
	.use(morgan('dev'))
	// esteblecemos el directorio público
	.use(publicDir)
	// ejecutamos al middleware enrutador
	// cuando ejecutamos lo que está en la raíz, 
	// ejecutamos el archivo index de la carpeta routes
	.use('/',routes)

// exportamos como módulo independiente la app
module.exports = app