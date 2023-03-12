import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }


  allJobs() {
    return this.http.get<any>(this.baseUrl + "/Jobs/GetAllJob");
  }

  //-----------officeLocations
  allOfficeLocations() {
    return this.http.get<any>(this.baseUrl + "/OfficeLocation/officelocationsdropdown");
  }
}
