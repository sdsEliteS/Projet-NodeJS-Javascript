/*
 * Controller Page Profil
 * ********************** */

exports.getPageProfil = (req, res) => {

       // Par default intégration layout main => {{{ body }}} - (Page View)
       res.render('profil', {
        noFooter: true
    });
}



// Lors du remplissage du formulaire de connexion de la page login //

exports.connexionProfil = (req, res) => {
    console.log('Connexion Login Steven', req.body)

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL de la page Handlebars HTML /profil //
    res.redirect('/profil')
}