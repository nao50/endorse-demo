import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

// Service
import { EndorseService } from '../services/endorse.service';

@Component({
  selector: 'app-login-token',
  templateUrl: './login-token.component.html',
  styleUrls: ['./login-token.component.scss']
})
export class LoginTokenComponent implements OnInit {
  loading = false;
  error = false;

  loginformgroup = new FormGroup({
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private endorseService: EndorseService,
  ) { }

  ngOnInit() {
  }

  getEndorseToken() {
    this.endorseService.getEndorseToken()
    .subscribe(result => {
      console.log('endorseToken: ', result.token);
      localStorage.setItem('endorseToken', result.token);
    });
  }

  tokenlogin() {
    this.loading = true;
    const endorseToken = localStorage.getItem('endorseToken');

    this.authService.tokenlogin(endorseToken)
    .subscribe(result => {
        if (result === true) {
          this.router.navigate(['app-token-top']);
        } else {
          this.loading = false;
          this.error = true;
        }
    });
  }

  logout() {
    this.authService.logout();
  }

}
