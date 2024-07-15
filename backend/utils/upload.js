const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'image-menu-'+req.params.id+''+path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const deleteFile = (file) => {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
        throw new Error("Failed to delete file");
      }
    });
  };

module.exports = upload, deleteFile