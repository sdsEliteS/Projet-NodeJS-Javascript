/*
 * Controller blog
 * *************** */

/************************************************************* METHODE ASYNCHRONE **************************************************************************************************************************************************************/

// ( READ/Lire = Method GET HTTP = MySQL: SELECT ) //
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js dans le Controller (getPageBlog) avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur faite au Server et res = response du Server //
exports.getPageBlog = async (req, res) => {
    
    // La Requête SQL "SELECT * FROM" est mise dans une constante permettant de visionner la table dans la base de donnée MySQL = Fichier db.sql) //
    // Execution de la Requête SQL SELECT ("await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
    const ballonList = await query('select * from Article')

    console.log(ballonList)

    // res.render renvoi à l'Utilisateur le fichier 'blog' HTML Handlebars se situant dans le DOSSIER views accompagner d'un Objet contenant un tableau de la Table Article//
    res.render('blog', { 
        ballonList 
    }); 
}


// Création d'article dans la page ADMIN, le nouvel article se mettra dans la page blog avec les autres produits c'est la raison pour laquelle on le met dans blog.Controller //

/* 
 * Remplissage du modal de la création d'Article de la Page ADMIN
 **************************************************************** */ 

/************************************************************* METHODE ASYNCHRONE ************************************************************************************************************************************************************/

// ( CREATE/Création = Method POST HTTP = MySQL: INSERT INTO ) //
//Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js dans le Controller (createArticle) avec => une Function opérant un retour d'information en rapport avec la methode POST - req = requête de Utilisateur faite au Server et res = response du Server //
exports.createArticle = async (req, res) => {
    console.log('Controller Create Article', req.body)

    // "insert into" est une requête SQL qui insert les données des colonnes dans une table (Exemple: Table Article) // ID s'auto_increment donc pas besoin de le mentionner dans la Requête SQL //
    // req.body permet de nous ressortir les données du modal dans un terminal de commande afin de constater du bon fonctionnement de l'applis lors de la création d'Article de la Page ADMIN visionnant les données des colonnes du tableau au moment de la validation //
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


    // La Requête SQL "SELECT * FROM" est mise dans une constante permettant de visionner la table dans la base de donnée MySQL - Fichier db.sql grâce à MySQL WORKBENCH) //
    // Execution de la Requête SQL SELECT ( "await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
    const userExist = await query(`SELECT * FROM User WHERE id = ${ req.body.author_id }`)

    console.log('User Exist', userExist)

    // Condition: Si userExist n'existe pas (Erreur) alors tu me renvoie l'URL '/admin' de la Page ADMIN (Pas de Création d'Article). Sinon tu m'exécutes la function en rapport avec la création d'Article //
    if (!userExist[0]) res.redirect('/admin')
    else {
        // Valeur des colonnes de la Table Article qui sont écrit dans les input par l'Utilisateur //
        query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            // Permet de rediriger l'Utilisateur vers l'URL '/admin' Section Creation Liste d'Article Bouton Vert  //
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

/********************************************************** METHODE ASYNCHRONE *************************************************************************************************************************************************************************************/

/********************************************** L'ORDRE DE LA PROCEDURE EST IMPORTANTE (1-2-3) *********************************************************************************************************************************************************************/

// *** RAPPEL IMPORTANT: Effectuer les modifs de part la requête UPDATE pour ensuite recharger les contantes avec les nouvelles données mise à jour *** //
    // 1 --> Effectuer la mise a jour (SQL UPDATE) - 2 --> Charger les constantes après la mise à jour permet d'avoir les données à jour sur un aspect general - 3 --> Renvoyer la réponse avec les data mise à jour avec le res.render (User - Article - Message) //
    

    // 1 //

    // Stockage de la Requête SQL //
    let sql = `UPDATE Article
               SET title = '${req.body.title}',
                   description = '${req.body.description}',
                   subtitle = '${req.body.subtitle}',
                   recommandation = '${req.body.recommandation}',
                   date = '${req.body.date}',
                   image = '${req.body.image}'
               WHERE id = '${req.params.id}';`;
    // req.params est l'id donner en paramètre de l'URL (/Article/:id exemple: /Article/1) permettant d'édit l'id de l'Article qu'on souhaite (1,2,3 ou 4 etc....) s'il y en plusieurs également - Information sur l'édition de l'id mentionner également dans le terminal de commande (Chaque Article à un numero d'id précis //

    // Execution de la Requête SQL UPDATE permettant le changement de la création d'Article (Le await mot-clé ne peut être utilisé qu'à l'intérieur d'une methode async (Asynchrone)) //
    await query(sql)


    // 2 //

   // Les Requêtes SQL "SELECT * FROM" sont misent dans des constantes permettant de visionner nos différentes tables dans la base de donnée MySQL - Fichier db.sql grâce à MySQL WORKBENCH //
   // Execution de la Requête SQL SELECT ( "await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
   const dbUsers = await query('select * from User')
   const dbArticle = await query('select * from Article')
   const dbMessage = await query('select * from Message')
    


    // 3 //

    // res.render renvoi à l'Utilisateur le fichier handlebars 'admin' HTML Handlebars se situant dans le DOSSIER views et un Object JSON {} au format { KEY (articles): VALUE (dbArticle) } = (Exemple: { article: dbArticle } )
    // MEMO: la clef (key) sera utiliser dans notre front-end (view - partials handlebars (exemple: {{#each KEY }} {{/each}} )) //
    // Le fichier Handlebars tableauArticle est dans le DOSSIER Admin. Cette manipulation permet de faire fonctionner le FRONT-END en exportant les données des colonnes du tableau dans le terminal de commande afin de constater du bon fonctionnement de l'applis //  Construire le diagramme de classe avec les colonnes grâce à MySQL WORKBENCH //
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

/*********************************** METHODE ASYNCHRONE *********************************/

// (DELETE/Suppression = Method DELETE HTTP = MySQL: DELETE) //
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js (deleteArticle) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode DELETE (Suppression) - req = requête faite par l'Utilisateur interrogant le Server et res = response du Server //
exports.deleteArticle = async (req, res) => {
    console.log('Suppression Article Page ID', req.body, req.params)
    

    // Execution de la requête SQL "DELETE FROM" permettant de supprimer un article de la page Admin Section Liste d'Article - (Le await mot-clé ne peut être utilisé qu'à l'intérieur d'une methode async (Asynchrone)) //
    await query(`DELETE FROM Article WHERE id = ${ req.params.id }`)
    // req.params est l'id donner en paramètre de l'URL (/Article/:id exemple: /Article/1) permettant de supprimer l'id du Message qu'on souhaite (1,2,3 ou 4 etc....) s'il y en plusieurs également - Information sur la suppression de l'id mentionner également dans le terminal de commande plus haut dans le console.log (Chaque Article à un numero d'id précis //
    
    // res.redirect permet de rediriger l'Utilisateur vers l'URL '/admin' //
    res.redirect('/admin')
}