import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.sevice';
import { User } from './classes/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-system';
  date:Date;
  user: User;
  constructor(public router: Router, public authService: AuthService ) { 
    this.date=new Date();
    this.user = authService.user;
  }

  logout(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
