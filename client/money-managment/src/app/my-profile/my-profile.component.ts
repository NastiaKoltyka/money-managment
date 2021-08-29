import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.sevice';
import { User } from '../classes/user';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { PasswordPopupComponent } from '../password-popup/password-popup.component';
import { ConfirmPopupDialogComponent } from '../confirm-popup.dialog/confirm-popup.dialog.component';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user: User;
  changeName:boolean;
  changeSurName:boolean;
  changeEmail:boolean;
  constructor(private authService: AuthService, private location: Location, public dialog: MatDialog) {
    this.user = this.authService.user;
    this.changeName=false;
    this.changeSurName=false;
    this.changeEmail=false;
  }

  ngOnInit(): void {
  }
  backClicked() {
    this.location.back();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PasswordPopupComponent, {
      width: '300px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Result: ', result);
    });
  }
  openChangeDialog(fieldName: string): void {
    const dialogRef = this.dialog.open(ConfirmPopupDialogComponent, {
      width: '300px',
      maxWidth: '300px',
      data: fieldName
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        switch (fieldName) {
          case 'name':
           this.changeName=true;
            break;
          case 'surname':
            this.changeSurName=true;
            break;
          case 'email':
            this.changeEmail=true;
            break;
        }
      }else{
        console.log('ayayay')
      }
    });
  }
}
