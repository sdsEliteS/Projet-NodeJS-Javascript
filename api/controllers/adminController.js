/*
 * Controller administration
 * ************************* */

// Renvoi au dossier tableau article.json //
// Renvoi au dossier tableau message.json //
// Renvoi au dossier tableau user.json //
const articleList = require('../article.json')
const messageList = require('../message.json')
const userList = require('../user.json')



// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports) //
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



// Validation du formulaire (modal) de l'édition de l'Utilisateur //

// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports) //
exports.editUser = async (req, res) => {
    console.log('Edition User Page ID', req.body, req.params)

    // Bannir (isBan) l'utilisateur, Vérification (isVerified) de l'inscription de l'Utilisateur // 
    // (Pour récupérer les valeurs rentrer dans la base de donnée avec le terminal de commande afin de valider du bon fonctinnement de l'applis en rapport avec les colonnes qui sont dans une Table (exemple: isADmin ou autre) faire "req.body.isAdmin" ou autre) //
    if(req.body.isAdmin === 'on') req.body.isAdmin = 1
    else req.body.isAdmin = 0 

    if(req.body.isVerified === 'on') req.body.isVerified = 1
    else req.body.isVerified = 0 

    if (req.body.isBan === 'on') req.body.isBan = 1
    else req.body.isBan = 0

    console.log('Mes data du formulaire', req.body)

    // Stock la requete sql //
    let sql = `UPDATE User
            SET isAdmin = '${req.body.isAdmin}',
                isVerified = '${req.body.isVerified}',
                isBan = '${req.body.isBan}'
            WHERE id = '${req.params.id}';`;

    

    // Execution de la requete sql (elle est utilisé dans le cadre d'une méthode asynchrome = async ) //
    await query(sql)

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
}





// Suppression d'utilisateur de la Page Admin //

// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports) //
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
