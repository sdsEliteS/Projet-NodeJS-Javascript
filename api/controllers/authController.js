/*
 * Page Login
 * ********** */


/**************************************************************************** METHODE ASYNCHRONE **************************************************************************************************************************************************************/
// Visualisation de la Page LOGIN ( READ/Lire = METHOD GET = MySQL: SELECT ) //
// Exportation de la routes du router.js (getPageLogin) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP Utilisateur faite au Server et res = response du Server //
exports.getPageLogin = async (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    // Server renvoi à l'Utilisateur le fichier Handlebars HTML 'login' se situant dans le DOSSIER views //
    res.render('login', {


        // OBJET: BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE OU FALSE) //
        noFooter: true,
    });



}

/*
 * Connexion sur son Compte Profil grâce à la Page Login
 ******************************************************* */

/**************************************************************** METHODE ASYNCHRONE ******************************************************************************************************************************************************************/

// Remplissage du formulaire de connexion de la page lOGIN ( CREATE/Création = Method POST HTTP = MySQL: INSERT INTO ) //
// Exportation de la routes du router.js (getPagePresentation) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode POST (Création) - req = requête de Utilisateur faite au Server et res = response du Server //
exports.connexionProfil = async (req, res) => {
    console.log('Connexion Login Steven', req.body)


    /* EXPRESS SESSION PROCEDURE */


    /* Requête SQL permettant de cibler le formulaire Login en rapport avec 1'Utilisateur précis ! (pseudo) */
    const user = await query(`SELECT pseudo, email, password, isAdmin FROM User WHERE pseudo = '${req.body.pseudo}'`)
    console.log('user', user)


    /* Si user ne correspond pas au pseudo dans la DB (Base de donnée) au moment du remplissage du formulaire login alors tu renvoi la page login = res.render login */
    if (!user[0]) {
        console.log("PAS DANS LA DB");
        res.render('register', {
            error: 'Nous ne connaisons pas ce pseudo !'
        })

    } else {
        /*  Sinon si user est bien un mail qui existe dans la DB, alors tu executes la fonction */
        console.log("Existe DANS LA DB");

        if (user[0].password !== req.body.mot_de_passe) {
            console.log('Mot de pass error')
            res.render('login', {
                error: 'Le mot de passe est erroné !'
            })

        } else if (user[0] && user[0].password === req.body.mot_de_passe) {
            console.log('Mot de pass OK')

            req.session.user = {
                pseudo: user[0].pseudo,
                email: user[0].email
            }

            if (user[0].isAdmin === 1) req.session.isAdmin = true
            // Par default intégration layout main => {{{ body }}} - (Page View)
            // Server renvoi à l'Utilisateur le fichier Handlebars HTML 'login' se situant dans le DOSSIER views //
            res.render('profil', {

                // OBJET: BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE OU FALSE) //
                noFooter: true,

                // Tableau "users" en rapport avec la requête SQL de la table User dans mydb (Base de Donnée - Fichier db.sql) //
                user: user[0],

                success: 'Bienvenu ' + user[0].pseudo
            });

        } else {
            res.render('login', {
                error: 'Une erreur est survenu !'
            })

        }

    }

}

/**************************************************************************** METHODE SYNCHRONE **************************************************************************************************************************************************************/
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


/**************************************************************************** METHODE SYNCHRONE **************************************************************************************************************************************************************/
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

/**************************************************************************** METHODE SYNCHRONE **************************************************************************************************************************************************************/
// Remplissage du formulaire d'enregistrement de l'Utilisateur de la page REGISTER ( CREATE = Method POST HTTP = Requête MySQL: INSERT INTO ) // ID s'auto_increment donc pas besoin de le mentionner dans la Requête SQL //
// export de la routes du router.js (registerProfil) avec => une Function opérant un retour d'information en rapport avec la methode POST - req = requete HTTP de utilisateur faite au server et res = response du server //
exports.registerProfil = async (req, res) => {
    console.log('Enregistrement Compte Steven', req.body)

    const userExist = await query(`SELECT * FROM User WHERE pseudo = '${ req.body.pseudo }'`)


    console.log('UserExist', userExist)

    // Condition : Si le Pseudo STEVEN est crée et qu'un autre pseudo steven est crée alors il y aura un message d'erreur disant que ce pseudo existe déjà //
    if (userExist.length > 0) {
        if (userExist[0].pseudo.toLowerCase() === req.body.pseudo.toLowerCase()) {
            res.render('register', {
                error: 'Ce pseudo est déja pris !'
            })
        }

    } else if (!userExist[0] && req.body.mot_de_passe.length < 6) {
        res.render('register', {
            error: 'Le mot de passe contien moins de 8 charactèrs'
        })

    } else {
        console.log('UserNotExist')

        // Requête SQL permettant la création de plusieurs colonnes dans la Table User //
        // req.body permet de nous ressortir les données dans un terminal de commande afin de constater du bon fonctionnement de l'applis lors du remplissage du formulaire d'enregistrement du l'Utilisateur visionnant les données au moment de la validation //
        let sql = `INSERT INTO User (pseudo, email, password, address, telephone, birthday) values (?)`;
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
            res.render('register', {
                success: 'Votre compte à bien été créé !'
            })
        })

    }

}