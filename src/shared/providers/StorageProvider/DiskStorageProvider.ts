import uploadConfig from '@config/uploadConfig';
import * as fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {
  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.directory, file),
    );

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    // delete file;
    await fs.promises.unlink(filePath);
  }
}
