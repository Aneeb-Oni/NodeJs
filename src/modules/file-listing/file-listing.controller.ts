import { Controller, Get, Param } from '@nestjs/common';
import { FileListingService } from './file-listing.service';
import {ApiTags} from "@nestjs/swagger";

@Controller('file-listing')
export class FileListingController {
  constructor(private readonly fileListingService: FileListingService) {}

  @ApiTags('file-listing')
  @Get(':directoryPath/:fileExtension')
  listFiles(
      @Param('directoryPath') directoryPath: string,
      @Param('fileExtension') fileExtension: string,
  ): string[] {
    return this.fileListingService.listFilesInDirectory(directoryPath, fileExtension);
  }
}
