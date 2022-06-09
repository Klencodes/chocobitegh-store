import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalAuthService } from '../services/helpers/local-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localAuth: LocalAuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== undefined && authHeader !== null && authHeader !== '' && authHeader === 'Token') {
      const cloneReq = request.clone({
        headers: request.headers.set('Authorization', 'Token ' + this.localAuth.userObj.auth_token)
      });
      return next.handle(cloneReq);
    }
    return next.handle(request);
  }
}
