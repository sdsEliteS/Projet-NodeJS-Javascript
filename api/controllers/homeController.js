/*
 * Controller home
 * *************** */

exports.getPageHome = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('home');
}




// Lors du remplissage du formulaire de contact de la page Home //

exports.formContact = (req, res) => {
    console.log('Controller Form Contact', req.body)

    // Permet de rediriger l'Utilisateur vers l'URL /  //
    res.redirect('/')
}