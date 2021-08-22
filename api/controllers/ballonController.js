/*
 * Controller Page ID (ballon)
 * *************************** */

// Renvoi au dossier tableau ballon.json //
const ballonList = require('../ballon.json')

exports.getPageBallonID = (req, res) => {
    console.log('Controller Ballon ID', req.params.id)

    const ballon = ballonList[req.params.id -1]

    // Par default intégration layout main => {{{ body }}} - (Page View)
    res.render('ballon', { ballon });
}