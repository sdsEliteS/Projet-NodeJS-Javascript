/*
 * Controller Page ID (ballon)
 * *************************** */

/************************************************************* METHODE ASYNCHRONE *******************************************************************************************************************************************************************************************************************************************************/

// ( READ/Lire = Method GET HTTP = MySQL: SELECT ) //
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js (getPageBallonID) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur faite au Server et res = response du Server //
exports.getPageBallonID = async (req, res) => {
    console.log('Controller Ballon ID', req.params.id)


    // Execution de la Requête SQL SELECT ("await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) // 
    // Déclaration de la constante ballon suivi de l'invocation de sa fonction "Méthode Asynchrone" rentrant dans le cadre d'une récupération des data de la base de donnée = mydb pour les rendre visibles dans le Front-End //
    const ballon = await query (`SELECT * FROM Article WHERE id = ${ req.params.id}`) // Selection d'un Article précis (req.params.id) //


    /************************************************************ JOINTURE **************************************************************************************************************************************************************************************************************************************************************/
    // La jointure fait qu'on fusionne plusieurs tables dans cet exemple (Comment + User) afin d'identifier l'auteur du commentaire unique (Comment.ref_id = req.params.id) de l'Article //
    /* JOINTURE SELECT rentre dans le cadre de la récupération de toute les data de la base de donnée sous la forme d'une " { KEY (comments): VALUE (comments) } " pour le rendre visible dans le Front-End en le mettant dans le fichier Handlebars/HTML */
    const comments = await query (`SELECT Comment.author_id, Comment.content, Comment.date, User.pseudo, User.avatar
                                   FROM Comment
                                   LEFT OUTER JOIN User ON Comment.author_id = User.id
                                   WHERE Comment.ref_id = ${ req.params.id };`) 

    // ballon + comments sont des Tableaux = Array --> résultat de la requête SQL 
    console.log('comments []', comments)
    console.log('ballon []', ballon)
    
    // ballon est un Objet --> Index numéro 0 du Tableau ballon
    // RAPPEL: On peut selectionner n'importe quelle index du tableau (exemple: ballon[4])
    // ballon.length === longueur totale de notre tableau
    console.log('ballon {}', ballon[0])

    // res.render renvoi à l'Utilisateur le fichier 'ballon' HTML Handlebars se situant dans le DOSSIER views accompagner d'un Objet contenant un tableau de la Table Article //
    res.render('ballon', { 
        // ballon et comments sont des clés (KEY) important les data de la base de donnée MySQL dans les fichiers Handlebars/HTML "ballon et liste" (Clé ballon prenant les data de la table Article afin d'animer le Front-End et Clé comments qui lui va unir l'auteur et le commentaire pour que chaque commentaire est un auteur)
        ballon: ballon[0],
        comments
    });
}

/* On récupère les data de la table Article pour les mettre dans la constante "ballon" qui devient la clé {{ KEY = ballon }} {{ VALUE =  ballon[0] }} sans utiliser la boucle {{#each }} {{/each }} rentrant pas dans le cadre d'une répétition afin de faire fonctionner au niveau visuel la Page ID LORS DE LA CREATION DE L'ARTICLE */


/************************************************************* METHODE ASYNCHRONE ******************************************************************************************************************************************************************************************************************************************************/

// Remplissage du formulaire d'ajout de commentaire de la page ballonID //

// ( CREATE/Création = Method POST HTTP = MySQL: INSERT INTO)
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js (getPageBallonID) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode POST - req = requête de Utilisateur faite au Server et res = response du Server //
exports.addComment = async (req, res) => {
    console.log('Ajout de Commentaire Ballon ID', req.body)

    // insert into est une requête SQL qui crée des données dans la Table Comment (Création de Commentaire) //
    let sql = `INSERT INTO Comment (author_id, content, date, ref_id) values (?)`;
    let values = [
        req.body.author_id,
        req.body.content,
        new Date(Date.now()),
        req.body.refId
    ];
    // req.body permet de nous ressortir les données dans un terminal de commande afin de constater du bon fonctionnement de l'applis lors de la création de commentaire d'Article visionnant les données des colonnes du tableau au moment de la validation //   


    // Condition: s'il y a pas de req.body.content (INPUT Visuel Front Commentaire Article) alors tu me renvoi l'URL '/ballon/' + req.body.refId sinon tu m'executes la fonction  //
    if (!req.body.content) res.redirect('/ballon/' + req.body.refId)
    else {
        // [values] est la valeur de l'input au moment de la validation sur le bouton envoyer "ajouter un commentaire" //
        query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            // Permet de rediriger l'Utilisateur vers l'URL '/ballon/' + req.body.refId HTML Handlebars //
            res.redirect('/ballon/' + req.body.refId)
        })
    }

}