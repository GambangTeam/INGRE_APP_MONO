import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { from, Observable } from 'rxjs';

import { AuthComponent } from './auth.component';
import { Login, LoginToken } from './models/auth';
import { AuthService } from './services/auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const form = (username: string, password: string) => {
    component.loginForm.controls["username"].setValue(username)
    component.loginForm.controls['password'].setValue(password)
  }
  it('Component from initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.valid).toBeDefined();
    expect(component.loginForm.invalid).toBeDefined();
  })

  it('Credentials field validity', () => {
    form('admin1@ingre.com', 'admin1');
    const loginMock: Login = { username: 'admin1@ingre.com', password: 'admin1' }
    expect(component.loginForm.value).toEqual(loginMock)
  })
  it('Successfully login from onSubmit()', () => {
    const mockTokenLogin: LoginToken = {
      token: '123sadwqe213'
    }
    const spy = spyOn(authService, 'login')
      .and.callThrough().and
      .callFake((): Observable<LoginToken> => {
        return from([mockTokenLogin])
      })
    component.loginForm.get('username')?.setValue('admin1@ingre.com');
    component.loginForm.get('password')?.setValue('admin1');
    component.onFormSubmit();
    expect(spy).toHaveBeenCalled();
  })

  it('Should return " " if form null', () => {

    const form: string = component.isFieldValid('username');
    expect(form).toEqual('');
  })
});
