/*
 * Controller administration
 * ************************* */

// Renvoi au dossier tableau article.json //
// Renvoi au dossier tableau message.json //
// Renvoi au dossier tableau user.json //
const articleList = require('../article.json')
const messageList = require('../message.json')
const userList = require('../user.json')

exports.getPageAdmin = async (req, res) => {


    // Requête SQL permettant de visionner nos tables dans tes tableaux dans la base de donnée MySQL //
    const dbUsers = await query('select * from User')
    const dbArticle = await query('select * from Article')
    const dbMessage = await query('select * from Message')

    res.render('admin', {
        articles: dbArticle,
        messages: dbMessage,
        users: dbUsers,
        noFooter: true,
        openArticle: 'show'
    });

}



// Lors du remplissage du formulaire d'édition d'utilisateur de la Page Admin //

exports.editUser = (req, res) => {
    console.log('Edition Utilisateur', req.body)

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL /admin HTML Handlebars +  adminController  //
    res.redirect('/admin')
}


// Lors du remplissage du formulaire de suppression d'utilisateur de la Page Admin //

exports.deleteUser = async (req, res) => {
    console.log('Suppression Utilisateur', req.body, req.params)

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL /admin HTML Handlebars + adminController  //
    res.redirect('/admin')
}
