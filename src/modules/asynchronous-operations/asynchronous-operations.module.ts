import { Module } from '@nestjs/common';
import { AsynchronousOperationsService } from './asynchronous-operations.service';
import { AsynchronousOperationsController } from './asynchronous-operations.controller';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [AsynchronousOperationsController],
  providers: [AsynchronousOperationsService],
})
export class AsynchronousOperationsModule {}
