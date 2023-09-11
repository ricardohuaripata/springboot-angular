import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserLogin } from '../interfaces/user-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logoutSubject = new Subject<boolean>();
  loginSubject = new Subject<User>();
  private serverUrl: string;
  private authToken?: string | null;
  private authUser?: User | null;
  private principal?: string | null;
  private jwtService = new JwtHelperService();

  constructor(private httpClient: HttpClient) {
    // URL del servidor backend
    this.serverUrl = environment.serverURL;
  }

  login(
    userLogin: UserLogin
  ): Observable<HttpResponse<User> | HttpErrorResponse> {
    return this.httpClient.post<User>(`${this.serverUrl}/login`, userLogin, {
      observe: 'response',
    });
  }

  logout(): void {
    this.authToken = null;
    this.authUser = null;
    this.principal = null;
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    this.logoutSubject.next(true);
  }

  storeTokenInCache(authToken: string): void {
    if (authToken != null && authToken != '') {
      this.authToken = authToken;
      localStorage.setItem('authToken', authToken);
    }
  }

  loadAuthTokenFromCache(): void {
    this.authToken = localStorage.getItem('authToken');
  }

  getAuthTokenFromCache(): string {
    return localStorage.getItem('authToken')!;
  }

  storeAuthUserInCache(authUser: User): void {
    if (authUser != null) {
      this.authUser = authUser;
      localStorage.setItem('authUser', JSON.stringify(authUser));
    }
    this.loginSubject.next(authUser);
  }

  getAuthUserFromCache(): User {
    return JSON.parse(localStorage.getItem('authUser')!);
  }

  isUserLoggedIn(): boolean {
    this.loadAuthTokenFromCache();

    if (this.authToken != null && this.authToken != '') {
      if (this.jwtService.decodeToken(this.authToken).sub != null || '') {
        if (!this.jwtService.isTokenExpired(this.authToken)) {
          this.principal = this.jwtService.decodeToken(this.authToken).sub;
          return true;
        }
      }
    }

    this.logout();
    return false;
  }
}
