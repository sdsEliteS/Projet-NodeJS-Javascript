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

// Page Home
router.route('/')
    .get(homeController.getPageHome)

//Page Blog
router.route('/blog')
    .get(blogController.getPageBlog)

//Page Presentation
router.route('/presentation')
    .get(presentationController.getPagePresentation)

// Page Contact
router.route('/contact')
    .get(contactController.getPageContact)

// Page Login
router.route('/login')
    .get(loginController.getPageLogin)

// Page Register
router.route('/register')
    .get(registerController.getPageRegister)

// Page Legal Notice
router.route('/legalnotice')
    .get(legalnoticeController.getPageLegalnotice)

// Page (Page ID)
router.route('/ballon/:id')
    .get(ballonController.getPageBallonID)

// Page Admin
router.route('/admin')
    .get(adminController.getPageAdmin)

//Page Formulaire Article (Page Admin Formulaire de Création d'Article)
router.route('/article')
    .post(blogController.createArticle)

//Page Formulaire Article (Page Home Formulaire de Contact)
router.route('/formulaire')
    .post(homeController.formContact)

//Page Formulaire Article (Page Home Formulaire de Contact)
router.route('/formulaire2')
    .post(presentationController.formContact2)

//Page Formulaire Article (Page ID Ajout de nouveau commentaire)
router.route('/ajouter')
    .post(ballonController.commentaires)

// Page Profil
router.route('/profil')
    .get(profilController.getPageProfil)

// Page Info
router.route('/info')
    .get(infoController.getPageInfo)

module.exports = router