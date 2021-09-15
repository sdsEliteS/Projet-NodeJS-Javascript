/*
 * Controller Page Login
 * ********************* */

// Visualisation de la Page LOGIN ( READ/Lire = METHOD GET = MySQL: SELECT ) //
// Exportation de la routes du router.js (getPageLogin) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP Utilisateur faite au Server et res = response du Server //
exports.getPageLogin = (req, res) => {
    

    // Par default intégration layout main => {{{ body }}} - (Page View)
    // Server renvoi à l'Utilisateur le fichier Handlebars HTML 'login' se situant dans le DOSSIER views //
    res.render('login', {

        // OBJET: Envoi de variable dans notre front ('Ma Super Variable = Chaine de Caractère)
        maVariable: 'Ma Super Variable',

        // OBJET: BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE OU FALSE) //
        noFooter: true
    });
}



// Lors du remplissage du formulaire modal Mot de Passe Oublié de la Page LOGIN //
// Export de la routes du router.js (forgetProfil) avec => une Function opérant un retour d'information en rapport avec la methode POST - req = requête Utilisateur interrogant le Server et res = response du Server //
exports.forgetProfil = (req, res) => {
    console.log('Mot de Passe Oublié Page LOGIN', req.body, req.params)

    // Server permet de rediriger (redirect) l'Utilisateur vers l'URL /profil HTML Handlebars juste après le remplissage du modal "MOT DE PASSE OUBLIE" //
    res.redirect('/profil')
}