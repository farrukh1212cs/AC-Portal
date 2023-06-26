import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BussinessHoursDto } from '../../account/BussinessHoursDto';
import { OfficeLocationDto } from '../../account/OfficeLocationDto';
import { AppConfig } from '../app-config';
import { LoginDto, RegisterDto } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient, private router: Router) {}

  login(loginUser: LoginDto): Observable<any> {
    return this.http.post<any>(AppConfig.auth.login, loginUser);
  }

  register(register: RegisterDto): Observable<any> {
    const formData = new FormData();
    formData.append('firstName', register?.firstName?.toString() ?? '');
    formData.append('lastName', register.lastName?.toString() ?? '');
    formData.append('email', register.email?.toString() ?? '');
    formData.append('companyName', register.companyName?.toString() ?? '');
    formData.append('password', register.password?.toString() ?? '');
    return this.http.post<any>(AppConfig.auth.register, formData);
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
