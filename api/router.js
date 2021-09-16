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
    profilController = require('./controllers/profilController'),
    infoController = require('./controllers/infoController');

/*
 * Import des Middlewares
 * ********************** */  

// const test = require('./middleware/test')
// const isAdmin = require('./middleware/isAdmin')

// Route avec le middleware 'test'
// router.route('/')
    // .get(test, homeController.getPageHome)


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
 * presentationController
 ************************ */

// URL Page Presentation
router.route('/presentation')
    .get(presentationController.getPagePresentation)




/*
 * contactController
 ******************* */

/************** FORMULAIRE DE CONTACT DANS PAGE HOME + PAGE PRESENTATION ****************** */


// URL Page Formulaire Article (Page Home Formulaire de Contact)
router.route('/form-message')
    .post(contactController.formContact)


/*
 * legalnoticeController
 *********************** */

// URL Page Legal Notice
router.route('/legalnotice')
    .get(legalnoticeController.getPageLegalnotice)


/*
 * contactController
 ******************* */

/************** PAGE HOME + PAGE PRESENTATION****************** */


// URL Page Contact
router.route('/contact')
    .get(contactController.getPageContact)

// URL Page Formulaire Article (Page Home Formulaire de Contact)
router.route('/form-message')
    .post(contactController.formContact)




/*
 * blogController + ballonCOntroller
 *********************************** */

/********* PAGE BLOG + PAGE ARTICLE qui arrive suite au clic sur la card de la page BLOG *********/

// URL Page Blog
router.route('/blog')
    .get(blogController.getPageBlog)

// URL Page (article Page ID)
router.route('/ballon/:id')
    .get(ballonController.getPageBallonID)

// URL Page Formulaire Article (Page ID Ajout de nouveau commentaire sur l'Article)
router.route('/addcomment')
    .post(ballonController.addComment)



/*
 * blogController + adminController + contactController
 ****************************************************** */
/**********************PAGE ADMIN ********************* */

// URL Page Admin
router.route('/admin')
    .get(adminController.getPageAdmin)


// URL Page Formulaire Article (Page Admin Formulaire de Création d'Article (btnCreateArticle))
router.route('/article')
    .post(blogController.createArticle)


// URL Page Formulaire Edition Article (Page Admin Formulaire Edition ET Suppression d'Article (tableauArticle))
router.route('/article/:id')
    .put(blogController.editArticle)
    .delete(blogController.deleteArticle)


// URL Page Formulaire Edition Utilisateur (Page Admin Formulaire Edition ET Suppression d'Utilisateur (tableauUser))
router.route('/editer/:id')
    .put(adminController.editUser)
    .delete(adminController.deleteUser)


// URL Page Formulaire Message d'Utilisateur (Page Admin Suppression du Message (tableauMessage))
router.route('/message/:id')
    .delete(contactController.deleteMessage)




/*
 * authController + profilController
 * ********************************* */

/*************** PAGE REGISTER + PAGE LOGIN + PAGE PROFIL *************/
    
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

/*
 * profilController
 ****************** */

// URL Page Formulaire Connexion Compte Login
router.route('/connexion')
    .post(profilController.connexionProfil)

// URL Page Profil
router.route('/profil')
    .get(profilController.getPageProfil)


module.exports = router