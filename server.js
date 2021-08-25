/*
 * Import de module
 * **************** */ 

const express = require('express');
const exphbs  = require('express-handlebars');
const port = 3000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

/*
 * Configuration de nos modules
 * **************************** */ 

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

// Configuration du module Body-parser : Permet de parser les données d'un formulaire (Creation Article Admin et Formulaire de Contact) depuis le front vers le back au format JSON (Methode POST et PUT)
// req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



// Configuration du module Methode Overrride permettant d'utiliser les méthodes PUT et DELETE en remplacement de la Methode POST //
app.use(methodOverride('_method'));




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