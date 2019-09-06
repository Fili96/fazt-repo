const express = require ('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const { database } = require("./keys");

// inicializaciones
const app = express();

// configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join( __dirname, "views" ));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join( app.get('views'), "layouts" ),
    partialsDir: path.join( app.get('views'), "partials" ),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// middlewares
app.use(session({
    secret: 'faztmysqlnodemysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }));
app.use(flash());


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Variables Global
app.use( (req, res, next) => {
    app.locals.success = req.flash('success');
    next()
});

//Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

// Public
app.use( express.static( path.join(__dirname, 'public')));

// Empieza Servidor
app.listen(app.get('port'), ()=> {
    console.log(`server en puerto ${app.get('port')}`);
});