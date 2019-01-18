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
  endorseToken = '';

  loginformgroup = new FormGroup({
    // 'username': new FormControl('', [
    //   Validators.required,
    //   Validators.maxLength(255),
    // ]),
    // 'password': new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(5),
    //   Validators.maxLength(72),
    // ]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private endorseService: EndorseService,
  ) { }

  ngOnInit() {
  }

  tokenlogin() {
    this.loading = true;

    this.endorseService.getEndorseToken()
    .subscribe(result => {
      this.endorseToken = result.token;

      // console.log(this.endorseToken);

      this.authService.tokenlogin(this.endorseToken)
      .subscribe(result2 => {
          if (result2 === true) {
            this.router.navigate(['top']);
          } else {
            this.loading = false;
            this.error = true;
          }
        }
      );
    });

    // this.authService.tokenlogin()
    // .subscribe(result => {
    //     if (result === true) {
    //       this.router.navigate(['top']);
    //     } else {
    //       this.loading = false;
    //       this.error = true;
    //     }
    //   }
    // );

  }


  logout() {
    this.authService.logout();
  }

}
