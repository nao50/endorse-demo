import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Service
import { EndorseService } from './endorse.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private endorseService: EndorseService,
  ) { }

  basiclogin(username: string, password: string): Observable<boolean> {
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

  tokenlogin(): Observable<boolean> {
    this.endorseService.getEndorseToken()
    .subscribe(result => {
      console.log(result);
    });

    const url = 'http://localhost:8080/tokenlogin';
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'eyJraWQiOiJ2MS1mMmZlYTA2MGI5M2Y1MTBiZmI3MjJmMmNkNGIzNzc0ZS14NTA5LnBlbSIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJodHRwczovL3NvcmFjb20uaW8iLCJhdWQiOiJzb3JhY29tLWVuZG9yc2UtYXVkaWVuY2UiLCJleHAiOjE1NDc4NDAxOTEsImp0aSI6InRXZE90Y3dSemMxOV9CT3pSVjBLWkEiLCJpYXQiOjE1NDc3ODAxOTEsIm5iZiI6MTU0Nzc4MDEzMSwic3ViIjoic29yYWNvbS1lbmRvcnNlIiwic29yYWNvbS1lbmRvcnNlLWNsYWltIjp7Imltc2kiOiI0NDAxMDMxOTgyNTI4NzkiLCJpbWVpIjoiMzU5Njc1MDcwMjAzNjk2IiwibXNpc2RuIjoiODEyMDE2MDU5MjA4IiwicmVxdWVzdFBhcmFtZXRlcnMiOnsic2Vzc2lvbl9pZCI6IjAxMjM0NSJ9fX0.Y4719kIfRJv3R04E_u6NlnNDkg0SxAShxQdcUdhaccN1egx_Xd9sZvLvN2J2shL-yA7Rd4rjiKjQd6zgL0Ak3nSSByT2mgSrkTpEWCO58PDYoYJMrulCCXzBYO0gRCJPZiMAjA2UBTVwz1qLAIw2YnGjV2h320EUHkeV4Q5vSSWfULY31wAxbnGJJygw4S_xB3SCZ5tbQrtS54YYit4n_6h9oYInU99wtoaUhPPQ5fnbLE3qmqQkeD7RvtjzsHDsUKQqhHKN8r8Ne8Somk-kHgYe00Wjrm8OWTNzpG2Gs0TgaZoGUmkO4rolPS6UPY-eMLouuK7GvwZkPy9Xmf2BuQ'
      })
    };
    return this.http.post(
      url,
      JSON.stringify({dummy: 'dummy body message'}),
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
