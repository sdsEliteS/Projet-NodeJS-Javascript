/*
 * Controller Page Presentation
 * *********************** */

// Visualisation de la Page PRESENTATION ( READ/Lire = METHOD GET = MySQL: SELECT ) //
// Exportation de la routes du router.js (getPagePresentation) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP utilisateur faite au server et res = response du server //
exports.getPagePresentation = (req, res) => {

    
    // Par default intégration layout main => {{{ body }}} - (Page View)
    // Server renvoi à l'Utilisateur le fichier Handlebars HTML 'presentation' se situant dans le DOSSIER views //
    res.render('presentation');
}