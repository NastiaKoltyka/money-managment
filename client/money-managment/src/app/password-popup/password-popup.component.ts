import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.sevice';

@Component({
  selector: 'app-password-popup',
  templateUrl: './password-popup.component.html',
  styleUrls: ['./password-popup.component.css']
})

export class PasswordPopupComponent {
  newPassword: string;
  constructor(private authService: AuthService, public dialogRef: MatDialogRef<PasswordPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.newPassword = '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
