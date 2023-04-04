import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = {} as FormGroup;
  registerForm: FormGroup = {} as FormGroup;

  isLoading = false;
  errorMessage: string = '';
  activeTab = 'tab1';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  onSubmitLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
    const payload = {username, password}
    this.authService.login(payload)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.isLoading = false;
          this.errorMessage = error.message;
        }
      );
  }

  onSubmitRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    const username = this.registerForm.controls['username'].value;
    const email = this.registerForm.controls['email'].value;
    const password = this.registerForm.controls['password'].value;
    const confirmpassword = this.registerForm.controls['confirmpassword'].value;
    const payload = {username, email, password, confirmpassword}
    this.authService.register(payload)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.isLoading = false;
          this.errorMessage = error.message;
        }
      );
  }
}
