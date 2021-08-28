import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.sevice';
import { User } from '../classes/user';
import {Location} from '@angular/common';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user:User;
  constructor( private authService:AuthService, private _location: Location) { 
    this.user=this.authService.user;
  }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }
}
