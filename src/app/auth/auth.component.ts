import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginToken } from './models/auth';
import { isNgContainer } from '@angular/compiler';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading: Boolean = false;
  httpError: Boolean = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly service: AuthService
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params: any) => params.action)
      ).subscribe(
        (action) => {
          if (action == 'logout') {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            this.router.navigateByUrl('');
          }
          else if (action == '') {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            this.router.navigateByUrl('');
          }
        })
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
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
            this.router.navigateByUrl('');
          },
          (error) => {
            console.log(error)
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
