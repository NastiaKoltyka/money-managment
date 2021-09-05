import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.sevice';
import { User } from '../classes/user';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PasswordPopupComponent } from '../password-popup/password-popup.component';
import { ConfirmPopupDialogComponent } from '../confirm-popup.dialog/confirm-popup.dialog.component';
import { PicturePikerComponent } from '../picture-piker/picture-piker.component';
import { HttpService } from '../http.sevice';
import { NotificationsService } from '../notifications.service';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  user: User;
  changeName: boolean;
  changeSurname: boolean;
  changeEmail: boolean;
  changePicture: boolean;
  changePassword: boolean;
  userPicture: string;
  updateUser: User;
  updatePassword: string;
  date: number;

  constructor(private authService: AuthService, private location: Location, private notifications: NotificationsService, public dialog: MatDialog, private httpService: HttpService) {
    this.updateUser = new User('', '', '')
    this.user = this.authService.user;
    this.updateUser = this.user;
    this.changeName = false;
    this.changeSurname = false;
    this.changeEmail = false;
    this.changePicture = false;
    this.userPicture = '';
    this.updatePassword = '';
    this.changePassword = false;
    this.date = Date.now();
    this.authService.userRefresh.subscribe(user => {
      this.user = user;
    })

  }
  userName = new FormControl();
  userSurname = new FormControl();
  userEmail = new FormControl();

  backClicked() {
    this.location.back();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PasswordPopupComponent, {
      width: '300px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updatePassword = result;
      this.changePassword = true;
    });
  }
  openChangeDialog(fieldName: string): void {
    const dialogRef = this.dialog.open(ConfirmPopupDialogComponent, {
      width: '300px',
      maxWidth: '300px',
      data: fieldName
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (fieldName) {
          case 'name':
            this.changeName = true;
            break;
          case 'surname':
            this.changeSurname = true;
            break;
          case 'email':
            this.changeEmail = true;
            break;
        }
      } else {
        this.notifications.warning('Wrong password');
      }
    });
  }
  openPictureDialog(): void {
    const dialogRef = this.dialog.open(PicturePikerComponent, {
      width: '300px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changePicture = true;
        this.userPicture = result
      }
    });
  }
  save() {
    if (this.changeName && this.userName.value != null) {
      this.updateUser.name = this.userName.value;
    }
    if (this.changeSurname && this.userSurname.value != null) {
      this.updateUser.surname = this.userSurname.value;
    }
    if (this.changeEmail && this.userEmail.value != null) {
      this.updateUser.email = this.userEmail.value;
    }
    if (this.changePicture && this.userPicture != '') {
      this.updateUser.picture = this.userPicture;
    }
    if (this.changePassword && this.updatePassword != null) {
      this.updateUser.password = this.updatePassword;
    }

    this.httpService.updateUser(this.user.id, this.updateUser).subscribe(() => {
      this.changeName = false;
      this.changeSurname = false;
      this.changeEmail = false;
      this.changePassword = false;
      this.changePicture = false;
      this.authService.refreshUser();
      this.notifications.info('User succesfully updated');
    });

  }
  cancel() {
    this.changeName = false;
    this.changeSurname = false;
    this.changeEmail = false;
    this.changePicture = false;
    this.changePassword = false;
    this.user = this.authService.user;
    this.updateUser = this.user;
    this.userName.reset();
    this.userEmail.reset();
    this.userSurname.reset()
  }
}
