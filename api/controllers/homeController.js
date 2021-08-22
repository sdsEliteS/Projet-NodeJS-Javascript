/*
 * Controller home
 * *************** */

exports.getPageHome = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('home');
}