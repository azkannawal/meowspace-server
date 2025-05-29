const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
    console.log('Received file mimetype:', file.mimetype);
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/*', 'application/octet-stream'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File harus berupa gambar (jpg/png)'), false);
  }

  console.log('Uploaded file mimetype:', file.mimetype);
};

module.exports = multer({ storage, fileFilter });
