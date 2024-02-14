import { PartialType } from '@nestjs/swagger';
import { CreateFileListingDto } from './create-file-listing.dto';

export class UpdateFileListingDto extends PartialType(CreateFileListingDto) {}
