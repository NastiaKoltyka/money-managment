import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.sevice';
import { User } from '../classes/user';
import {Location} from '@angular/common';

import {MatDialog } from '@angular/material/dialog';
import { PasswordPopupComponent } from '../password-popup/password-popup.component';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user:User;
  constructor( private authService:AuthService, private location: Location, public dialog: MatDialog) { 
    this.user=this.authService.user;
  }

  ngOnInit(): void {
  }
  backClicked() {
    this.location.back();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PasswordPopupComponent, {
      width: '250px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Result: ', result);
      /*this.user.password = result;*/
    });
  }
}
