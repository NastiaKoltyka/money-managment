import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-picture-piker',
  templateUrl: './picture-piker.component.html',
  styleUrls: ['./picture-piker.component.css']
})
export class PicturePikerComponent {
  icons: string[];
  baseUrl: string = 'http://localhost:3000/api/images/';
  choosedPicture: string;
  constructor(public dialogRef: MatDialogRef<PicturePikerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.choosedPicture = ''
    this.icons = [`2754575_man_avatar_male_icon.svg`,
      `2754576_woman_female_avatar_icon.svg`,
      `2754578_man_male_avatar_user_icon.svg`,
      `2754579_business_man_man_avatar_icon.svg`,
      `2754580_woman_business_woman_avatar_female_icon.svg`,
      `2754581_woman_avatar_user_female_icon.svg`,
      `2754582_business_man_man_avatar_icon.svg`,
      `2754583_man_avatar_user_icon.svg`,
      `2754584_woman_avatar_female_icon.svg`]
  }

  saveChange() {
    this.dialogRef.close(this.choosedPicture);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  choosePicture(pictureUrl: string) {
    this.choosedPicture = pictureUrl;
  }

}
