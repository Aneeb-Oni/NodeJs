import { Module } from '@nestjs/common';
import { ApiFetchService } from './api-fetch.service';
import { ApiFetchController } from './api-fetch.controller';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [ApiFetchController],
  providers: [ApiFetchService],
})
export class ApiFetchModule { }
