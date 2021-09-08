import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.sevice';
import { User } from '../classes/user';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-password-popup',
  templateUrl: './password-popup.component.html',
  styleUrls: ['./password-popup.component.css']
})

export class PasswordPopupComponent {
  newPassword: string;
  hide: boolean;
  user: User;
  createNewPassword: boolean;
  wrongPassword:boolean;
  constructor(private authService: AuthService, public dialogRef: MatDialogRef<PasswordPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.newPassword = '';
    this.hide = true;
    this.user = authService.user;
    this.createNewPassword = false;
    this.wrongPassword=false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  checkPassword() {
    if (this.newPassword == this.user.password) {
      this.createNewPassword = true;
    }
    else{
      this.wrongPassword=true;
    }

  }
  pattern = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
  password = new FormControl('', [Validators.required, Validators.pattern(this.pattern)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.pattern(this.password.value)]);
}
