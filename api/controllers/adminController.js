/*
 * Controller administration
 * ************************* */

// Renvoi au dossier tableau article.json //
// Renvoi au dossier tableau message.json //
// Renvoi au dossier tableau user.json //
const articleList = require('../article.json')
const messageList = require('../message.json')
const userList = require('../user.json')

exports.getPageAdmin = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('admin', {
        articles: articleList,
        messages: messageList,
        users: userList,
        noFooter: true
    });
}



// Lors du remplissage du formulaire d'édition d'utilisateur de la Page Admin //

exports.editUser = (req, res) => {
    console.log('Edition Utilisateur', req.body)

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL /ballon HTML Handlebars + ballonController  //
    res.redirect('/admin')
}