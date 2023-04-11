import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

import { AccountService } from '../account.service';

import { RegisterDto } from '../AccountDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userLoginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AccountService,
    private router: Router,
    private localStorage: LocalStorageService
  ) { }
  ngOnInit() {
    if (this.localStorage.get("Obj")) {
      this.router.navigate(['./home']);
    }

    this.userLoginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  async login() {
    try {
      const res = await this.authService.login(this.userLoginForm.value).toPromise();
      this.localStorage.set("Obj", res.payload);
      alert("Logged in successfully");
      this.router.navigate(['./home']);
    } catch (err) {
      alert("UserName Or Password Is Invalid!");
    }
  }

  async register() {
    const register: RegisterDto = {
      firstName: "Asad",
      lastName: "Ali",
      email: "asad@gmail.com",
      companyName: "asadco",
      password: "12345"
    }
    try { 
      const res = await this.authService.register(register).toPromise();
      alert("Registered Successfully!");
      this.router.navigate(['./login']);
    } catch(err) {
      alert("Error registering this user!")
    }
  }
  
}
