import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  isLoginInvalid: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router) {
    if (this.authService.userValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  ngOnInit() {

  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.isLoginInvalid = false;
          this.router.navigateByUrl('/dashboard');
        },
        error: (error) => {
          this.isLoginInvalid = true;
        },
      });
  }
}
