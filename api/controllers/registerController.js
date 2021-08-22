/*
 * Controller Register
 * ******************* */

exports.getPageRegister = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('register', {
        noFooter: true
    });
}