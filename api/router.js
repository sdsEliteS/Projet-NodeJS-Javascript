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
 * Déclaration des routes 
 ************************ */

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

//Page Formulaire Article (Page Admin)
router.route('/article')
    .post(blogController.createArticle)

// Page Profil
router.route('/profil')
    .get(profilController.getPageProfil)

// Page Info
router.route('/info')
    .get(infoController.getPageInfo)

module.exports = router