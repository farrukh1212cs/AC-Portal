import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }


  allResult() {
    return this.http.get<any>(this.baseUrl + "/Contact/allContacts");
  }
}
