import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileListingService {
  listFilesInDirectory(directoryPath: string, fileExtension: string): string[] {
    try {
      // Read the contents of the directory
      const files = fs.readdirSync(directoryPath);

      // Filter files by the specified extension
      const filteredFiles = files.filter(file => path.extname(file) === `.${fileExtension}`);

      // Return the list of matching files
      return filteredFiles;
    } catch (error) {
      console.error('Error reading directory:', error.message);
      throw error;
    }
  }
}