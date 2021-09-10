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
    loginController = require('./controllers/loginController'),
    registerController = require('./controllers/registerController'),
    legalnoticeController = require('./controllers/legalnoticeController'),
    ballonController = require('./controllers/ballonController'),
    adminController = require('./controllers/adminController'),
    profilController = require('./controllers/profilController'),
    infoController = require('./controllers/infoController');

/*
 * Import des Middlewares
 * ********************** */  
const test = require('./middleware/test')

/*
 * Déclaration des routes 
 ************************ */
    
// Route avec le middleware 'test'
// router.route('/')
    // .get(test, homeController.getPageHome)

// URL Page Home
router.route('/')
    .get(homeController.getPageHome)

// URL Page Blog
router.route('/blog')
    .get(blogController.getPageBlog)

// URL Page Presentation
router.route('/presentation')
    .get(presentationController.getPagePresentation)

// URL Page Contact
router.route('/contact')
    .get(contactController.getPageContact)

// URL Page Login
router.route('/login')
    .get(loginController.getPageLogin)

// URL Page Register
router.route('/register')
    .get(registerController.getPageRegister)

// URL Page Legal Notice
router.route('/legalnotice')
    .get(legalnoticeController.getPageLegalnotice)

// URL Page (Page ID)
router.route('/ballon/:id')
    .get(ballonController.getPageBallonID)

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

// URL Page Formulaire Message d'Utilisateur (Page Admin Formulaire Message Vision et Suppression du Message (tableauMessage))
router.route('/message/:id')
    .delete(contactController.deleteMessage)

// URL Page Formulaire Article (Page Home Formulaire de Contact)
router.route('/form-message')
    .post(contactController.formContact)

// URL Page Formulaire Article (Page ID Ajout de nouveau commentaire)
router.route('/addcomment')
    .post(ballonController.addComment)

// URL Page Profil
router.route('/profil')
    .get(profilController.getPageProfil)

// URL Page Info
router.route('/info')
    .get(infoController.getPageInfo)

// URL Page Connexion Compte Login
router.route('/connexion')
    .post(profilController.connexionProfil)

// URL Page Connexion Login Mot de Passe Oublié
router.route('/forget')
    .post(loginController.forgetProfil)

// URL Page Connexion Register Enregistrement Profil

router.route('/registerprofil')
    .post(registerController.registerProfil)


module.exports = router