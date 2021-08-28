import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.sevice';
import { User } from '../classes/user';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-password-popup',
  templateUrl: './password-popup.component.html',
  styleUrls: ['./password-popup.component.css']
})

export class PasswordPopupComponent {
  newPassword: string;
  hide:boolean;
  user:User;
  createNewPassword:boolean;
  constructor(private authService: AuthService, public dialogRef: MatDialogRef<PasswordPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.newPassword = '';
    this.hide = true;
    this.user=authService.user;
    this.createNewPassword=false
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  checkPassword(){
    if(this.newPassword==this.user.password){
      this.createNewPassword=true;
    }
  }
  password = new FormControl();
  confirmPassword= new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.password.hasError('pattern')||this.confirmPassword.hasError('pattern')) {
      return 'You must enter a value';
    }
    return this.password.hasError('password') ? 'Not a valid password' : '';
  }
}
