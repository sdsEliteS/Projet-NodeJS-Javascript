module.exports = (req, res, next) => {
    console.log('Je suis le middleware !')
    next()
}