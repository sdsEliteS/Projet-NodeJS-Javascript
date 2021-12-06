/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router();


/*
 * Import des Controllers
 * ********************** */
const homeController = require('./controllers/homeController'),
    blogController = require('./controllers/blogController'),
    presentationController = require('./controllers/presentationController'),
    contactController = require('./controllers/contactController'),
    authController = require('./controllers/authController'),
    legalnoticeController = require('./controllers/legalnoticeController'),
    ballonController = require('./controllers/ballonController'),
    adminController = require('./controllers/adminController'),
    profilController = require('./controllers/profilController')

/*
 * Middleware
 * ********** */
const upload = require('../config/multer')

/*
 * Middleware - Sécurité Panneatage Admin
 * ************************************** */
const isAdmin = require('./middleware/admin')


/*
 * Déclaration des routes 
 ************************ */


/*
 * homeController
 **************** */

// URL Page Home
router.route('/')
    .get(homeController.getPageHome)


/*
 * legalnoticeController
 *********************** */

// URL Page Legal Notice
router.route('/legalnotice')
    .get(legalnoticeController.getPageLegalnotice)


/*
 * presentationController
 ************************ */

// URL Page Presentation
router.route('/presentation')
    .get(presentationController.getPagePresentation)

/******************************************************************************************************************************/



/************************** FORMULAIRE DE CONTACT DANS LA PAGE HOME + PAGE PRESENTATION ***************************************/


// URL Page Formulaire (Page Home Formulaire de Contact)
router.route('/form-message')
    .post(contactController.formContact)



/******************************************************************************************************************************/



/******************* PAGE BLOG + PAGE ARTICLE qui arrive suite au clic sur la card de la page BLOG ****************************/

/*
 * blogController + ballonController
 *********************************** */

// URL Page Blog
router.route('/blog')
    .get(blogController.getPageBlog)

// URL Page (article Page ID)
router.route('/ballon/:id')
    .get(ballonController.getPageBallonID)

// URL Page Formulaire Article (Page ID Ajout de nouveau commentaire sur l'Article)
router.route('/addcomment')
    .post(ballonController.addComment)

// URL Suppression de Commentaire d'un article par l'Utilisateur
router.route('/delcomment/:id')
    .delete(ballonController.deleteComment)


/********************************************************** PAGE ADMIN **********************************************************/


/*
 * blogController + adminController + contactController
 ****************************************************** */


// URL Page Admin
router.route('/admin')
    .get(isAdmin, adminController.getPageAdmin)


// URL Page Formulaire d'Article (Page Admin Formulaire Modal de Création d'Article + Upload Dossier Image Article (btnCreateArticle))
router.route('/UploadArticle')
    .post(isAdmin, upload.single('imgArticle'),blogController.createArticle)


// URL Page Formulaire Edition et Suppression d'Article (Page Admin Formulaire Modal Edition + Upload Image Dossier Image ET Modal Suppression d'Article (tableauArticle))
router.route('/UploadArticle2/:id')
    .put(isAdmin, upload.single('imgArticle'),blogController.editArticle)
    .delete(isAdmin, blogController.deleteArticle)


// URL Page Formulaire Edition Utilisateur (Page Admin Formulaire Modal Edition ET Modal Suppression d'Utilisateur (tableauUser))
router.route('/editer/:id')
    .put(isAdmin, adminController.editUser)
    .delete(isAdmin, adminController.deleteUser)


// URL Page Formulaire Message d'Utilisateur (Page Admin Modal Suppression du Message (tableauMessage))
router.route('/message/:id')
    .delete(isAdmin, contactController.deleteMessage)




/********************************************* PAGE REGISTER + PAGE LOGIN + PAGE PROFIL ************************************** */


/*
 * authController + profilController
 * ********************************* */


// URL Page Login
router.route('/login')
    .get(authController.getPageLogin)

// URL Page Register
router.route('/register')
    .get(authController.getPageRegister)

// URL Page Connexion Login Mot de Passe Oublié
router.route('/forget')
    .post(authController.forgetProfil)

// URL Page Connexion Register Enregistrement Profil
router.route('/registerprofil')
    .post(authController.registerProfil)

// URL Page Formulaire Connexion PageLogin
router.route('/connexion')
    .post(authController.connexionProfil)


/*
 * profilController
 ****************** */

// URL Page Profil
router.route('/profil')
    .get(profilController.getPageProfil)

// URL Image Profil (ATTENTION !!! : avec un .post on peut faire un methode PUT)
router.route('/UploadAvatar/:id')
    .post(upload.single('imgArticle'),profilController.createAvatar)

// URL New Mot de Passe
router.route('/NewPassword/:id')
    .put(profilController.newPassword)


/* ************************************************* DESTROY DECONNEXION SESSION ***************************************************** */

/*
 * authController
 **************** */


// URL Deconnexion de la Session de l'Utilisateur
router.route('/logout')
    .get(authController.getDeconnexionProfil)


module.exports = router