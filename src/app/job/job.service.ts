import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CreateJobDto } from './CreateJobsDto';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }

  //---------Get Jobs 
  allJobs() {
    return this.http.get<any>(this.baseUrl + "/Jobs/GetAllJob");
  }

  //-----------Office Locations
  allOfficeLocations() {
    return this.http.get<any>(this.baseUrl + "/OfficeLocation/officelocationsdropdown");
  }

  //----------Add Jobs
  createJob(formData:any): Observable<any> {
    const url = `${this.baseUrl}/addJob`;
    //const formData = new FormData();
    //formData.append('id', Job.id);
    //formData.append('name', Job.name);
    //formData.append('address1', Job.address1);
    //formData.append('addressLine1', "123");
    //formData.append('addressLine2', "123");
    //formData.append('city', "123");
    //formData.append('email', "123@g.com");
    //formData.append('faxNo', "123");
    //formData.append('displayName', "123");
    //formData.append('discription', "123");
    return this.http.post<any>("https://localhost:7063/api/Job/addJob", formData);
  }
}
