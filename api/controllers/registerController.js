/*
 * Controller Register
 * ******************* */

exports.getPageRegister = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('register', {
        noFooter: true
    });
}


// Lors du remplissage du formulaire de connexion de la page login //

exports.registerProfil = (req, res) => {
    console.log('Enregistrement Compte Steven', req.body)

    let sql = `insert into User (pseudo, email, password, address, telephone, birthday) values (?)`;
    let values = [
        req.body.pseudo,
        req.body.email,
        req.body.mot_de_passe,
        req.body.adresse,
        req.body.telephone,
        req.body.date_de_naissance
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        // Permet de rediriger (redirect) l'Utilisateur vers l'URL / (home) //
        res.redirect('/')
    })

}