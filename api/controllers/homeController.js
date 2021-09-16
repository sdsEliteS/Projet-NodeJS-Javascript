/*
 * Controller Page Home (Accueil)
 * ******************************/

// Visualisation de la page HOME ( READ/Lire = METHOD GET HTTP = SELECT ) //
// Exportation de la routes du router.js (getPageHome) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur interrogant le Server et res = response du Server //
exports.getPageHome = (req, res) => {
    console.log('page home', req.path)
    // Par default intégration layout main => {{{ body }}} - (Page View)
    // Server renvoi à l'Utilisateur le fichier Handlebars HTML 'home' se situant dans le DOSSIER views //
    res.render('home');
}