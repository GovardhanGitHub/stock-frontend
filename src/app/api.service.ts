import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, public router: Router) {}

  authenticate(cred: any) {
    let url = this.API_URL + '/login';
    this.http.post(url, cred).subscribe((res: any) => {
      console.log(
        '🚀 ~ file: api.service.ts:23 ~ ApiService ~ this.http.post ~ res:',
        res
      );
      localStorage.setItem('auth', JSON.stringify(res['data']));
      this.router.navigate(['home/']);
    });
  }

  getUserProfile(refreshToken: any): Observable<any> {
    let api = `${this.API_URL}/getProfile`;
    return this.http.post(api, refreshToken).pipe(
      map((res: any) => {
        console.log(
          '🚀 ~ file: api.service.ts:36 ~ ApiService ~ map ~ res:',
          res
        );
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  get isLoggedIn(): boolean {
    let auth = localStorage.getItem('auth');
    return auth !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('auth');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
