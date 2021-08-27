/*
 * Controller Login
 * **************** */

exports.getPageLogin = (req, res) => {
    
    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('login', {
        // Envoi de variable dans notre front
        maVariable: 'Ma Super Variable',
        noFooter: true
    });
}



// Lors du remplissage du formulaire Mot de Passe Oublié de la Page profil //

exports.forgetProfil = (req, res) => {
    console.log('Mot de Passe Oublié', req.body, req.params)

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL /profil HTML Handlebars //
    res.redirect('/profil')
}