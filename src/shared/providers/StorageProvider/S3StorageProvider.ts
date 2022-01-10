import uploadConfig from '@config/uploadConfig';
import * as fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import { AppError } from '@shared/errors/AppError';

export default class S3StorageProvider {
  private client: S3;
  constructor() {
    this.client = new aws.S3({
      region: `${process.env.AWS_REGION}`,
    });
  }
  async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tempFolder, file);

    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new AppError('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
