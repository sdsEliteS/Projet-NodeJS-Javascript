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


    // Requête SQL "SELECT * FROM" permettant de visionner nos tables dans des tableaux dans la base de donnée MySQL //
    const dbUsers = await query('select * from User')
    const dbArticle = await query('select * from Article')
    const dbMessage = await query('select * from Message')

    // res.render renvoi un fichier Handlebars 'admin' //
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

    // Requête SQL "DELETE FROM" permettant de supprimer un article de la Page Admin Section Liste d'Utilisateur //
    await query(`DELETE FROM User WHERE id = ${ req.params.id }`)

    // Permet de rediriger l'Utilisateur vers l'URL /admin HTML Handlebars + adminController - "openMessage: show" permettant lors de la Suppression de rester sur la page Admin Section Liste Message //
    const dbUsers = await query('select * from User')
    const dbArticle = await query('select * from Article')
    const dbMessage = await query('select * from Message')

    // Permet de rediriger (redirect) l'Utilisateur vers l'URL /admin HTML Handlebars + adminController  //
    res.render('admin', {
        articles: dbArticle,
        messages: dbMessage,
        users: dbUsers,
        noFooter: true,
        openUser: 'show'
    })

    // res.redirect('/admin') redirige vers des URL et afin qu'on nous renvoi la Page Admin Section Liste Utilisateur au moment de la Suppression de l'Utilisateur,
    // il faut renvoyer un ficher handlebars et donc la res.render permet une issue positif (res.redirect peut être modifier par un res.render) //

    // res.redirect et res.render font partie de la méthode GET //
}
