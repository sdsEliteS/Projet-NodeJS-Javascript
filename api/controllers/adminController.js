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

    // const sqlUser = 'select * from User';
    // const sqlArticle = 'select * from Article';

    const dbUsers = await query('select * from User')
    const dbArticle = await query('select * from Article')
    const dbMessage = await query('select * from Message')

    res.render('admin', {
        articles: dbArticle,
        messages: dbMessage,
        users: dbUsers,
        noFooter: true
    });

    // db.query(sqlUser, (err, dataUser) => {
    //     if (err) throw err
    //     db.query(sqlArticle, (err, dataArticle) => {
    //         if (err) throw err

    //         // Par default intégration layout main => {{{ body }}} - (Page View) 
    //         res.render('admin', {
    //             articles: dataArticle,
    //             messages: messageList,
    //             users: dataUser,
    //             noFooter: true
    //         });


    //     })
    // })

}



// Lors du remplissage du formulaire d'édition d'utilisateur de la Page Admin //

exports.editUser = (req, res) => {
    console.log('Edition Utilisateur', req.body)

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL /admin HTML Handlebars +  adminController  //
    res.redirect('/admin')
}


// Lors du remplissage du formulaire de suppression d'utilisateur de la Page Admin //

exports.deleteUser = (req, res) => {
    console.log('Suppression Utilisateur', req.body, req.params)

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL /admin HTML Handlebars + adminController  //
    res.redirect('/admin')
}


// Lors du remplissage du formulaire des messages d'utilisateur de la Page Admin //

exports.deleteMessage = (req, res) => {
    console.log('Suppression Message Utilisateur', req.body, req.params)

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL /admin HTML Handlebars + adminController  //
    res.redirect('/admin')
}