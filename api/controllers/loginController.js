/*
 * Controller Login
 * **************** */

exports.getPageLogin = (req, res) => {
    
    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('login', {
        // Envoi de variable dans notre front
        maVariable: 'Ma Super Variable',
        noFooter: true
    });
}