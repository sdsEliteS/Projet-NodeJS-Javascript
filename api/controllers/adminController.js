/*
 * Controller administration
 * ************************* */

// Renvoi au dossier tableau article.json //
// Renvoi au dossier tableau message.json //
const articleList = require('../article.json')
const messageList = require('../message.json')
const userList = require('../message.json')

exports.getPageAdmin = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('admin', {
        articles: articleList,
        messages: messageList,
        user: userList,
        noFooter: true
    });
}
