import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastrServiceMock } from '../mocks/toastr.service.mock';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';

import { MyProfileComponent } from './my-profile.component';
import { Observable } from 'rxjs';
import { HttpService } from '../http.sevice';
import { HttpServiceMock } from '../mocks/http.service.mock';
import { AuthService } from '../auth.sevice';
import { AuthServiceMock } from '../mocks/auth.service.mock';

describe('MyProfileComponent', () => {
  let fixture: ComponentFixture<MyProfileComponent>;
  let location: SpyLocation;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyProfileComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [{ provide: Location, useClass: SpyLocation },
      { provide: ToastrService, useClass: ToastrServiceMock },
      { provide: AuthService, useClass: AuthServiceMock },
      { provide: HttpService, userClass: HttpServiceMock },
      { provide: MatDialog, useValue: {} }]
    })
      .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('should go back to previous page on button click', () => {
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    location = TestBed.get(Location);
    spyOn(location, "back");
    app.backClicked();
    expect(location.back).toHaveBeenCalled();
  });

  it('should open password popup', () => {
    TestBed.overrideProvider(MatDialog, { useValue: new PasswordDialogMock() });
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    app.openDialog();
    expect(app.updatePassword == 'newPassword' && app.changePassword == true).toBeTrue();
  });

  it('should change name', () => {
    TestBed.overrideProvider(MatDialog, { useValue: new ConfirmTrueDialogMock() });
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    let fieldName = 'name'
    app.openChangeDialog(fieldName);
    expect(app.changeName).toBeTrue();
  });

  it('should change surname', () => {
    TestBed.overrideProvider(MatDialog, { useValue: new ConfirmTrueDialogMock() });
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    let fieldName = 'surname'
    app.openChangeDialog(fieldName);
    expect(app.changeSurname).toBeTrue();
  });

  it('should change email', () => {
    TestBed.overrideProvider(MatDialog, { useValue: new ConfirmTrueDialogMock() });
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    let fieldName = 'email'
    app.openChangeDialog(fieldName);
    expect(app.changeEmail).toBeTrue();
  });

  it('shouldn\'t change anything', () => {
    TestBed.overrideProvider(MatDialog, { useValue: new ConfirmFalseDialogMock() });
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    let fieldName = 'name'
    app.openChangeDialog(fieldName);
    expect(app.changeName).toBeFalse();
  });
  
  it('should open change picture popup', () => {
    TestBed.overrideProvider(MatDialog, { useValue: new PictureDialogMock() });
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    app.openPictureDialog();
    expect(app.userPicture == 'newPicture' && app.changePicture == true).toBeTrue();
  });
  
  it('shouldn\'t change picture', () => {
    TestBed.overrideProvider(MatDialog, { useValue: new PictureDialogFalseMock() });
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    app.openPictureDialog();
    expect(app.userPicture != 'newPicture' && app.changePicture == false).toBeTrue();
  });
  
  it('should save updateUserName', () => {
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    app.userName.setValue('newName');
    app.changeName = true;
    app.save();
    expect(app.updateUser.name).toEqual('newName');
  });
  
  it('should save updateUserSurname', () => {
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    app.userSurname.setValue('newSurname');
    app.changeSurname = true;
    app.save();
    expect(app.updateUser.surname).toEqual('newSurname');
  });
  
  it('should save updateUserEmail', () => {
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    app.userEmail.setValue('newEmail');
    app.changeEmail = true;
    app.save();
    expect(app.updateUser.email).toEqual('newEmail');
  });
  
  it('should save updateUserPicture', () => {
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    app.changeSurname = true;
    app.save();
    expect(app.updateUser.picture == app.userPicture).toBeTrue();
  });
  
  it('should save updateUserPassword', () => {
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    app.save();
    expect(app.updateUser.password == app.updatePassword).toBeTrue();
  });

  it('should cancel changes', () => {
    fixture = TestBed.createComponent(MyProfileComponent);
    const app = fixture.componentInstance;
    app.cancel();
    expect(!app.changeName && !app.changeSurname && !app.changeEmail && !app.changePicture && !app.changePassword).toBeTrue();
  });
});

export class PasswordDialogMock {
  open() {
    let dialogRef = {
      afterClosed() {
        return new Observable<string>((observer) => { observer.next('newPassword') });
      }
    }
    return dialogRef;
  }
}

export class ConfirmTrueDialogMock {
  open() {
    let dialogRef = {
      afterClosed() {
        return new Observable<boolean>((observer) => { observer.next(true) });
      }
    }
    return dialogRef;
  }
}

export class ConfirmFalseDialogMock {
  open() {
    let dialogRef = {
      afterClosed() {
        return new Observable<boolean>((observer) => { observer.next(false) });
      }
    }
    return dialogRef;
  }
}
export class PictureDialogMock {
  open() {
    let dialogRef = {
      afterClosed() {
        return new Observable<string>((observer) => { observer.next('newPicture') });
      }
    }
    return dialogRef;
  }
}
export class PictureDialogFalseMock {
  open() {
    let dialogRef = {
      afterClosed() {
        return new Observable<undefined>((observer) => { observer.next(undefined) });
      }
    }
    return dialogRef;
  }
}
