/*
 * Controller Presentation
 * *********************** */

exports.getPagePresentation = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('presentation');
}