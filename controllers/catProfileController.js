const Cat = require('../models/cat');
const { uploader } = require('../utils/cloudinary');

exports.createCat = async (req, res) => {
  try {
    const { name, username, birthDate, gender, breed } = req.body;

    if (!req.file) return res.status(400).json({ message: 'Foto kucing wajib diupload' });

    const result = await uploader.upload(req.file.path, { folder: 'cats' });

    const cat = await Cat.create({
      name,
      username,
      birthDate,
      gender,
      breed,
      photoUrl: result.secure_url,
      userId: req.userId,
    });

    res.status(201).json({ message: 'Profil kucing berhasil dibuat', cat });
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat profil kucing', error: err.message });
  }
};

exports.getCatsByUser = async (req, res) => {
  try {
    const cats = await Cat.findAll({ where: { userId: req.userId } });
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data kucing', error: err.message });
  }
};
