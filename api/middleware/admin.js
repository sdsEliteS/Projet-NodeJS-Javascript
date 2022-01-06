// Permet de checker si la session est admin et si OUI, donne accès à la page admin - SÉCURITÉ afin qu'un visiteur ou un utilisateur ne fasse pas un /admin et arriver sur le panneautage ADMIN sans être ADMIN //
module.exports = (req, res, next) => {

    console.log('Je suis le Middleware', req.session.isAdmin)
    if (req.session.isAdmin === true) next()
    else res.redirect('/')
}
// Un middleware est un tampon bloquant les accès empêchant l'exécution d'une fonction callback d'un controller en tapant l'adresse dans l'URL du navigateur //