/*
 * Controller Info
 * *************** */

// Visualisation de la Page INFO ( READ/Lire = METHOD GET HTTP = SELECT ) //
// Exportation de la routes du router.js (getPageInfo) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur faite au Server et res = response du Server //
exports.getPageInfo = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    // Server renvoi à l'Utilisateur le fichier Handlebars HTML 'info' se situant dans le DOSSIER views //
    res.render('info');
}
