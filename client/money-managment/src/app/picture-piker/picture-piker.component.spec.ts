import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material/material.module';

import { PicturePikerComponent } from './picture-piker.component';

describe('PicturePikerComponent', () => {
  let component: PicturePikerComponent;
  let fixture: ComponentFixture<PicturePikerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PicturePikerComponent],
      imports: [HttpClientModule, MaterialModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: {close: () => { }} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturePikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close window', () => {
    fixture = TestBed.createComponent(PicturePikerComponent);
    const app = fixture.componentInstance;
    spyOn(app.dialogRef, "close");
    app.onNoClick();
    expect(app.dialogRef.close).toHaveBeenCalled();
  });

  it('should save changes', () => {
    fixture = TestBed.createComponent(PicturePikerComponent);
    const app = fixture.componentInstance;
    const picture='fakePicture'
    app.choosedPicture = picture
    spyOn(app.dialogRef, "close");
    app.saveChange();
    expect(app.dialogRef.close).toHaveBeenCalledWith(picture);
  });


  it('should choose picture ', () => {
    fixture = TestBed.createComponent(PicturePikerComponent);
    const app = fixture.componentInstance;
    const picture='fakePicture';
    app.choosePicture(picture)
    expect(app.choosedPicture).toEqual(picture);
  });

});
