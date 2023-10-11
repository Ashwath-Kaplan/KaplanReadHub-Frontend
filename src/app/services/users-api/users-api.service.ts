import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { USERS_API_URL } from 'src/app/constants';
import {
  IGetUserApiResponse,
  IUser,
  IUserApiLoginResponse,
  IUserApiResponse,
  IUserCredentials,
  IUserProfile,
} from 'src/app/interfaces';
import { AuthenticationService } from '../auth/authentication.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private usersApiUrl = USERS_API_URL;

  private userSubject = new BehaviorSubject<IUser | null>(null);
  userData$ = this.userSubject.asObservable();

  updateUserData(userData: IUser) {
    this.userSubject.next(userData);
  }

  clearUserData() {
    this.userSubject.next(null);
  }

  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService
  ) {}

  getUser(): Observable<IGetUserApiResponse> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this._authService.getToken(),
    });
    return this._http.get<IGetUserApiResponse>(`${this.usersApiUrl}/getuser`, {
      headers,
    });
  }

  signup(userProfile: IUserProfile): Observable<IUserApiResponse> {
    return this._http.post<IUserApiResponse>(
      `${this.usersApiUrl}/adduser`,
      userProfile
    );
  }

  login(userCredentials: IUserCredentials): Observable<IUserApiLoginResponse> {
    return this._http.post<IUserApiLoginResponse>(
      `${this.usersApiUrl}/login`,
      userCredentials
    );
  }

  logout(email: any): Observable<IUserApiResponse> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this._authService.getToken(),
    });
    return this._http.post<IUserApiResponse>(
      `${this.usersApiUrl}/logout`,
      email,
      {
        headers,
      }
    );
  }
}
