import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../auth.sevice';
import { User } from '../classes/user';
import { AuthServiceMock } from '../mocks/auth.service.mock';
import { MaterialModule } from '../shared/material/material.module';

import { PasswordPopupComponent } from './password-popup.component';

describe('PasswordPopupComponent', () => {
  let component: PasswordPopupComponent;
  let fixture: ComponentFixture<PasswordPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordPopupComponent],
      imports: [HttpClientModule, MaterialModule, BrowserAnimationsModule, FormsModule],
      providers: [{ provide: MatDialogRef, useValue: { close: () => { } } }, { provide: MAT_DIALOG_DATA, useValue: {} },{ provide: AuthService, useClass: AuthServiceMock }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close window', () => {
    fixture = TestBed.createComponent(PasswordPopupComponent);
    const app = fixture.componentInstance;
    spyOn(app.dialogRef, "close");
    app.onNoClick();
    expect(app.dialogRef.close).toHaveBeenCalled();
  });

  
  it('should check correct password', () => {
    fixture = TestBed.createComponent(PasswordPopupComponent);
    const app = fixture.componentInstance;
    app.newPassword = '12345';
    app.user = new User('user','user','12345');
    app.checkPassword();
    expect(app.createNewPassword).toBeTrue();
  });

  it('should check wrong password', () => {
    fixture = TestBed.createComponent(PasswordPopupComponent);
    const app = fixture.componentInstance;
    app.newPassword = '12345';
    app.user = new User('user','user','user');
    app.checkPassword();
    expect(app.createNewPassword).toBeFalse();
  });

});
