import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Model
import { EndorseToken } from '../models/endorsetoken.model';

@Injectable({
  providedIn: 'root'
})
export class EndorseService {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  getEndorseToken(): Observable<EndorseToken>  {
    const endorseUrl = 'https://endorse.soracom.io';
    return this.http.get<EndorseToken>(endorseUrl);
  }
}
