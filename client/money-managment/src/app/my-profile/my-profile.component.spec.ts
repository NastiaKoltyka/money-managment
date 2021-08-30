import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastrServiceMock } from '../mocks/toastr.service.mock';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MyProfileComponent } from './my-profile.component';

describe('MyProfileComponent', () => {
  let component: MyProfileComponent;
  let fixture: ComponentFixture<MyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyProfileComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [{ provide: Location, useClass: LocationMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: MatDialog, useClass: MatDialogMock }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class MatDialogMock{
}

export class LocationMock{ 
  back() { }
}
