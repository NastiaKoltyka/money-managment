import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.sevice';
import { User } from '../classes/user';

@Component({
  selector: 'app-confirm-popup.dialog',
  templateUrl: './confirm-popup.dialog.component.html',
  styleUrls: ['./confirm-popup.dialog.component.css']
})
export class ConfirmPopupDialogComponent {
  newPassword: string;
  user: User;
  hide: boolean;
  fieldName: string;
  constructor(private authService: AuthService, public dialogRef: MatDialogRef<ConfirmPopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.newPassword = '';
    this.user = authService.user;
    this.hide = true;
    this.fieldName = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  checkPassword() {
    this.dialogRef.close(this.newPassword == this.user.password);
  }
}
