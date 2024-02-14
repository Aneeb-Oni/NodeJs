import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ResendVerificationDto {
  @ApiProperty({ type: String, required: true })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string = '';
}
