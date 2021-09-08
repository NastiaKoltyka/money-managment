import { HttpClientModule } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth.sevice';
import { Credentials } from './classes/credentials';
import { AuthServiceMock } from './mocks/auth.service.mock';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: AuthService, useClass: AuthServiceMock }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'money-managment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('money-managment');
  });

  it(`should open side bar`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.openSidebar();
    tick(200);
    expect(app.visible && app.sideBarOpened).toEqual(true);
  }));

  it(`should log out`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.authService.loginUser(new Credentials('test@gmail.com', 'test'));
    app.sideBarOpened = true;
    app.visible = true;
    spyOn(app.router, 'navigate');
    app.logout();
    let loggedOutProperly:boolean = !app.authService.isLoggedIn() && !app.visible && !app.sideBarOpened;
    expect(loggedOutProperly).toBeTruthy();
    expect(app.router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it(`should close side bar`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.closeSidebar();
    tick(500);
    expect(!app.visible && !app.sideBarOpened).toEqual(true);
  }));
});
