/*
 * Controller Page ID (ballon)
 * *************************** */

// Renvoi au dossier tableau ballon.json //
const ballonList = require('../ballon.json')

exports.getPageBallonID = (req, res) => {
    console.log('Controller Ballon ID', req.params.id)

    const ballon = ballonList[req.params.id -1]

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('ballon', { ballon });
}





// Lors du remplissage du formulaire d'ajout de commentaire de la page ID //

exports.commentaires = (req, res) => {
    console.log('Ajout de Commentaire Ballon ID', req.body)

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL /ballon + ballonController  //
    res.redirect('/ballon/' + req.body.refId)
}