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





exports.createArticle = (req, res) => {
    console.log('Controller Create Article', req.body)

    // array.push({
    //     titre: req.body.titre,
    //     subject: req.body.subject
    // })

    // console.log('res array', array)

    // Permet de rediriger l'Utilisateur vers un page handlebars HTML //
    res.redirect('/admin')
}