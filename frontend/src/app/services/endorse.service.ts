import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Model
import { EndorseToken } from '../models/endorsetoken.model';

@Injectable({
  providedIn: 'root'
})
export class EndorseService {

  constructor(
    private http: HttpClient,
  ) { }

  getEndorseToken(): Observable<EndorseToken>  {
    const endorseUrl = 'https://endorse.soracom.io';
    return this.http.get<EndorseToken>(endorseUrl);
  }
}
