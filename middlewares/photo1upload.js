const multer = require('multer');

mimeTypes = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let err = new Error('Not right file type');
    const isValid = mimeTypes[file.mimetype];
    if(isValid) {
      err = null;
    }
    cb(err, 'images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = mimeTypes[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  },
});

module.exports =  multer({storage: storage}).array('images');
