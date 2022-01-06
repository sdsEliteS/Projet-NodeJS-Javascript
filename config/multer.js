const multer = require('multer'); // Import de Multer //

// Configuration de stockage de Multer
const storage = multer.diskStorage({

    // Stockage de nos fichiers images par default - Callback fonction de rappel timing précis //
    destination: function (req, file, callback) {
        callback(null, './public/images')
    },

    // Format du nom de l'image à stocker //
    filename: function (req, file, callback) {
        const nomComplet = Date.now() + '_' + file.originalname
        console.log('multer cb:', file)
        file.nomComplet = nomComplet
        callback(null, nomComplet)
    }

})
// Initialisation des paramètres de la configuration Multer //
const upload = multer({

    // On renseigne le stockage définit dans la constante storage //
    storage: storage, 

    // Taille et Proportion des fichiers //
    limits: {
        fileSize: 1 * 4098 * 4098,
        files: 1
    },

    // Filtre en configurant des types d'images accepter //
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/gif" ||
            file.mimetype === "image/jpeg" 
        ) {
            callback(null, true)
        } else {
            callback(null, false)
            callback(new Error('Le fichier doit être au format png, jpg, jpeg ou gif.'))
        }
    }
})
module.exports = upload // Exportation de upload afin de pouvoir l'appeler dans notre router.js //