import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

import { Credentials } from '../classes/credentials'
import { AuthService } from '..//auth.sevice';
import { NotificationsService } from '../notifications.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: Credentials;
  constructor(private authService: AuthService, private notificationsService: NotificationsService, private router: Router) {
    this.loginUser = new Credentials('', '')
  }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    this.loginUser.email = form.value.login;
    this.loginUser.password = form.value.password;
    this.authService.loginUser(this.loginUser)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        this.notificationsService.error(error.message);
      });
  }

}
