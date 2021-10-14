// Import de Multer //
const multer = require('multer');

// Permet de travailler avec des chemins de fichiers //
const path = require('path');

// Configuration de stockage de Multer
const storage = multer.diskStorage({

    // Stockage de nos fichiers images par default - cb = Callback fonction de rappel timing précis //
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },

    // Format du nom de l'image à stocker //
    filename: function (req, file, cb) {
      
    }

}

)