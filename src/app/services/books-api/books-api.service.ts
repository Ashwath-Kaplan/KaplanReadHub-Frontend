import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BOOKS_API_URL } from 'src/app/constants';
import { IGetBooksApiResponse } from 'src/app/interfaces';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class BooksApiService {
  private booksApiUrl = BOOKS_API_URL;

  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService
  ) {}

  getBooks(pageSize: number, offset: number): Observable<IGetBooksApiResponse> {
    const params = new HttpParams()
      .set('pageIndex', offset.toString())
      .set('pageSize', pageSize.toString());

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this._authService.getToken(),
    });

    return this._http.get<IGetBooksApiResponse>(
      `${this.booksApiUrl}/getbooks`,
      { headers, params }
    );
  }
}
