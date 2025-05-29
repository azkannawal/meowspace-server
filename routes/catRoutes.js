const express = require('express');
const router = express.Router();
const catController = require('../controllers/catProfileController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/catProfileMiddleware');
const multer = require('multer');


router.post('/catprofile', authMiddleware, (req, res, next) => {
  const uploadMiddleware = upload.single('photo');

  uploadMiddleware(req, res, function (err) {
    if (err instanceof multer.MulterError || err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'File foto wajib diupload' });
    }
    next();
  });
}, catController.createCat);

router.get('/catprofile', authMiddleware, catController.getCatsByUser);

module.exports = router;
