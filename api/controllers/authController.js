/*
 * Page Login
 * ********** */

// Visualisation de la Page LOGIN ( READ/Lire = METHOD GET = MySQL: SELECT ) //
// Exportation de la routes du router.js (getPageLogin) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP Utilisateur faite au Server et res = response du Server //
exports.getPageLogin = (req, res) => {
    

    // Par default intégration layout main => {{{ body }}} - (Page View)
    // Server renvoi à l'Utilisateur le fichier Handlebars HTML 'login' se situant dans le DOSSIER views //
    res.render('login', {


        // OBJET: BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE OU FALSE) //
        noFooter: true
    });
}



// Lors du remplissage du formulaire modal Mot de Passe Oublié de la Page LOGIN //
// Export de la routes du router.js (forgetProfil) avec => une Function opérant un retour d'information en rapport avec la methode POST - req = requête Utilisateur interrogant le Server et res = response du Server //
exports.forgetProfil = (req, res) => {
    console.log('Mot de Passe Oublié Page LOGIN', req.body, req.params)

    // Server permet de rediriger (redirect) l'Utilisateur vers l'URL /profil HTML Handlebars juste après le remplissage du modal "MOT DE PASSE OUBLIE" //
    res.redirect('/profil')
}





/*
 * Page Register
 * ************* */

// Visualisation de la page REGISTER (READ/Lire = Method GET HTTP = MySQL: SELECT) //
// Exportation de la routes du router.js dans le Controller (getPageRegister) avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur faite au Server et res = response du Server //
exports.getPageRegister = (req, res) => {


    // Par default intégration layout main => {{{ body }}} - (Page View)
    // Server renvoi à l'Utilisateur un fichier Handlebars HTML 'register' se situant dans le DOSSIER views //
    res.render('register', {

         // BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE OU FALSE) //
        noFooter: true
    });
}


// Remplissage du formulaire d'enregistrement de l'Utilisateur de la page REGISTER ( CREATE = Method POST HTTP = Requête MySQL: INSERT INTO ) // ID s'auto_increment donc pas besoin de le mentionner dans la Requête SQL //
// export de la routes du router.js (registerProfil) avec => une Function opérant un retour d'information en rapport avec la methode POST - req = requete HTTP de utilisateur faite au server et res = response du server //
exports.registerProfil = (req, res) => {
    console.log('Enregistrement Compte Steven', req.body)

    // Requête SQL permettant la création de plusieurs colonnes dans la Table User //
    // req.body permet de nous ressortir les données dans un terminal de commande afin de constater du bon fonctionnement de l'applis lors du remplissage du formulaire d'enregistrement du l'Utilisateur visionnant les données au moment de la validation //
    let sql = `insert into User (pseudo, email, password, address, telephone, birthday) values (?)`;
    let values = [
        req.body.pseudo,
        req.body.email,
        req.body.mot_de_passe,
        req.body.adresse,
        req.body.telephone,
        req.body.date_de_naissance
    ];

    // Synchronous version
    // Valeur des colonnes de la Table User qui sont écrit dans les input - Method Synchrone  //
    query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        // Server permet de rediriger (redirect) l'Utilisateur vers l'URL / (home) au moment de la validation du formulaire de la page REGISTER //
        res.redirect('/')
    })

    // Async Synchronous version
    // await query(sql, [values])
    // res.redirect('/')

}