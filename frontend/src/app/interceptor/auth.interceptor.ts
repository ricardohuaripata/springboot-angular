import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private serverUrl = environment.serverURL;

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes(`${this.serverUrl}/login`)) {
      return next.handle(request);
    }

    const authToken = this.authService.getAuthTokenFromCache();
    const newRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });
    return next.handle(newRequest);
  }
}
