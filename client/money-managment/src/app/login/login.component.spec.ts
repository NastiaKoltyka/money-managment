import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from '../classes/credentials';
import { ToastrServiceMock } from '../mocks/toastr.service.mock';
import { AuthServiceMock } from '../mocks/auth.service.mock';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth.sevice';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[HttpClientModule, RouterTestingModule, FormsModule],
      providers: [{ provide: ToastrService, useClass: ToastrServiceMock},{ provide: AuthService, useClass: AuthServiceMock }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should submit', () => {
    fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    const loginUser=new Credentials('','');
    loginUser.email='test@gmail.com';
    loginUser.password='123456';
    let form = new NgForm([], []);
    form.value.password = '123456';
    form.value.login='test@gmail.com'
    spyOn(app.authService, "loginUser").and.returnValue(Promise.resolve());
    app.onSubmit(form);
    expect(app.authService.loginUser).toHaveBeenCalledWith(loginUser);
  });
});
