/*
 * Controller Register
 * ******************* */

exports.getPageRegister = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('register', {
        noFooter: true
    });
}


// Lors du remplissage du formulaire de connexion de la page login //

exports.registerProfil = (req, res) => {
    console.log('Enregistrement Compte Steven', req.body)

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL / (home) //
    res.redirect('/')
}