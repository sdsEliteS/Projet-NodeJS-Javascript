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

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL /admin (Handlebars HTML + AdminController) //
    res.redirect('/admin')
}


// Lors du remplissage du formulaire d'édition d'article de la Page ID //

exports.editArticle = (req, res) => {
    console.log('Edition Article Page ID', req.body)

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL /ballon HTML Handlebars + ballonController  //
    res.redirect('/admin')
}