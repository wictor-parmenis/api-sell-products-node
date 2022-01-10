import multer, { StorageEngine } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tempFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder,
  tempFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = uuidv4();

        const fileName = `${fileHash}-${file.originalname}`;

        callback(null, fileName);
      },
    }),
  },
  config: {
    dist: {},
    aws: {
      bucket: process.env.AWS_S3_BUCKET,
    },
  },
} as IUploadConfig;
