/*
 * Controller Page ID (ballon)
 * *************************** */

exports.getPageBallonID = async (req, res) => {
    console.log('Controller Ballon ID', req.params.id)

    const dbBallon = await query ('select * from Article')
    const ballon = await query (`select * from Article where id = ${ req.params.id}`)
    console.log('dbBallon', dbBallon)
    console.log('ballon', ballon[0])

    // Permet de rediriger l'Utilisateur vers le fichier 'ballon' HTML Handlebars //
    res.render('ballon', { ballon });
}



// Remplissage du formulaire d'ajout de commentaire de la page ballonID //
exports.addComment = async (req, res) => {
    console.log('Ajout de Commentaire Ballon ID', req.body)

    // insert into est une requête SQL qui insert des données dans une table (Table Comment par exemple) //
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