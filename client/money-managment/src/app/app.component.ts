import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.sevice';
import { User } from './classes/user';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'money-managment';
  date:string;
  user: User;
  visible: boolean;
  sideBarOpened:boolean;
  constructor(public router: Router, public authService: AuthService ) { 
    this.date=moment().format('DD.MM.YYYY');
    this.user = authService.user;
    this.visible = false;
    this.sideBarOpened = false;
    authService.userRefresh.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
    this.sideBarOpened = false;
    this.visible = false;

  }
  openSidebar() {
    this.visible = true;
    setTimeout(() => {this.sideBarOpened = true;}, 100);
  }
  closeSidebar() {
    this.sideBarOpened = false;
    setTimeout(() => {this.visible = false;}, 500);
  }
}
