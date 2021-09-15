/*
 * Controller Page Profil
 * ********************** */

// Remplissage du formulaire de ma page PROFIL ( READ = Method GET HTTP = LIRE )
// export de la routes du router.js (getPagePresentation) avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requete HTTP utilisateur faite au server et res = response du server //
exports.getPageProfil = (req, res) => {


       // Par default intégration layout main => {{{ body }}} - (Page View)
       // Renvoi à l'Utilisateur un fichier Handlebars HTML 'profil' se situant dans le views //
       res.render('profil', {
        noFooter: true
    });
}



// Remplissage du formulaire de connexion de la page lOGIN //

exports.connexionProfil = (req, res) => {
    console.log('Connexion Login Steven', req.body)


    
    // Permet de rediriger (redirect) l'Utilisateur vers l'URL de la page Handlebars HTML /profil se situant dans le views juste après le remplissage du formulaire de la page LOGIN //
    res.redirect('/profil')
}