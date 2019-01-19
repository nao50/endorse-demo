import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getTokenData(): Observable<Data>  {
    const  dataUrl = 'http://localhost:8080/token/hello';
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.get<Data>(dataUrl, httpOptions);
  }

  logout() {
    this.authService.logout();
  }
}
