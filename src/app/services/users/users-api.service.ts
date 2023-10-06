import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { USERS_API_URL } from 'src/app/constants';
import {
  IUserApiLoginResponse,
  IUserCredentials,
  IUserProfile,
} from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private apiUrl = USERS_API_URL;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string>('');
  private email = new BehaviorSubject<string>('');

  constructor(private _http: HttpClient) {}

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get username$(): Observable<string> {
    return this.username.asObservable();
  }

  get email$(): Observable<string> {
    return this.email.asObservable();
  }

  signup(userProfile: IUserProfile): Observable<any> {
    return this._http.post(`${this.apiUrl}/adduser`, userProfile);
  }

  login(userCredentials: IUserCredentials): Observable<any> {
    return this._http.post(`${this.apiUrl}/login`, userCredentials);
  }

  logout(email: any): Observable<any> {
    console.log('aaa', email);
    return this._http.post(`${this.apiUrl}/logout`, email);
  }

  onSuccessfulLogin(user: IUserApiLoginResponse['user']) {
    this.isAuthenticated.next(true);
    this.username.next(user.firstName + ' ' + user.lastName);
    this.email.next(user.email);
  }

  onSuccessfulLogout() {
    this.isAuthenticated.next(false);
    this.username.next('');
  }
}
