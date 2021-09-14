/*
 * Controller blog
 * *************** */

exports.getPageBlog = async (req, res) => {
    
    const ballonList = await query('select * from Article')

    console.log(ballonList)

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('blog', { ballonList }); 

}

// Création d'article dans la page admin, le nouvel article se mettra dans la page blog avec les autres produits c'est la raison pour laquelle on le met dans blog.Controller //

//Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
exports.createArticle = async (req, res) => {
    console.log('Controller Create Article', req.body)

    // "insert into" est une requête SQL qui insert des données dans une table (Table Article par exemple) //
    let sql = `insert into Article (title, description, subtitle, recommandation, date, categorie, image, author_id) values (?)`;
    let values = [
        req.body.title,
        req.body.description,
        req.body.subtitle,
        req.body.recommandation,
        req.body.date,
        req.body.categorie,
        req.body.image,
        req.body.author_id
    ];

    const userExist = await query(`SELECT * FROM User WHERE id = ${ req.body.author_id }`)

    console.log('User Exist', userExist)

    if (!userExist[0]) res.redirect('/admin')
    else {
        query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            // Permet de rediriger (redirect) l'Utilisateur vers l'URL (res.redirect) '/admin' Section Liste d'Article (Admin HTML Handlebars) //
            res.redirect('/admin')
        })
    }

}


// Validation de la création d'article (edit) de la Page admin + blog + ballonID //

// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
exports.editArticle = async (req, res) => {
    console.log('Edition Article Page ID', req.body)
    
    // Stock la requete sql //
    let sql = `UPDATE Article
               SET title = '${req.body.title}',
                   description = '${req.body.description}',
                   subtitle = '${req.body.subtitle}',
                   recommandation = '${req.body.recommandation}',
                   date = '${req.body.date}',
                   image = '${req.body.image}'
               WHERE id = '${req.params.id}';`;

    // Execution de la requete sql (Le await mot-clé ne peut être utilisé qu'à l'intérieur d'une methode async (Asynchrone)) //
    await query(sql)

    // Permet de rediriger l'Utilisateur vers le fichier Handlebars 'admin' - "openArticle: show" permettant lors de la Suppression de rester sur la page Admin Section Liste Article //
    const dbUsers = await query('select * from User')
    const dbArticle = await query('select * from Article')
    const dbMessage = await query('select * from Message')

    // Permet de rediriger l'Utilisateur vers le fichier Handlebars 'admin' Section Liste Edit Article de la page Admin //
    res.render('admin', {
        articles: dbArticle,
        messages: dbMessage,
        users: dbUsers,
        noFooter: true,
        openArticle: 'show'
    })
}


// Suppression d'article du formulaire de la Page Admin Liste Article + Blog + ballonID //

// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
exports.deleteArticle = async (req, res) => {
    console.log('Suppression Article Page ID', req.body, req.params)

    // Execution de la requête SQL "DELETE FROM" permettant de supprimer un article de la page Admin Section Liste d'Article - (Le await mot-clé ne peut être utilisé qu'à l'intérieur d'une methode async (Asynchrone)) //
    await query(`DELETE FROM Article WHERE id = ${ req.params.id }`)
    
    // Permet de rediriger (redirect) l'Utilisateur vers l'URL res.redirect '/admin' (admin HTML Handlebars)  //
    res.redirect('/admin')
}