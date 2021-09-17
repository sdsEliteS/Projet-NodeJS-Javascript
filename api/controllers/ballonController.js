/*
 * Controller Page ID (ballon)
 * *************************** */

/************************************************************* METHODE ASYNCHRONE **************************************************************************************************/

// ( READ/Lire = Method GET HTTP = MySQL: SELECT ) //
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js (getPageBallonID) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur faite au Server et res = response du Server //
exports.getPageBallonID = async (req, res) => {
    console.log('Controller Ballon ID', req.params.id)

    // Execution de la Requête SQL SELECT ("await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
    // Déclaration de la constante ballon qu'on mettra dans un {{#each ballon }} {{/each }} + this (Exemple this.name colonne de la Table Article) //
    const ballon = await query (`select * from Article where id = ${ req.params.id}`)
    // ballon est un Tableau = Array --> résultat de la requête SQL 
    console.log('ballon []', ballon)
    
    // ballon est un Objet --> Index numéro 0 du Tableau ballon
    // RAPPEL: On peut selectionner n'importe quelle index du tableau (exemple: ballon[4])
    // ballon.length === longueur totale de notre tableau
    console.log('ballon {}', ballon[0])

    // res.render renvoi à l'Utilisateur le fichier 'ballon' HTML Handlebars se situant dans le DOSSIER views accompagner d'un Objet contenant un tableau de la Table Article//
    res.render('ballon', { 
        ballon: ballon[0]
    });
}



/************************************************************* METHODE ASYNCHRONE *****************************************************************************************************/

// Remplissage du formulaire d'ajout de commentaire de la page ballonID //

// ( CREATE/Création = Method POST HTTP = MySQL: INSERT INTO)
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js (getPageBallonID) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode POST - req = requête de Utilisateur faite au Server et res = response du Server //
exports.addComment = async (req, res) => {
    console.log('Ajout de Commentaire Ballon ID', req.body)

    // insert into est une requête SQL qui insert des données dans la Table Comment //
    let sql = `insert into Comment (author_id, content, date, ref_id) values (?)`;
    let values = [
        req.body.author_id,
        req.body.content,
        new Date(),
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