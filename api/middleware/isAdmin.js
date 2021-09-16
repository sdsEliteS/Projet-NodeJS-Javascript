module.exports = (req, res, next) => {
    console.log('Je suis le middleware !')
    req.isAdmin = {
        autenticate: true,
        message: 'coucou steven !'
    }
    next()
    // if (req.isAdmin === true) next()
    // else res.redirect('/')
}