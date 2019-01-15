import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-basic',
  templateUrl: './login-basic.component.html',
  styleUrls: ['./login-basic.component.scss']
})
export class LoginBasicComponent implements OnInit {
  loading = false;
  error = false;

  loginformgroup = new FormGroup({
    'username': new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(72),
    ]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  basiclogin() {
    this.loading = true;
    this.authService.basiclogin(this.loginformgroup.value.username, this.loginformgroup.value.password)
    .subscribe(result => {
        if (result === true) {
          this.router.navigate(['top']);
        } else {
          this.loading = false;
          this.error = true;
        }
      }
    );
  }


  logout() {
    this.authService.logout();
  }

}
