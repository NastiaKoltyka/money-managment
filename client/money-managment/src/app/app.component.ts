import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.sevice';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-system';
  date:number;
  constructor(public router: Router, public authService: AuthService ) { 
    this.date=Date.now();
  }
}
