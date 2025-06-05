import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable, of } from 'rxjs';

@Injectable()
export class SharedStubService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async postApiCall() {
    return of();
  }

  async getApiCall(): Promise<Observable<any>> {
    return of();
  }
}
