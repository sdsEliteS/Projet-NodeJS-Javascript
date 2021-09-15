/*
 * Controller Register
 * ******************* */

// Visualisation de la page REGISTER (READ = Method GET HTTP = LIRE) //
// export de la routes du router.js (getPageRegister) avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requete HTTP utilisateur faite au server et res = response du server //
exports.getPageRegister = (req, res) => {


    // Par default intégration layout main => {{{ body }}} - (Page View)
    // Renvoi à l'Utilisateur un fichier Handlebars HTML 'register' se situant dans le views //
    res.render('register', {
        noFooter: true
    });
}


// Remplissage du formulaire REGISTER d'enregistrement de l'Utilisateur de la page REGISTER ( CREATE = Method POST HTTP = Requête MySQL: INSERT INTO ) //
// export de la routes du router.js (registerProfil) avec => une Function opérant un retour d'information en rapport avec la methode POST - req = requete utilisateur faite au server et res = response du server //
exports.registerProfil = (req, res) => {
    console.log('Enregistrement Compte Steven', req.body)

    // Requête SQL permettant la création de plusieurs colonnes dans un Table User - req.body permet de ressortir l'information dans un terminal de commande afin de constater du bon fonctionnement de l'applis lors du remplissage du formulaire visionnant les données au moment de la validation //
    let sql = `insert into User (pseudo, email, password, address, telephone, birthday) values (?)`;
    let values = [
        req.body.pseudo,
        req.body.email,
        req.body.mot_de_passe,
        req.body.adresse,
        req.body.telephone,
        req.body.date_de_naissance
    ];
    query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        

        
        // Permet de rediriger (redirect) l'Utilisateur vers l'URL / (home) au moment de la validation du formulaire de la page REGISTER //
        res.redirect('/')
    })

}