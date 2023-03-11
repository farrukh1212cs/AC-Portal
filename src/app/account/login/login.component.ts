import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

import { AccountService } from '../account.service';

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
  
}
