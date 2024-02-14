import { Module } from '@nestjs/common';
import { FileListingService } from './file-listing.service';
import { FileListingController } from './file-listing.controller';

@Module({
  controllers: [FileListingController],
  providers: [FileListingService],
})
export class FileListingModule {}
