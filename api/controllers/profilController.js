/*
 * Controller Page Profil
 * ********************** */

/**************************************************************** METHODE ASYNCHRONE *******************************************************************************************************************************************************************/

// COMPTE page PROFIL UTILISATEUR ( READ/lire = Method GET HTTP = MySQL: SELECT ) //
// Exportation de la routes du router.js (getPagePresentation) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur faite au Server et res = response du Server //
exports.getPageProfil = async (req, res) => {

        
        /* Requête SQL permet de filtrer les commentaires de l'Utilisateur = (WHERE Author_id = 1 (Utilisateur 1)) et de calculer le nombre de commentaire dans une table (Exemple : Connaitre le nombre de commentaire qu'a écrit l'utilisateur 1 par exemple grâce à length dans le code HTML lorsqu'il est sur sa page profil ayant un compte */
        // (`SELECT * FROM Comment WHERE author_id = 1`) Requête sur un aspect GENERAL // 
        const nbCommentaire = await query(`SELECT Comment.content, Comment.date, User.pseudo FROM Comment lEFT JOIN User on Comment.author_id = User.id WHERE author_id = 1`)
        console.log('nbCommentaire []', nbCommentaire)

        /* Requête SQL permet de filter les articles de l'utilisateur (Exemple: Permet de mentionner que les articles crée par l'utilisateur 1) */
        // (`SELECT * FROM Article WHERE author_id = 1`) Requête sur un aspect GENERAL //
        const recupArticle = await query(`SELECT Article.title, Article.description, Article.date, User.pseudo FROM Article LEFT JOIN User ON Article.author_id = User.id WHERE author_id = 1;`)
        console.log ('recupArticle []', recupArticle)
        
        
        const recupComment = await query(`SELECT * FROM Article LEFT JOIN Comment ON Article.id = Comment.ref_id WHERE Article.author_id = 1;`)
        console.log ('recupComment []', recupComment)
        
        
       // Par default intégration layout main => {{{ body }}} - (Page View)
       // res.render renvoi à l'Utilisateur un fichier Handlebars HTML 'profil' se situant dans le DOSSIER views //
       res.render('profil', {

         // Objet un BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE OU FALSE) //
        noFooter: true, 
        nbCommentaire,
        recupArticle
    });
}






/*
 * Connexion sur son Compte Profil grâce à la Page Login
 ******************************************************* */

/**************************************************************** METHODE SYNCHRONE ******************************************************************************************************************************************************************/

// Remplissage du formulaire de connexion de la page lOGIN ( CREATE/Création = Method POST HTTP = MySQL: INSERT INTO ) //
// Exportation de la routes du router.js (getPagePresentation) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode POST (Création) - req = requête de Utilisateur faite au Server et res = response du Server //
exports.connexionProfil = (req, res) => {
    console.log('Connexion Login Steven', req.body)


    
    // res.redirect permet de rediriger l'Utilisateur vers l'URL de la page Handlebars HTML /profil se situant dans le views juste après le remplissage du formulaire de la page LOGIN //
    res.redirect('/profil')
}