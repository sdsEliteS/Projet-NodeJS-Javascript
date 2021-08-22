/*
 * Import de module
 * ********************** */ 

const express = require('express')
const exphbs  = require('express-handlebars');
const port = 3000;






/*
 * Config de nos modules
 * ********************* */ 

// Rendre fonctionnel express
const app = express()

// Configuration handlebars
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}));

// Express Static (Permet d'importer un dossier static CSS/SASS sur une URL)
// Exemple: le chemin /assets nous donnera accès au dossier public
app.use('/assets', express.static('public'));






/*
 * Router
 * ****** */

// // Ancienne Version
// app.get('/', (req, res) => {
//     res.render('home')
// })

const ROUTER = require('./api/router')
app.use(ROUTER)

/*
 * Ecoute de notre application
 * ***********************$*** */ 
// Lancement de l'application
app.listen(port, () => {
    console.log("le serveur tourne sur le prt: " + port);
});