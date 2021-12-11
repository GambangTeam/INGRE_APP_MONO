import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { AuthService } from './auth.service';
import { Login, LoginToken } from '../models/auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  })

  it('Should return Obsevable<LoginToken>', () => {
    const url = '/api/auth/admin';
    const mockLogin: Login = {
      username: 'admin@ingre.com',
      password: 'admin1'
    }
    const mockLoginToken: LoginToken = {
      token: '2130das231ss'
    }
    service.login(mockLogin).subscribe((response: LoginToken) => {
      expect(response).toEqual(mockLoginToken);
    })

    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('POST')
    expect(request.request.body).toEqual(mockLogin)


  })

});
