import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";

@Injectable()
export class ApiFetchService {
  private readonly logger = new Logger(ApiFetchService.name);

  constructor(private readonly httpService: HttpService) {}

  async fetchDataFromApi(apiEndpoint: string): Promise<any> {
    try {
      const response = await this.httpService.get(apiEndpoint).toPromise();
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error; // Rethrow the error to propagate it further
    }
  }

  private handleApiError(error: any): void {
    if (error.response) {
      // The request was made and the server responded with a status code
      this.logger.error(`API Error - Status: ${error.response.status}, Data:`, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      this.logger.error('API Error - No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      this.logger.error('API Error - Request setup error:', error.message);
    }
  }
}
