import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, pipe, throwError } from 'rxjs';

export const errorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError(handleErrorResponse));
};

function handleErrorResponse(error: HttpErrorResponse) {
  const errorResponse = `Error status: ${error.status} - Error message: ${error.message}`;
  return throwError(() => errorResponse);
}
