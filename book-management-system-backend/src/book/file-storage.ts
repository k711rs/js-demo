import * as multer from 'multer';
import * as fs from 'fs';
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync('./src/db/data/uploads', {
        recursive: true,
      });
    } catch (e) {
      console.log(e);
    }
    cb(null, './src/db/data/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});
