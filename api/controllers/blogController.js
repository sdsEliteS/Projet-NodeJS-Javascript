/*
 * Controller blog
 * **************** */
// Récupération du contenu du fichier ballon.json = [] (Array = Tableau)
const ballonList = require('../ballon.json')

exports.getPageBlog = (req, res) => {
    
    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('blog', { ballonList }); // === ballonList: ballonList
}