import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AsynchronousOperationsService {
  constructor(private readonly httpService: HttpService) {}
  async downloadContentsFromUrls(urls: string[]): Promise<string[]> {
    try {
      const downloadPromises = urls.map(async (url) => {
        const response = await this.httpService.get(url).toPromise();
        return response.data;
      });

      return await Promise.all(downloadPromises);
    } catch (error) {
      console.error('Error downloading contents:', error.message);
      throw error;
    }
  }
}
