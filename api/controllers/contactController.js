/*
 * Controller Contact
 * ****************** */

exports.getPageContact = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('contact');
}

// Lors du remplissage du formulaire de contact de la page Home //
exports.formContact = (req, res) => {
    console.log('Controller Form Contact', req.body)

    let sql = `insert into Message (nom, email, sujet, message, date) values (?)`;
    let values = [
        req.body.nom,
        req.body.email,
        req.body.sujet,
        req.body.message,
        req.body.date,
    ];
    query(sql, [values], function (err, data, fields) {
        if (err) throw err;

        // Permet de rediriger (redirect) l'Utilisateur vers l'URL / (home) //
        res.redirect('/')
    })
}

// Suppression Message du formulaire de contact dans la Page Home + Presensation envoyant vers la Page Admin Section Liste Message //
exports.deleteMessage = async (req, res) => {
    console.log('Controller delete Message', req.body, req.params)

    // Requête SQL permettant de supprimer un message de la page Admin Section Liste Message //
    await query(`DELETE FROM Message WHERE id = ${ req.params.id }`)

    // Permet de rediriger l'Utilisateur vers le fichier handlebars /admin HTML Handlebars + adminController - "openMessage: show" permettant la Suppression afin de rester sur la page Admin Section Liste Message //
    const dbUsers = await query('select * from User')
    const dbArticle = await query('select * from Article')
    const dbMessage = await query('select * from Message')

    res.render('admin', {
        articles: dbArticle,
        messages: dbMessage,
        users: dbUsers,
        noFooter: true,
        openMessage: 'show'
    });
}