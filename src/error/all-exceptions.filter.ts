import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  // private readonly logger = new Logger('ExceptionsHandler', { timestamp: true })
  private defaultMessage = 'Something went wrong';
  // map error names to HTTP statuses and custom messages
  private errorStatusMap = {
    ValidationError: { status: HttpStatus.BAD_REQUEST, message: 'Validation failed' },
    CastError: { status: HttpStatus.BAD_REQUEST, message: 'Invalid data format' },
    DocumentNotFoundError: { status: HttpStatus.NOT_FOUND, message: 'Requested document does not exist' },
    ForbiddenError: { status: HttpStatus.FORBIDDEN, message: 'You do not have permission to access this resource' },
    StrictModeError: { status: HttpStatus.BAD_REQUEST, message: 'Invalid fields in request' },
    TokenExpiredError: { status: HttpStatus.UNAUTHORIZED, message: 'JWT Token expired' },
    JsonWebTokenError: { status: HttpStatus.BAD_REQUEST },
    String: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: this.defaultMessage },
    Object: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: this.defaultMessage },
    TypeError: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: this.defaultMessage },
    MongoServerError: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: this.defaultMessage },
    // Add custom application-specific errors here
  };
  

  catch(exception: unknown, host: ArgumentsHost) {
    Logger.error(exception)
    console.log('error => ', exception);
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const requestUrl = request.url;
  
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';
    let error = exception.constructor.name || 'Internal Server Error';
    
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || message;
        // Update error based on the actual error or default to a general error message
        error = exception.constructor.name;
      } else {
        message = exceptionResponse.toString();
        error = (exceptionResponse as any).error || error;; // This could be updated based on how you want to handle string responses
      }
    } else if (exception instanceof Error) {
      // Check if it matches known error names for dynamic handling
      const errorDetails = this.errorStatusMap[exception.name];
      if (errorDetails) {
        status = errorDetails.status;
        message = errorDetails?.message || exception.message;
        error = message === this.defaultMessage ? 'InternalServerErrorException' : exception.name; // Maintain the original error name
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR; 
        message = this.defaultMessage
      }
    } 
  
    response.status(status).json({
      success: false,
      error,
      message,
      // path: request.url
    });
  }
  
}
