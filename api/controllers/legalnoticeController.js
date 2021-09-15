/*
 * Controller Page Mentions légales
 * *************************** */

// Visualisation de la Page MENTIONS LEGALES ( READ/Lire = METHOD GET = MySQL: SELECT ) //
// Exportation de la routes du router.js (getPageLegalnotice) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP Utilisateur faite au Server et res = response du Server //
exports.getPageLegalnotice = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    // Server renvoi à l'Utilisateur le fichier Handlebars HTML 'legalnotice' se situant dans le DOSSIER views //
    res.render('legalnotice');
}