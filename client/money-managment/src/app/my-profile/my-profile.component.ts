import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.sevice';
import { User } from '../classes/user';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
user:User;
  constructor( private authService: AuthService) { 
    this.user=this.authService.user;
  }

  ngOnInit(): void {
  }

}
