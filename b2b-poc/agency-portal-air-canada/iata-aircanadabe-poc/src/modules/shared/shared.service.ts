import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { GetApiCallOptions, PostApiCallOptions } from '../../common/interface';

@Injectable()
export class SharedService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async postApiCall<T>(
    url: string,
    payload: any,
    options: PostApiCallOptions = {},
  ): Promise<T> {
    try {
      // Making the POST request and mapping the response to return the data
      return await lastValueFrom(
        this.httpService
          .post<T>(url, payload, { headers: options.headers })
          .pipe(map((response: AxiosResponse<T>): T => response.data)),
      ); // Return the actual data
    } catch (error: any) {
      console.error(error);
      // Handle errors here with more robust error handling
      const errorMessage: any =
        error.response?.data?.message || error.message || 'Unknown error';
      throw new HttpException(
        `Failed to make POST request: ${errorMessage}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getApiCall<T>(
    url: string,
    options: GetApiCallOptions = {},
  ): Promise<T> {
    try {
      // Making the GET request and mapping the response to return the data
      return await lastValueFrom(
        this.httpService
          .get<T>(url, { headers: options.headers })
          .pipe(map((response: AxiosResponse<T>): T => response.data)),
      ); // Return the actual data
    } catch (error: any) {
      console.log(error);
      // Handle errors here with more robust error handling
      const errorMessage: any =
        error.response?.data?.message || error.message || 'Unknown error';
      throw new HttpException(
        `Failed to make GET request: ${errorMessage}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteApiCall<T>(
    url: string,
    options: GetApiCallOptions = {},
  ): Promise<T> {
    try {
      // Making the DELETE request and mapping the response to return the data
      return await lastValueFrom(
        this.httpService
          .delete<T>(url, { headers: options.headers })
          .pipe(map((response: AxiosResponse<T>): T => response.data)),
      ); // Return the actual data
    } catch (error: any) {
      console.log(error);
      // Handle errors here with more robust error handling
      const errorMessage: any =
        error.response?.data?.message || error.message || 'Unknown error';
      throw new HttpException(
        `Failed to make DELETE request: ${errorMessage}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
