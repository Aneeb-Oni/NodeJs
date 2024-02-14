import { Controller, Get } from '@nestjs/common';
import { AsynchronousOperationsService } from './asynchronous-operations.service';

@Controller('asynchronous-operations')
export class AsynchronousOperationsController {
  constructor(private readonly asynchronousOperationsService: AsynchronousOperationsService) {}

  @Get('download')
  async downloadContents() {
    const urlsToDownload = [
      'https://picsum.photos/id/237/200/300',
    ];

    try {
      const downloadedContents = await this.asynchronousOperationsService.downloadContentsFromUrls(urlsToDownload);
      return { downloadedContents };
    } catch (error) {
      return { error: 'Failed to download contents' };
    }
  }
}
