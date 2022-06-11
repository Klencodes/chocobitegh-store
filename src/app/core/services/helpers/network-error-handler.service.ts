import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkErrorHandlerService {

  constructor() { }
  /**
   * Handle HttpReseponse errs.
   * @param err HttpErrorResponse
   * @returns JSON data of err with detail key
   */
  handleError(err: HttpErrorResponse) {
   if (err.status === 500) {
    return throwError(() => new Error('An error occurred connencting to server'))
   } else if (err.status === 415) {
      return throwError(() => new Error('An error occurred processing request'))
    } else if (err.status === 405) {
      return throwError(() => new Error('An error occurred processing request'))
    } else if (err.status === 403) {
      return throwError(() => new Error(err.error.message))
    } else if (err.status === 404) {
      return throwError(() => new Error(err.error.message))
    } else if (err.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return throwError(() => new Error('Your session has expired. Signing Out'))
    } else if (err.status > 415) {
      return throwError(() => new Error(err.error.message))
    } else if (err.status === 400) { 
      return throwError(() => new Error(err.error.message))
    }
    return  throwError(() => new Error('You are offline, Check your internet connection!!'));
  }
}