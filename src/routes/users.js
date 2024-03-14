const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserController = require('../controllers/UserController');
const { isAdmin } = require('../middleware/authMiddleware');

// Configurar Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'profileImage') {
      cb(null, 'uploads/profiles');
    } else if (file.fieldname === 'productImage') {
      cb(null, 'uploads/products');
    } else {
      cb(null, 'uploads/documents');
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Endpoint para subir documentos
router.post('/:uid/documents', upload.array('documents'), UserController.uploadDocuments);

// Endpoint para cambiar el rol de usuario a premium
router.put('/premium/:uid', isAdmin, UserController.updateToPremium);

module.exports = router;