import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AsynchronousOperationsService {
  constructor(private readonly httpService: HttpService) { }
  async downloadContentsFromUrls(urls: string[]): Promise<string[]> {
    try {
      const downloadPromises = urls.map(async (url) => {
        const response = await this.httpService.get(url, { responseType: 'arraybuffer' }).toPromise();

        // Convert the response data to base64
        const base64Data = Buffer.from(response.data).toString('base64');

        return base64Data;
      });

      return await Promise.all(downloadPromises);
    } catch (error) {
      console.error('Error downloading contents:', error.message);
      throw error;
    }
  }
}
