/*
 * Controller home
 * *************** */

exports.getPageHome = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('home');
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