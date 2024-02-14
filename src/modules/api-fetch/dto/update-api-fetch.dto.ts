import { PartialType } from '@nestjs/swagger';
import { CreateApiFetchDto } from './create-api-fetch.dto';

export class UpdateApiFetchDto extends PartialType(CreateApiFetchDto) {}
