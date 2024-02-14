import { PartialType } from '@nestjs/swagger';
import { CreateAsynchronousOperationDto } from './create-asynchronous-operation.dto';

export class UpdateAsynchronousOperationDto extends PartialType(CreateAsynchronousOperationDto) {}
