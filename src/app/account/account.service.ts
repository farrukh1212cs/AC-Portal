import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }


  login(loginUser: any) {
    return this.http.post<any>(this.baseUrl + "/Login", loginUser);
  }
}
