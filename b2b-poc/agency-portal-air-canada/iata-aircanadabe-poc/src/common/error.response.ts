import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorResponse {
  @ApiProperty({
    description:
      'A message providing more details about the error. Typically describes an unexpected condition that occurred on the server while processing the request.',
    example:
      'The server encountered an unexpected condition that prevented it from fulfilling the request',
  })
  message: string;

  @ApiProperty({
    description:
      'The type of error or exception that occurred. In this case, it represents a generic internal server error exception.',
    example: 'InternalServerErrorException',
  })
  error: string;

  @ApiProperty({
    description:
      'The HTTP status code associated with the error. For internal server errors, this is typically 500.',
    example: 500,
  })
  statusCode: number;
}

export class BadRequestResponse {
  @ApiProperty({
    description:
      'A message providing details about why the request was considered bad. This could indicate missing or invalid parameters, for instance.',
    example: 'A required parameter was missing in the request',
  })
  message: string;

  @ApiProperty({
    description:
      'The error type or category that explains the issue. In this case, it refers to a bad request due to invalid input or missing parameters.',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description:
      'The HTTP status code for the error. A 400 status code typically signifies a bad request.',
    example: 400,
  })
  statusCode: number;
}

export class UnAuthorizedResponse {
  @ApiProperty({
    description:
      'A message providing details about why the resource could not have access. This may refer to missing endpoints or unavailable resources.',
    example: 'Access denied, Please contact your agency admin',
  })
  message: string;

  @ApiProperty({
    description:
      'The error type indicating that the requested resource could not have access or permission. In this case, it refers to a "UnauthorizedException" error.',
    example: 'UnauthorizedException',
  })
  error: string;

  @ApiProperty({
    description:
      'The HTTP status code for the error. A 401 status code typically indicates that the requested resource was not have permission.',
    example: 401,
  })
  statusCode: number;
}
