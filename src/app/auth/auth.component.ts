import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginToken } from './models/auth';
import { isNgContainer } from '@angular/compiler';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
@HostListener('window:popstate', ['$event'])
export class AuthComponent implements OnInit {
  isLoading: Boolean = false;
  httpError: Boolean = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly service: AuthService
  ) { }
  ngOnInit(): void {
    this.init();

  }
  init() {
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl('dashboard')
    }
    this.activatedRoute.params
      .pipe(
        map((params: any) => params.action)
      ).subscribe(
        (action) => {
          if (action == 'logout') {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            this.router.navigateByUrl('dashboard');
          }
          else if (action == 'login') {
            this.router.navigateByUrl('')
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            this.router.navigateByUrl('dashboard');
          }
        })
  }
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  }
  )


  onFormSubmit(): void {
    this.isLoading = true
    sessionStorage.setItem('username', this.loginForm.get('username')?.value);
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value)
        .subscribe(
          (respon) => {
            sessionStorage.setItem('token', respon.token);
            this.isLoading = false
            this.router.navigateByUrl('dashboard');
            sessionStorage.setItem('kodeKey', '@mamen12');
          },
          (error) => {
            console.log(error)
            this.init();
            this.httpError = true
            this.isLoading = false
          });
    }
  }

  isFieldValid(fieldName: string): string {
    const control: AbstractControl = this.loginForm.get(fieldName
    ) as AbstractControl;

    if (control && control.touched && control.invalid) {
      return 'is-invalid';
    } else if (control && control.valid) {
      return 'is-valid'
    } else {
      return '';
    }
  }

}
