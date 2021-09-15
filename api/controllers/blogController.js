/*
 * Controller blog
 * *************** */

exports.getPageBlog = async (req, res) => {
    
    const ballonList = await query('select * from Article')

    console.log(ballonList)

    // Permet de rediriger l'Utilisateur vers le fichier 'blog' HTML Handlebars //
    res.render('blog', { ballonList }); 

}

// Création d'article dans la page admin, le nouvel article se mettra dans la page blog avec les autres produits c'est la raison pour laquelle on le met dans blog.Controller //

//Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
exports.createArticle = async (req, res) => {
    console.log('Controller Create Article', req.body)

    // "insert into" est une requête SQL qui insert les données des colonnes dans une table (Exemple: Table Article) //
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

    // Condition:  Si userExist n'existe pas alors tu me renvoie l'URL '/admin' fichier Handlebars se situant dans le views. Sinon tu m'exécutes la function en rapport avec la création d'article //
    if (!userExist[0]) res.redirect('/admin')
    else {
        query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            // Permet de rediriger (redirect) l'Utilisateur vers l'URL (res.redirect) '/admin' Section Creation Bouton Vert et Liste d'Article (Admin HTML Handlebars) //
            res.redirect('/admin')
        })
    }

}


// Edition de la création d'article (CONFIRMATION) de la Page admin + blog + ballonID //

// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
exports.editArticle = async (req, res) => {
    console.log('Edition Article Page ID', req.body)
    
    // Stockage de la requete sql //
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

    // Permet de rediriger l'Utilisateur vers le fichier Handlebars 'admin' Section Liste Edit Article de la page Admin se situant dans le views //
    // "openArticle: 'show'" permettant lors de l'édition de rester sur la page Admin Section Liste Article en mettant un "openArticle" dans la div <div id="collapseOne" class="accordion-collapse collapse {{ openArticle }}" aria-labelledby="headingOne" du fichier Handlebars tableauArticle //
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
    
    // Permet de rediriger (redirect) l'Utilisateur vers l'URL res.redirect '/admin' se situant dans le views (admin HTML Handlebars)  //
    res.redirect('/admin')
}