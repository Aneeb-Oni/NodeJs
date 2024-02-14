import { Controller, Get, Param } from '@nestjs/common';
import { ApiFetchService } from './api-fetch.service';
import { ApiTags } from "@nestjs/swagger";

@Controller('error-handling')
export class ApiFetchController {
  constructor(private readonly apiFetchService: ApiFetchService) { }

  @ApiTags('error-handling')
  @Get(':endpoint')
  async fetchData(@Param('endpoint') endpoint: string): Promise<any> {
    try {
      const data = await this.apiFetchService.fetchDataFromApi(endpoint);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch data from the API.' };
    }
  }
}
