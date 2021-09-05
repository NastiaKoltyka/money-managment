import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../classes/user';
import { MaterialModule } from '../shared/material/material.module';

import { ConfirmPopupDialogComponent } from './confirm-popup.dialog.component';

describe('ConfirmPopupDialogComponent', () => {
  let component: ConfirmPopupDialogComponent;
  let fixture: ComponentFixture<ConfirmPopupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmPopupDialogComponent],
      imports: [HttpClientModule, MaterialModule, BrowserAnimationsModule, FormsModule],
      providers: [{ provide: MatDialogRef, useValue: { close: () => { } } }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPopupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should close window', () => {
    fixture = TestBed.createComponent(ConfirmPopupDialogComponent);
    const app = fixture.componentInstance;
    spyOn(app.dialogRef, "close");
    app.onNoClick();
    expect(app.dialogRef.close).toHaveBeenCalled();
  });
  it('should check incorrect password', () => {
    fixture = TestBed.createComponent(ConfirmPopupDialogComponent);
    const app = fixture.componentInstance;
    app.newPassword = '12345';
    app.user = new User('user', 'user', 'user');
    spyOn(app.dialogRef, "close");
    app.checkPassword();
    expect(app.dialogRef.close).toHaveBeenCalledWith(false);
  });
  it('should check correct password', () => {
    fixture = TestBed.createComponent(ConfirmPopupDialogComponent);
    const app = fixture.componentInstance;
    app.newPassword = '12345';
    app.user = new User('user', 'user', '12345');
    spyOn(app.dialogRef, "close");
    app.checkPassword();
    expect(app.dialogRef.close).toHaveBeenCalledWith(true);
  });


});
