/*
 * Controller blog
 * *************** */


/* Import Module */

/* Le module Path fournit un moyen de travailler avec des répertoires et des chemins de fichiers */
const path = require('path')

/* Rentrant dans le cadre d'une suppression de fichier Image */
const fs = require('fs')

/************************************************************* METHODE ASYNCHRONE **************************************************************************************************************************************************************/

// ( READ/Lire = Method GET HTTP = MySQL: SELECT ) //
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js dans le Controller (getPageBlog) avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur faite au Server et res = response du Server //
exports.getPageBlog = async (req, res) => {

    // La Requête SQL "SELECT * FROM" est mise dans une constante suivi de l'invocation de sa fonction "Méthode Asynchrone" permettant de visionner la table dans la base de donnée MySQL = Fichier db.sql //
    // Execution de la Requête SQL SELECT ("await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
    const ballonList = await query('select * from Article')

    // console.log(ballonList)

    // res.render renvoi à l'Utilisateur le fichier 'blog' HTML Handlebars se situant dans le DOSSIER views accompagner d'un Objet contenant un tableau de la Table Article//
    res.render('blog', {
        /* Rentrant dans le cadre d'une répétition avec la page Blog regroupant les différents Articles, on récupère les data de la table Article pour les mettre dans la constante "ballonList" = KEY en utilisant également une bouche {{#each ballonList }} {{/each }} afin de faire fonctionner la Page Blog */
        ballonList
    });
}

// Création d'article dans la page ADMIN, le nouvel article se mettra dans la page blog avec les autres produits c'est la raison pour laquelle on le met dans blog.Controller //



/* 
 * Remplissage du modal de la création d'Article de la Page ADMIN
 **************************************************************** */

/************************************************************* METHODE ASYNCHRONE *******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

// ( CREATE/Création = Method POST HTTP = MySQL: INSERT INTO ) //
//Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js dans le Controller (createArticle) avec => une Function opérant un retour d'information en rapport avec la methode POST - req = requête de Utilisateur faite au Server et res = response du Server //
exports.createArticle = async (req, res) => {

    // console.log('Controller Create Article', req.body, req.file)
    // Le req.body du console.log se situant dans l'objet {} est importante afin de rendre visible la réponse du server dans le terminal de commande pour tester de la bonne fiabilité de l'application (Method POST = Remplissage des input en y mettant la valeur qui nous permet ensuite de ressortir les données des colonnes de la table Article dans un terminal de commande afin de constater du bon fonctionnement de l'applis lors du remplissage du modal de la création d'article visionnant les données de la page ADMIN au moment de la validation //

    // "insert into" (CREATION) est une requête SQL qui insert les données des colonnes dans une table (Exemple: Table Article) // ID s'auto_increment donc pas besoin de le mentionner dans la Requête SQL //
    let sql = `INSERT INTO Article (title, description, recommandation, date, dateEdit, image, subdescription, address, phone, author_id) values (?)`;
    let values = [
        req.body.title,
        req.body.description,
        req.body.recommandation,
        new Date(Date.now()),
        new Date(Date.now()),
        req.file.nomComplet,
        req.body.subdescription,
        req.body.address,
        req.body.phone,
        req.body.author_id
    ];


    // La Requête SQL "SELECT * FROM" est mise dans une constante suivi de l'invocation de sa fonction "Méthode Asynchrone" permettant de visionner la table dans la base de donnée MySQL - Fichier db.sql grâce à MySQL WORKBENCH) //
    // Execution de la Requête SQL SELECT ( "await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
    const userExist = await query(`SELECT * FROM User WHERE id = ${ req.body.author_id }`)


    // console.log('User Exist', userExist)

    /***************************************************************** CONDITION *****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
    // Si userExist n'existe pas (Erreur) alors tu me renvoie l'URL '/admin' de la Page ADMIN (Pas de Création d'Article). Sinon tu m'exécutes la function en rapport avec la création d'Article //
    if (!userExist[0]) res.redirect('/admin')
    else {
        // Valeur des colonnes de la Table Article qui sont écrit dans les input du modal par l'Utilisateur //
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
    // console.log('Edition Article Page ID', req.body, req.file)

    /********************************************************** METHODE ASYNCHRONE ***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

    /********************************************** L'ORDRE DE LA PROCEDURE EST IMPORTANTE (1-2-3) ***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

    // *** RAPPEL IMPORTANT: Effectuer les modifs de part la requête UPDATE pour ensuite recharger les contantes avec les nouvelles données mise à jour *** //
    // 1 --> Déclaration des Constantes sur un aspect général 
    // 2 --> Effectuer la requête SQL (SQL - UPDATE) en rapport avec des écrits sans l'image et les écrits avec l'image grâce à une condition
    // 3 --> Renvoyer la réponse avec les data mise à jour avec le res.render (User - Article - Message) //


    // .... 1 .... //

    // Les Requêtes SQL "SELECT * FROM" sont misent dans des constantes permettant de visionner avec olus de précision nos différentes tables dans la base de donnée MySQL grâce à WHERE //
    // Execution de la Requête SQL SELECT ( "await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
    const article = await query(`SELECT * FROM Article WHERE id = ${ req.params.id }`),
        // Constante Path.resolve = Méthode résout une séquence de chemins ou de segments de chemin en un chemin absolu pour retrouve une image dans le dossier "image" qui est dans le dossier public //
        pathImg = path.resolve("public/images/" + article[0].image)

    console.log('Img', pathImg)


    // Les Requêtes SQL "SELECT * FROM" sont misent dans des constantes permettant de visionner nos différentes tables dans la base de donnée MySQL (SELECT Récupération de donnée (data)) - Voir également Fichier db.sql Fichier db.sql grâce à MySQL WORKBENCH //
    // Execution de la Requête SQL SELECT ( "await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
    const dbUsers = await query('SELECT * FROM User')
    const dbArticle = await query('SELECT * FROM Article')
    const dbMessage = await query('SELECT * FROM Message')




    // .... 2 .... //

    // PAS BESOIN DE MENTIONNER DateEdit DANS L'UPDATE //
    /* ************************************************************** CONDITION ******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

    // Si req.file n'existe pas = S'il y a pas d'image, alors tu vas m'exécuter la requête SQL UPDATE sans l'image //
    if (!req.file) {
        
        console.log('il y a pas image')
        // Stockage de la Requête SQL - `` = Ctrl + (ALT GR + 7 È ,) //
        let sql = `UPDATE Article
                SET title = '${ req.body.title }',
                    description = '${ req.body.description }',
                    recommandation = '${ req.body.recommandation }',
                    subdescription = '${ req.body.subdescription }',
                    address = '${ req.body.address }',
                    phone = '${ req.body.phone }'
                WHERE id = '${ req.params.id }';`
        // req.params est l'id donner en paramètre de l'URL (/Article/:id exemple: /Article/1) permettant d'édit l'id de l'Article qu'on souhaite (1,2,3 ou 4 etc....) s'il y en plusieurs également - Information sur l'édition de l'id mentionner également dans le terminal de commande (Chaque Article à un numero d'id précis //

        // Execution de la Requête SQL UPDATE permettant le changement de l'article sans l'image "req.file.nomComplet" avec les écrits ( await mot-clé ne peut être utilisé qu'à l'intérieur d'une methode async (Asynchrone)) //
        await query(sql)



        // res.render renvoi à l'Utilisateur le fichier handlebars 'admin' HTML Handlebars se situant dans le DOSSIER views et un Object JSON {} au format { KEY (articles): VALUE (dbArticle) } = (Exemple: { article: dbArticle } )
        // MEMO: la clef (key) sera utiliser dans notre front-end (view - partials handlebars (exemple: {{#each KEY }} {{/each}} )) //
        // Le fichier Handlebars tableauArticle est dans le DOSSIER Admin. Cette manipulation permet de faire fonctionner le FRONT-END en exportant les données des colonnes du tableau dans le terminal de commande afin de constater du bon fonctionnement de l'applis //  Construire le diagramme de classe avec les colonnes grâce à MySQL WORKBENCH //
        res.render('admin', {
            articles: dbArticle,
            message: dbMessage,
            users: dbUsers,
            // BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE OU FALSE) //
            noFooter: true,
            // Faisant partie de l'Objet "openArticle: 'show'" permettant lors de l'édition de rester sur la page Admin Section Liste Article en mettant un "openArticle" dans la div <div id="collapseOne" class="accordion-collapse collapse {{ openArticle }}" aria-labelledby="headingOne" du fichier Handlebars tableauArticle //
            openArticle: 'show'

        })

    // Sinon tu vas exécuter la requête SQL avec l'image avec les écrits //
    } else {
        console.log('il y a une image')
        // Stockage de la Requête SQL - `` = Ctrl + (ALT GR + 7 È ,) //
        let sql = `UPDATE Article
                SET title = '${ req.body.title }',
                    description = '${ req.body.description }',
                    recommandation = '${ req.body.recommandation }',
                    image = '${ req.file.nomComplet }',
                    subdescription = '${ req.body.subdescription }',
                    address = '${ req.body.address }',
                    phone = '${ req.body.phone }'
                WHERE id = '${ req.params.id }';`
        // req.params est l'id donner en paramètre de l'URL (/Article/:id exemple: /Article/1) permettant d'édit l'id de l'Article qu'on souhaite (1,2,3 ou 4 etc....) s'il y en plusieurs également - Information sur l'édition de l'id mentionner également dans le terminal de commande (Chaque Article à un numero d'id précis //

        // Execution de la Requête SQL UPDATE permettant le changement de l'article avec l'image "req.file.nomComplet" ( await mot-clé ne peut être utilisé qu'à l'intérieur d'une methode async (Asynchrone)) //
        await query(sql)


        // Dans manipulation fs unlink + la constante pathImg donnant le chemin de l'image supprimeant la 1er image avant l'Update modifiant l'image //
        fs.unlink(pathImg, (err) => {
            if (err) console.log(err)
            
            // Interdiction de mettre 2 res.render //
            else res.redirect('/admin')

        })


        // res.render renvoi à l'Utilisateur le fichier handlebars 'admin' HTML Handlebars se situant dans le DOSSIER views et un Object JSON {} au format { KEY (articles): VALUE (dbArticle) } = (Exemple: { article: dbArticle } )
        // MEMO: la clef (key) sera utiliser dans notre front-end (view - partials handlebars (exemple: {{#each KEY }} {{/each}} )) //
        // Le fichier Handlebars tableauArticle est dans le DOSSIER Admin. Cette manipulation permet de faire fonctionner le FRONT-END en exportant les données des colonnes du tableau dans le terminal de commande afin de constater du bon fonctionnement de l'applis //  Construire le diagramme de classe avec les colonnes grâce à MySQL WORKBENCH //
        res.render('admin', {
            articles: dbArticle,
            message: dbMessage,
            users: dbUsers,
            // BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE OU FALSE) //
            noFooter: true,
            // Faisant partie de l'Objet "openArticle: 'show'" permettant lors de l'édition de rester sur la page Admin Section Liste Article en mettant un "openArticle" dans la div <div id="collapseOne" class="accordion-collapse collapse {{ openArticle }}" aria-labelledby="headingOne" du fichier Handlebars tableauArticle //
            openArticle: 'show'

        })
    }


}




/* 
 * Suppression d'article du formulaire de la Page Admin Liste Article + Blog + ballonID
 ************************************************************************************** */

/*********************************** METHODE ASYNCHRONE *********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

// (DELETE/Suppression = Method DELETE HTTP = MySQL: DELETE) //
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js (deleteArticle) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode DELETE (Suppression) - req = requête faite par l'Utilisateur interrogant le Server et res = response du Server //
exports.deleteArticle = async (req, res) => {
    console.log('Suppression Article Page ID', req.body, req.params)
 

    // La Requête SQL "SELECT * FROM" est mise dans une constante suivi de l'invocation de sa fonction "Méthode Asynchrone" permettant de visionner la table dans la base de donnée MySQL - Fichier db.sql grâce à MySQL WORKBENCH) //
    // Execution de la Requête SQL SELECT ( "await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
    const article = await query(`SELECT * FROM Article WHERE id = ${ req.params.id }`),
        // Path.resolve = Méthode résout une séquence de chemins ou de segments de chemin en un chemin absolu pour retrouve une image un dossier //
        pathImg = path.resolve("public/images/" + article[0].image)

    // Suppression de l'image dans la liste d'article de la page Admin et dans le dossier Image avec une method Asynchrone //
    fs.unlink(pathImg, async (err) => {
        // Condition si (if) il y a une erreur sinon (else) tu m'excutes la fonction asynchrones //
        if (err) console.log(err)
        else {

            // Execution de la requête SQL "DELETE FROM" permettant de supprimer un article de la page Admin Section Liste d'Article - ( await mot-clé ne peut être utilisé qu'à l'intérieur d'une methode async (Asynchrone)) //
            await query(`DELETE FROM Article WHERE id = ${ req.params.id }`)
            // req.params est l'id donner en paramètre de l'URL (/Article/:id exemple: /Article/1) permettant de supprimer l'id du Message qu'on souhaite (1,2,3 ou 4 etc....) s'il y en plusieurs également - Information sur la suppression de l'id mentionner également dans le terminal de commande plus haut dans le console.log (Chaque Article à un numero d'id précis //

            // res.redirect permet de rediriger l'Utilisateur vers l'URL '/admin' //
            res.redirect('/admin')
        }
    })

}