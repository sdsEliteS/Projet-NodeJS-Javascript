/*
 * Controller Page ID (ballon)
 * *************************** */

/************************************************************* METHODE ASYNCHRONE **************************************************************************************************/

// ( READ/Lire = Method GET HTTP = MySQL: SELECT ) //
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js (getPageBallonID) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur faite au Server et res = response du Server //
exports.getPageBallonID = async (req, res) => {
    console.log('Controller Ballon ID', req.params.id)


    // JOINTURE //
    // Execution de la Requête SQL SELECT ("await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) // 
    // Déclaration de la constante ballon qu'on mettra dans un {{#each ballon }} {{/each }} + this (Exemple this.name colonne de la Table Article) rentrant dans le cadre d'une récupération des data de la base de donnée = mydb pour les visibles dans le Front //
    const ballon = await query (`select * from Article where id = ${ req.params.id}`) // select Article by id
    const comments = await query (`select Comment.author_id, Comment.content, Comment.date, User.pseudo, User.avatar
                                   from Comment
                                   left outer join User on Comment.author_id = User.id
                                   where Comment.ref_id = ${ req.params.id };`) // La jointure fait qu'on fusionne en faisant un select avec la table : Comment join table : User (author comment) by en rapport avec Article.id (req.params.id)
                                   /* SELECT * FROM = récupération de toute les data de la base de donnée OU dans l'autre cas ci-dessus ce commentaire au niveau de la constante comments cela signifie qu'il est selectif */

    // ballon + comments sont des Tableaux = Array --> résultat de la requête SQL 
    console.log('comments []', comments)
    console.log('ballon []', ballon)
    
    // ballon est un Objet --> Index numéro 0 du Tableau ballon
    // RAPPEL: On peut selectionner n'importe quelle index du tableau (exemple: ballon[4])
    // ballon.length === longueur totale de notre tableau
    console.log('ballon {}', ballon[0])

    // res.render renvoi à l'Utilisateur le fichier 'ballon' HTML Handlebars se situant dans le DOSSIER views accompagner d'un Objet contenant un tableau de la Table Article //
    res.render('ballon', { 
        ballon: ballon[0],
        comments
    });
}

/* On récupère les data de la table Article pour les mettre dans la constante "ballon" qui devient la clé {{ KEY = ballon }} {{ VALUE =  ballon[0] }} sans utiliser la boucle {{#each }} {{/each }} rentrant pas dans le cadre d'une répétition afin de faire fonctionner au niveau visuel la Page ID LORS DE LA CREATION DE L'ARTICLE */


/************************************************************* METHODE ASYNCHRONE *****************************************************************************************************/

// Remplissage du formulaire d'ajout de commentaire de la page ballonID //

// ( CREATE/Création = Method POST HTTP = MySQL: INSERT INTO)
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js (getPageBallonID) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode POST - req = requête de Utilisateur faite au Server et res = response du Server //
exports.addComment = async (req, res) => {
    console.log('Ajout de Commentaire Ballon ID', req.body)

    // insert into est une requête SQL qui crée des données dans la Table Comment (Création de Commentaire) //
    let sql = `insert into Comment (author_id, content, date, ref_id) values (?)`;
    let values = [
        req.body.author_id,
        req.body.content,
        new Date(Date.now()),
        req.body.refId
    ];
    // req.body permet de nous ressortir les données dans un terminal de commande afin de constater du bon fonctionnement de l'applis lors de la création de commentaire d'Article visionnant les données des colonnes du tableau au moment de la validation //   


    // Condition: s'il y a pas de req.body.content alors tu me renvoi l'URL '/ballon/' + req.body.refId sinon tu m'executes la fonction  //
    if (!req.body.content) res.redirect('/ballon/' + req.body.refId)
    else {
        query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            // Permet de rediriger l'Utilisateur vers l'URL '/ballon/' + req.body.refId HTML Handlebars //
            res.redirect('/ballon/' + req.body.refId)
        })
    }

}