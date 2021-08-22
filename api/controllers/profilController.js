/*
 * Controller Page Profil
 * ********************** */

exports.getPageProfil = (req, res) => {

       // Par default intégration layout main => {{{ body }}} - (Page View)
       res.render('profil', {
        noFooter: true
    });
}