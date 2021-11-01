/*
 * Controller Page Profil
 * ********************** */

/* Import Module */

/* le module Bcrypt est un gage de protection cryptage du mot de passe */
const bcrypt = require('bcrypt')

/* Le module Path fournit un moyen de travailler avec des répertoires et des chemins de fichiers */
const path = require('path')

const fs = require('fs') // Rentrant dans le cadre par exemple d'une suppression de fichier Image //




/**************************************************************** METHODE ASYNCHRONE **************************************************************************************************************************************************************************************************************************************************************/

// COMPTE page PROFIL UTILISATEUR ( READ/lire = Method GET HTTP = MySQL: SELECT ) //
// Exportation de la routes du router.js (getPagePresentation) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode GET - req = requête HTTP de Utilisateur faite au Server et res = response du Server //
exports.getPageProfil = async (req, res) => {

  /*********************************************************** JOINTURE ********************************************************************************************************************************************************************************************************************************************************************/
  /* Requête SQL permet de filtrer les commentaires de l'Utilisateur = (WHERE Author_id = 1 (Utilisateur 1)) et de calculer le nombre de commentaire dans une table (Exemple : Connaitre le nombre de commentaire qu'a écrit l'utilisateur 1 par exemple grâce à length dans le code HTML lorsqu'il est sur sa page profil ayant un compte */
  // (`SELECT * FROM Comment WHERE author_id = 1`) Requête sur un aspect GENERAL // 
  const nbCommentaire = await query(`SELECT Comment.content, Comment.date, User.pseudo FROM Comment LEFT JOIN User ON Comment.author_id = User.id WHERE author_id = 1`)
  // console.log('nbCommentaire []', nbCommentaire)

  /* Requête SQL permet de filter les articles de l'utilisateur (Exemple: Permet de mentionner que les articles crée par l'utilisateur 1) */
  // (`SELECT * FROM Article WHERE author_id = 1`) Requête sur un aspect GENERAL //
  const recupArticle = await query(`SELECT Article.title, Article.description, Article.date, User.pseudo FROM Article LEFT JOIN User ON Article.author_id = User.id WHERE author_id = 1`)
  // console.log('recupArticle []', recupArticle)


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

  // Requête SQL UPDATE = MODIFICATION = EDITION D'IMAGE (Table User - Colonne Avatar - D'une personne précise id) //
  let sql = `UPDATE User
  SET avatar = '${ req.file.nomComplet }'
  WHERE id = ${ req.params.id };`

  // La Requête SQL "SELECT * FROM" est mise dans une constante suivi de l'invocation de sa fonction "Méthode Asynchrone" permettant de visionner la table dans la base de donnée MySQL - Fichier db.sql grâce à MySQL WORKBENCH) //
  // Execution de la Requête SQL SELECT ( "await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
  const userAvatar = await query(`SELECT id, pseudo, avatar FROM User WHERE id = ${ req.params.id }`)
  // console.log('User Avatar', userAvatar)


  /***************************************************************** CONDITION **********************************************************************************************************************************************************************************************************************************************************************/
  // Si userAvatar n'existe pas (Erreur) alors tu me renvoie l'URL '/profil' se situant dans le view. Sinon tu m'exécutes la function en rapport avec la changement d'image du compte profil //
  if (!userAvatar[0]) res.render('profil')
  else {
    // Valeur de la colonne de la Table User en rapport avec l'Upload Image de la page profil //
    await query(sql)

    // Mettre en relation l'Image du compte profil avec la session de l'Utilisateur //
    req.session.user.avatar = req.file.nomComplet

    // Permet de rediriger l'Utilisateur vers l'URL '/profil' se situant dans le view //
    res.render('profil', {
      // BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE OU FALSE) //
      noFooter: true
    })
  }

}



exports.newPassword = async (req, res) => {

  console.log('Controller Create New Mot de Passe', req.body, req.params)

  const newPassword = await query(`SELECT id, pseudo, password FROM User WHERE id = ${ req.params.id }`)

  if (!newPassword[0] && req.body.nouveau_password < 6) {
    res.render('profil', {
      error: 'Le mot de passe contient moins de 6 caractères'
    })
    
  } else {
    const hash = await bcrypt.hash(req.body.nouveau_password, 10)

    // Requête SQL UPDATE Modification Mot de Passe //
    let sql = `UPDATE User
    SET password = '${ hash }'
    WHERE id = ${ req.params.id };`
    // invocation de la constante hash dans la let sql à la place de nouveau_password afin de protéger le mot de passe lors de l'edit du nouveau mot de passe de l'Utilisateur //

    // Valeur des colonnes de la Table User qui sont écrit dans l'input du modal de changement de mot de passe du compte profil de l'Utilisateur - Method Asynchrone  //
    await query(sql, function (err, data, fields) {
      if (err) throw err;
      // res.render renvoi l'Utilisateur vers le fichier Handlebars/HTML 'profil' au moment de la validation du modal de changement de mot de passe du compte Utilisateur //
      res.render('profil', {
        noFooter:true,
        
        success: 'Votre mot de passe à bien été modifié !'
      })

    })

  }

}