/*
 * Controller blog
 * *************** */

// Visualisation de la page Blog (READ = Method GET HTTP = LIRE) //
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js dans le Controller (getPageBlog) avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur faite au Server et res = response du Server //
exports.getPageBlog = async (req, res) => {
    
    // La Requête SQL "SELECT * FROM" est mise dans une constante permettant de visionner la table dans la base de donnée MySQL = Fichier db.sql) //
    // Execution de la Requête SQL SELECT ("await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
    const ballonList = await query('select * from Article')

    console.log(ballonList)

    // Server renvoi à l'Utilisateur le fichier 'blog' HTML Handlebars se situant dans le DOSSIER views accompagner d'un Objet contenant un tableau de la Table Article//
    res.render('blog', { 
        ballonList 
    }); 
}


// Création d'article dans la page ADMIN, le nouvel article se mettra dans la page blog avec les autres produits c'est la raison pour laquelle on le met dans blog.Controller //

/* 
 * Remplissage du modal de la création d'Article de la Page ADMIN
 **************************************************************** */ 

// ( CREATE/Création = Method POST HTTP = MySQL: INSERT INTO ) //
//Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js dans le Controller (createArticle) avec => une Function opérant un retour d'information en rapport avec la methode POST - req = requête de Utilisateur faite au Server et res = response du Server //
exports.createArticle = async (req, res) => {
    console.log('Controller Create Article', req.body)

    // "insert into" est une requête SQL qui insert les données des colonnes dans une table (Exemple: Table Article) // ID s'auto_increment donc pas besoin de le mentionner dans la Requête SQL //
    // req.body permet de nous ressortir les données du modal dans un terminal de commande afin de constater du bon fonctionnement de l'applis lors de la création d'Article visionnant les données au moment de la validation //
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

    // Execution de la Requête SQL SELECT ("await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
    // req.body permet de nous ressortir les données dans un terminal de commande afin de constater du bon fonctionnement de l'applis lors de la création d'Article visionnant les données au moment de la validation //
    const userExist = await query(`SELECT * FROM User WHERE id = ${ req.body.author_id }`)

    console.log('User Exist', userExist)

    // Condition:  Si userExist n'existe pas (Erreur) alors tu me renvoie l'URL '/admin' de la Page ADMIN (Pas de Création d'Article). Sinon tu m'exécutes la function en rapport avec la création d'Article //
    if (!userExist[0]) res.redirect('/admin')
    else {
        // Valeur des colonnes de la Table Article qui sont écrit dans les input //
        query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            // Permet de rediriger (redirect) l'Utilisateur vers l'URL '/admin' Section Creation Liste d'Article Bouton Vert (Admin HTML Handlebars) //
            res.redirect('/admin')
        })
    }

}


/*
 * Edition de la création d'article (MODIFICATION) de la Page admin + blog + ballonID 
 ************************************************************************************ */

// (UPDATE/Modification = Method PUT HTTP = MySQL: UPDATE) //
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js (editArticle) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode PUT (Création) - req = requête faite par l'Utilisateur interrogant le Server et res = response du Server //
exports.editArticle = async (req, res) => {
    console.log('Edition Article Page ID', req.body)
    
    // Stockage de la Requête SQL //
    let sql = `UPDATE Article
               SET title = '${req.body.title}',
                   description = '${req.body.description}',
                   subtitle = '${req.body.subtitle}',
                   recommandation = '${req.body.recommandation}',
                   date = '${req.body.date}',
                   image = '${req.body.image}'
               WHERE id = '${req.params.id}';`;

    // Execution de la Requête SQL permettant le changement ou la confirmation de la création d'Article (Le await mot-clé ne peut être utilisé qu'à l'intérieur d'une methode async (Asynchrone)) //
    await query(sql)

   // Les Requêtes SQL "SELECT * FROM" sont misent dans des constantes permettant de visionner nos différentes tables dans la base de donnée MySQL = Fichier db.sql grâce à MySQL WORKBENCH) //
   const dbUsers = await query('select * from User')
   const dbArticle = await query('select * from Article')
   const dbMessage = await query('select * from Message')
    

    // Permet de rediriger l'Utilisateur vers le fichier Handlebars 'admin' Section Liste Edit Article de la page Admin se situant dans le DOSSIER views //
    // Ensuite dans l'objet {} on y ajoute les constantes (const) convertit en tableaux en rapport avec les Table Article - User - Message qu'ont exploitent sous la forme d'un {{#each Article }} {{/each}} + this (Exemple this.name colonne de la Table concernée) 
    // dans le fichier Handlebars tableauArticle - tableauMessage - TableauUser étant dans le DOSSIER Admin. Cette manipulation permet de faire fonctionner le FRONT-END en exportant également les données du tableau dans le terminal de commande afin de constater du bon fonctionnement de l'applis grâce à MySQL WORKBENCH //
    // + BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE OU FALSE) //
    // Faisant partie de l'Objet "openArticle: 'show'" permettant lors de l'édition de rester sur la page Admin Section Liste Article en mettant un "openArticle" dans la div <div id="collapseOne" class="accordion-collapse collapse {{ openArticle }}" aria-labelledby="headingOne" du fichier Handlebars tableauArticle //
    res.render('admin', {
        articles: dbArticle,
        message: dbMessage,
        users: dbUsers,
        noFooter: true,
        openArticle: 'show'
    })
}


/* 
 * Suppression d'article du formulaire de la Page Admin Liste Article + Blog + ballonID
 ************************************************************************************** */ 

// (DELETE/Suppression = Method DELETE HTTP = MySQL: DELETE) //
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js (deleteArticle) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode DELETE (Suppression) - req = requête faite par l'Utilisateur interrogant le Server et res = response du Server //
exports.deleteArticle = async (req, res) => {
    console.log('Suppression Article Page ID', req.body, req.params)

    // Execution de la requête SQL "DELETE FROM" permettant de supprimer un article de la page Admin Section Liste d'Article - (Le await mot-clé ne peut être utilisé qu'à l'intérieur d'une methode async (Asynchrone)) //
    await query(`DELETE FROM Article WHERE id = ${ req.params.id }`)
    
    // Permet de rediriger (redirect) l'Utilisateur vers l'URL res.redirect '/admin' //
    res.redirect('/admin')
}