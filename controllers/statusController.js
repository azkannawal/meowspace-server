const Status = require('../models/status');
const User = require('../models/user');
const Cat = require('../models/cat');
const { uploader } = require('../utils/cloudinary');
const fs = require('fs');

exports.createStatus = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Konten status wajib diisi' });

    let photoUrl = null;
    if (req.file) {
      const result = await uploader.upload(req.file.path, { folder: 'statuses' });
      photoUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const status = await Status.create({
      content,
      userId: req.userId,
      photoUrl,
    });

    res.status(201).json({ message: 'Status dibuat', status });
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat status', error: err.message });
  }
};

exports.getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll({
  include: [
    {
      model: User,
      attributes: ['id', 'fullName', 'email'],
      include: [
        {
          model: Cat,
          attributes: ['id', 'name', 'username', 'birthDate', 'photoUrl', 'gender', 'breed'],
        }
      ]
    }
  ],
  order: [['createdAt', 'DESC']],
});


    res.status(200).json(statuses);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil status', error: err.message });
  }
};


exports.deleteStatus = async (req, res) => {
  try {
    const status = await Status.findByPk(req.params.id);
    if (!status) return res.status(404).json({ message: 'Status tidak ditemukan' });
    if (status.userId !== req.userId) return res.status(403).json({ message: 'Tidak diizinkan menghapus status ini' });

    await status.destroy();
    res.json({ message: 'Status dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus status', error: err.message });
  }
};
