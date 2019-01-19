import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

import { Data } from '../models/data.model';

@Component({
  selector: 'app-token-top',
  templateUrl: './token-top.component.html',
  styleUrls: ['./token-top.component.scss']
})
export class TokenTopComponent implements OnInit {
  data: Data;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getTokenData();
  }

  getTokenData() {
    this.dataService.getTokenData().subscribe(
      result => {
        this.data = result;
      },
      error => {
        switch (error.status) {
          // case 400:
          // case 401:
          default:
            this.authService.logout();
            break;
        }
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
