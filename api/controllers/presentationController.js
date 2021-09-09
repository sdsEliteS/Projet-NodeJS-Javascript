/*
 * Controller Presentation
 * *********************** */

exports.getPagePresentation = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('presentation');
}




// Lors du remplissage du formulaire de contact de la page Présentation //

exports.formContact2 = (req, res) => {
    console.log('Controller Form Contact2', req.body)

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