import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginToken } from './models/auth';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly service: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params: any) => params.action)
      ).subscribe((action) => {
        if (action === 'logout') {
          sessionStorage.removeItem('token');
          this.router.navigateByUrl('');
        }
      })
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  onFormSubmit() {
    // this.router.navigateByUrl('/home')
    console.log("login Value", this.loginForm.value);
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value)
        .subscribe((response: LoginToken) => {
          sessionStorage.setItem('token', response.token)
          sessionStorage.setItem('username', this.loginForm.get('username')?.value)
          console.log(response.token);
          this.router.navigateByUrl('home')
        }, console.error)
    }
  }

  isFieldValid(fieldName: string): string {
    const control: AbstractControl = this.loginForm.get(fieldName
    ) as AbstractControl;

    if (control && control.touched && control.invalid) {
      return 'border-red-700';
    } else if (control && control.valid) {
      return 'border-green-800'
    } else {
      return '';
    }
  }
}
