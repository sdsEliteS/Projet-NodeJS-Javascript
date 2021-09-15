/*
 * Controller Page ID (ballon)
 * *************************** */

// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
exports.getPageBallonID = async (req, res) => {
    console.log('Controller Ballon ID', req.params.id)

    // Execution de la Requête SQL SELECT ("await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
    const dbBallon = await query ('select * from Article')
    // Déclaration de la constante ballon qu'on mettra dans un {{#each ballon }} {{/each }} + this (Exemple this.name colonne de la Table Article) //
    const ballon = await query (`select * from Article where id = ${ req.params.id}`)
    console.log('dbBallon', dbBallon)
    console.log('ballon', ballon[0])

    // Server renvoi à l'Utilisateur le fichier 'ballon' HTML Handlebars se situant dans le DOSSIER views accompagner d'un Objet contenant un tableau de la Table Article//
    res.render('ballon', { 
        ballon 
    });
}



// Remplissage du formulaire d'ajout de commentaire de la page ballonID //
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

    // Condition: s'il y a pas de req.body.content alors tu me renvoi l'URL '/ballon/' + req.body.refId sinon tu m'executes la fonction  //
    if (!req.body.content) res.redirect('/ballon/' + req.body.refId)
    else {
        query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            // Permet de rediriger (redirect) l'Utilisateur vers l'URL /ballon HTML Handlebars //
            res.redirect('/ballon/' + req.body.refId)
        })
    }

}