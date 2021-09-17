/*
 * Controller Page Profil
 * ********************** */

/**************************************************************** METHODE SYNCHRONE *******************************************************************************************************************************************************************/

// COMPTE page PROFIL UTILISATEUR ( READ/lire = Method GET HTTP = MySQL: SELECT ) //
// Exportation de la routes du router.js (getPagePresentation) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur faite au Server et res = response du Server //
exports.getPageProfil = (req, res) => {


       // Par default intégration layout main => {{{ body }}} - (Page View)
       // res.render renvoi à l'Utilisateur un fichier Handlebars HTML 'profil' se situant dans le DOSSIER views //
       res.render('profil', {

         // Objet un BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE OU FALSE) //
        noFooter: true
    });
}






/*
 * Connexion sur son Compte Profil grâce à la Page Login
 ******************************************************* */

/**************************************************************** METHODE SYNCHRONE ******************************************************************************************************************************************************************/

// Remplissage du formulaire de connexion de la page lOGIN ( CREATE/Création = Method POST HTTP = MySQL: INSERT INTO ) //
// Exportation de la routes du router.js (getPagePresentation) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode POST (Création) - req = requête de Utilisateur faite au Server et res = response du Server //
exports.connexionProfil = (req, res) => {
    console.log('Connexion Login Steven', req.body)


    
    // res.redirect permet de rediriger l'Utilisateur vers l'URL de la page Handlebars HTML /profil se situant dans le views juste après le remplissage du formulaire de la page LOGIN //
    res.redirect('/profil')
}