/*
 * Controller Presentation
 * *********************** */

// Visualisation de la page PRESENTATION ( READ = METHOD GET = LIRE ) //

// export de la routes du router.js (getPagePresentation) avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requete HTTP utilisateur faite au server et res = response du server //
exports.getPagePresentation = (req, res) => {

    
    // Par default intégration layout main => {{{ body }}} - (Page View)
    // Renvoi à l'Utilisateur le fichier Handlebars HTML 'presentation' se situant dans le views//
    res.render('presentation');
}