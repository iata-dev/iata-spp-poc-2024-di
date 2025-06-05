import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status: number;
    let message: string;
    let error: string;
    if (exception instanceof HttpException) {
      const exceptionResponse = exception?.getResponse();
      status = exception?.getStatus();
      if (Array.isArray(exceptionResponse['message'])) {
        message = exceptionResponse['message'][0];
      } else {
        message = exception.message;
      }
      error = exception.name;
    } else {
      const statusCode =
        exception?.response?.status || exception?.response?.statusCode || 500;
      const errorMessage =
        exception?.response?.data?.message ||
        exception?.response?.statusText ||
        exception?.response?.message ||
        exception?.cause?.message ||
        exception?.message ||
        'Internal Server Error';
      status = statusCode === 422 ? 400 : statusCode; // Internal Server Error
      message =
        errorMessage === 'Unprocessable Entity'
          ? 'A required parameter was missing in the request'
          : errorMessage;

      if (exception instanceof AxiosError) {
        error = exception?.code || AxiosError.name;
      } else {
        error = exception?.error || InternalServerErrorException.name;
      }
    }
    return response.status(status).json({
      message,
      error,
      statusCode: status,
    });
  }
}
