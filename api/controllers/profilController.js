/*
 * Controller Page Profil
 * ********************** */

const fs = require('fs') // Rentrant dans le cadre d'une suppression de fichier Image //

/**************************************************************** METHODE ASYNCHRONE **************************************************************************************************************************************************************************************************************************************************************/

// COMPTE page PROFIL UTILISATEUR ( READ/lire = Method GET HTTP = MySQL: SELECT ) //
// Exportation de la routes du router.js (getPagePresentation) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur faite au Server et res = response du Server //
exports.getPageProfil = async (req, res) => {

  /*********************************************************** JOINTURE ********************************************************************************************************************************************************************************************************************************************************************/
  /* Requête SQL permet de filtrer les commentaires de l'Utilisateur = (WHERE Author_id = 1 (Utilisateur 1)) et de calculer le nombre de commentaire dans une table (Exemple : Connaitre le nombre de commentaire qu'a écrit l'utilisateur 1 par exemple grâce à length dans le code HTML lorsqu'il est sur sa page profil ayant un compte */
  // (`SELECT * FROM Comment WHERE author_id = 1`) Requête sur un aspect GENERAL // 
  const nbCommentaire = await query(`SELECT Comment.content, Comment.date, User.pseudo FROM Comment lEFT JOIN User ON Comment.author_id = User.id WHERE author_id = 1`)
  // console.log('nbCommentaire []', nbCommentaire)

  /* Requête SQL permet de filter les articles de l'utilisateur (Exemple: Permet de mentionner que les articles crée par l'utilisateur 1) */
  // (`SELECT * FROM Article WHERE author_id = 1`) Requête sur un aspect GENERAL //
  const recupArticle = await query(`SELECT Article.title, Article.description, Article.date, User.pseudo FROM Article LEFT JOIN User ON Article.author_id = User.id WHERE author_id = 1`)
  // console.log('recupArticle []', recupArticle)


  const recupComment = await query(`SELECT * FROM Article LEFT JOIN Comment ON Article.id = Comment.ref_id WHERE Article.author_id = 1`)
  // console.log('recupComment []', recupComment)


  // Par default intégration layout main => {{{ body }}} - (Page View)
  // res.render renvoi à l'Utilisateur un fichier Handlebars HTML 'profil' se situant dans le DOSSIER views //
  res.render('profil', {

    // Objet un BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE ou FALSE) //
    noFooter: true,

    // KEY = nbCommentaire dans le fichier Handlebars/HTML "profil1" //
    nbCommentaire,
    recupArticle
  });
}


// Photo du compte Profil //
exports.createAvatar = async (req, res) => {

  console.log('Controller Create Avatar', req.body, req.file, req.params)

  let sql = `UPDATE User
    SET avatar = '${ req.file.nomComplet }'
    WHERE id = ${ req.params.id };`

  // La Requête SQL "SELECT * FROM" est mise dans une constante suivi de l'invocation de sa fonction "Méthode Asynchrone" permettant de visionner la table dans la base de donnée MySQL - Fichier db.sql grâce à MySQL WORKBENCH) //
  // Execution de la Requête SQL SELECT ( "await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
  const userAvatar = await query(`SELECT id, pseudo, avatar FROM User WHERE id = ${ req.params.id }`)
  // console.log('User Avatar', userAvatar)

  /***************************************************************** CONDITION **********************************************************************************************************************************************************************************************************************************************************************/
  // Si userAvatar n'existe pas (Erreur) alors tu me renvoie l'URL '/profil' se situant dans le view. Sinon tu m'exécutes la function en rapport avec la création d'Article //
  if (!userAvatar[0]) res.render('profil')
  else {
    // Valeur de la colonne de la Table User en rapport avec le Upload Image de la page profil //
    await query(sql)

    req.session.user.avatar = req.file.nomComplet

    // Permet de rediriger l'Utilisateur vers l'URL '/profil' se situant dans le view //
    res.render('profil')
  }

}