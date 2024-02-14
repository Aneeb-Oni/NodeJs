import { Controller, Get } from '@nestjs/common';
import { AsynchronousOperationsService } from './asynchronous-operations.service';

@Controller('asynchronous-operations')
export class AsynchronousOperationsController {
  constructor(private readonly asynchronousOperationsService: AsynchronousOperationsService) {}

  @Get('download')
  async downloadContents() {
    const urlsToDownload = [
      'https://example.com/api/data1',
      'https://example.com/api/data2',
      'https://example.com/api/data3',
    ];

    try {
      const downloadedContents = await this.asynchronousOperationsService.downloadContentsFromUrls(urlsToDownload);
      return { downloadedContents };
    } catch (error) {
      return { error: 'Failed to download contents' };
    }
  }
}
