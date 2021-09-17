/*
 * Import de module
 * **************** */ 

const express = require('express');
const exphbs  = require('express-handlebars');
const port = 3000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mysql = require ('mysql');
const util = require('util')

const morgan = require('morgan')

/*
 * Configuration de nos modules
 * **************************** */ 

// Rendre fonctionnel express (Concerne toute les méthodes GET,POST,PUT,DELETE)
const app = express();

// Permet de log les ressources chargé par le client (CSS, Image etc ...)
app.use(morgan('dev'))

// Configuration handlebars 
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}));

// Express Static (Permet d'importer un dossier static CSS/SASS sur une URL)
// Exemple: le chemin /assets nous donnera accès au dossier public
app.use('/assets', express.static('public'));

// Configuration du module Body-parser : Permet de parser les données d'un formulaire (Creation Article Admin et Formulaire de Contact) depuis le front vers le back au format JSON (Methode POST et PUT)
// req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



// Configuration du module Methode Overrride permettant d'utiliser les méthodes PUT et DELETE en remplacement de la Methode POST //
app.use(methodOverride('_method'));


// Configuration MySQL - (Nom de la base de données = mydb)

db = mysql.createConnection({
    host: 'localhost',
    user: 'steven',
    password: 'LionelMessi30*',
    database: 'mydb'
});

db.connect(function(err) {
    if (err) console.error('error connecting: ' + err.stack);
    console.log('connected as id ' + db.threadId);
});

// Rendre la variable db = base de donnée asynchrone par un systeme de promesse  (util.promisify)
const query = util.promisify(db.query).bind(db);
global.query = query;

/*
 * Router
 * ****** */

const ROUTER = require('./api/router');
app.use(ROUTER);









// Exemple différence fonction synchrone et asynchrone
// app.get('/', async (req, res) => {

//     // 2 fonction synchrones de suite
//     query(sql, (err, data) => {
//         if (err) console.log(err)
//         query(sql2, (errr, data) => {
//             if (errr) console.log(errr)

//         })
//     })

//     // fonction async en même temp
//     await query(sql)
//     await query(sql2)


// })









/*
 * Ecoute de notre application
 * ***********************$*** */ 

// Lancement de l'application
app.listen(port, () => {
    console.log("le serveur tourne sur le prt: " + port);
});