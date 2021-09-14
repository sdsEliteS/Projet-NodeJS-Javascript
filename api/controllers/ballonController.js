/*
 * Controller Page ID (ballon)
 * *************************** */

exports.getPageBallonID = async (req, res) => {
    console.log('Controller Ballon ID', req.params.id)

    const dbBallon = await query ('select * from Article')
    const ballon = await query (`select * from Article where id = ${ req.params.id}`)
    console.log('dbBallon', dbBallon)
    console.log('ballon', ballon[0])

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('ballon', { ballon });
}



// Lors du remplissage du formulaire d'ajout de commentaire de la page ID //
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

    if (!req.body.content) res.redirect('/ballon/' + req.body.refId)
    else {
        query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            // Permet de rediriger (redirect) l'Utilisateur vers l'URL /ballon HTML Handlebars + ballonController  //
            res.redirect('/ballon/' + req.body.refId)
        })
    }

}