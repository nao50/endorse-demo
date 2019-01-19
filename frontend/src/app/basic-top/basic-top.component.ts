import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-basic-top',
  templateUrl: './basic-top.component.html',
  styleUrls: ['./basic-top.component.scss']
})
export class BasicTopComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
