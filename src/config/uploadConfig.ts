import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = uuidv4();

      const fileName = `${fileHash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
