/*
 * Controller Presentation
 * *********************** */

exports.getPagePresentation = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('presentation');
}




// Lors du remplissage du formulaire de contact de la page Présentation //

exports.formContact2 = (req, res) => {
    console.log('Controller Form Contact2', req.body)

    // Permet de rediriger l'Utilisateur vers l'URL /  //
    res.redirect('/')
}