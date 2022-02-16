module.exports = (req, res, next) => {

    console.log('Je suis le Middleware', req.session.user)
    if (req.session.user) next()
    else res.redirect('/')
}
// Un middleware est un tampon bloquant les accès empêchant l'exécution d'une fonction callback d'un controller en tapant l'adresse dans l'URL du navigateur /