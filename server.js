/*
 * Import de module
 * ********************** */ 

const express = require('express');
const exphbs  = require('express-handlebars');
const port = 3000;
const bodyParser = require('body-parser');

/*
 * Config de nos modules
 * ********************* */ 

// Rendre fonctionnel express
const app = express();

// Configuration handlebars
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}));

// Express Static (Permet d'importer un dossier static CSS/SASS sur une URL)
// Exemple: le chemin /assets nous donnera accès au dossier public
app.use('/assets', express.static('public'));

// permet de parser les données d'un formulaire (Creation Article et Formulaire de Contact) depuis le front vers le back au format JSON
// req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

/*
 * Router
 * ****** */

// // Ancienne Version
// app.get('/', (req, res) => {
//     res.render('home')
// })

const ROUTER = require('./api/router');
app.use(ROUTER);

/*
 * Ecoute de notre application
 * ***********************$*** */ 
// Lancement de l'application
app.listen(port, () => {
    console.log("le serveur tourne sur le prt: " + port);
});