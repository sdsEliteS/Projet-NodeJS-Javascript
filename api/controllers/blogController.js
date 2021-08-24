/*
 * Controller blog
 * **************** */
// Récupération du contenu du fichier ballon.json = [] (Array = Tableau) //
const ballonList = require('../ballon.json')
const array = []

exports.getPageBlog = (req, res) => {
    
    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('blog', { ballonList }); // === ballonList: ballonList
}








// Lors de la création d'article dans la page admin, le nouvel article se mettra dans la page blog avec les autres produits c'est la raison pour laquelle on le met dans blog.Controller //

exports.createArticle = (req, res) => {
    console.log('Controller Create Article', req.body)

    // Permet de rediriger l'Utilisateur vers l'URL /admin (Handlebars HTML) //
    res.redirect('/admin')
}