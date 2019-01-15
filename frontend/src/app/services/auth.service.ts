import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  basiclogin(username: string, password: string): Observable<boolean> {
    console.log('CALLED');
    const url = 'http://localhost:8080/basiclogin';
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
    };
    return this.http.post(
      url,
      JSON.stringify({username: username, password: password}),
      httpOptions
    ).pipe(
        map(response => {
          const token = response['token'];
          if (token) {
            localStorage.setItem('token', token);
            return true;
          } else {
            return false;
          }
        }),
        catchError(err => {
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['loginbasic']);
  }
}
