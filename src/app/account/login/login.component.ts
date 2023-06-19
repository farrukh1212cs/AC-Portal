import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

import { AccountService } from '../../core/services/account.service';
import { Subscription } from 'rxjs';
import { LoginDto, RegisterDto } from 'src/app/core/interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userLoginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private authService: AccountService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}
  ngOnInit() {
    if (this.localStorage.get('Obj')) {
      this.router.navigate(['./dashboard']);
    }

    this.userLoginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // Declare a subscription property
  private subscription: Subscription;

  login() {
    const data: LoginDto = {
      userName: this.userLoginForm.value.userName,
      password: this.userLoginForm.value.password,
    };
    this.subscription = this.authService.login(data).subscribe({
      next: (response) => {
        this.localStorage.set('Obj', response.payload);
        this.toastr.success('Success!', 'Logged in successfully!');
        this.router.navigate(['./dashboard']);
      },
      error: (error) => {
        this.toastr.error('Error!', 'Invalid UserName Or Password!');
      },
    });
  }

  register() {
    const register: RegisterDto = {
      firstName: 'Asad',
      lastName: 'Ali',
      email: 'asad@gmail.com',
      companyName: 'asadco',
      password: '12345',
    };

    this.subscription = this.authService.register(register).subscribe({
      next: (res) => {
        this.toastr.success('Success!', 'Registered successfully!');
        this.router.navigate(['./login']);
      },
      error: (err) => {
        this.toastr.error('Error!', 'Error registering this user!');
      },
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  // Unsubscribe from the subscription when the component is destroyed
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
