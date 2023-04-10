import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { RegisterDto } from './AccountDto';
import { BussinessHoursDto } from './BussinessHoursDto';
import { OfficeLocationDto } from './OfficeLocationDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }


  login(loginUser: any) {
    return this.http.post<any>(this.baseUrl + "/Login", loginUser);
  }

  register(register: RegisterDto): Observable<any> {
    const formData = new FormData();
    
    formData.append('firstName', register?.firstName?.toString() ?? "");
    formData.append('lastName', register.lastName?.toString() ?? "");
    formData.append('email', register.email?.toString() ?? "");
    formData.append('companyName', register.companyName?.toString() ?? "");
    formData.append('password', register.password?.toString() ?? "");

    return this.http.post<any>(this.baseUrl + "/Register", formData);
  }

  // Bussiness Hours

  addBussinessHours(bHours: BussinessHoursDto, id?: number): Observable<any> {
    const formData = new FormData();
    
    formData.append('day', bHours?.day?.toString() ?? "");
    formData.append('officeStartTime', bHours.officeStartTime?.toString() ?? "");
    formData.append('breakStartTime', bHours.breakStartTime?.toString() ?? "");
    formData.append('breakEndTime', bHours.breakEndTime?.toString() ?? "");
    formData.append('officeEndTime', bHours.officeEndTime?.toString() ?? "");
    formData.append('officeLocationId', bHours.officeLocationId?.toString() ?? "0");

    if(id?.toString()) {
      formData.append('id', id.toString());
      return this.http.put<any>(this.baseUrl + "/BussinessHours/Update", formData);
    } else {
      return this.http.post<any>(this.baseUrl + "/BussinessHours/Add", formData);
    }
  }

  deleteBussinessHours(id: number) {
    return this.http.delete<any>(this.baseUrl + "/BussinessHours/Add?Id=" + id);
  }

  getBussinessHoursById(id: number, OfficeLocationId: number) {
    return this.http.get<any>(this.baseUrl + "/BussinessHours/GetByid?id=" + id + "&OfficeLocationId=" + OfficeLocationId);
  }

  getPagedBussinessHours (pageIndex: number, pageSize: number, BussinessHoursId: number, sort: string, search: string) {
    return this.http.get<any>(this.baseUrl + "/BussinessHours/PagedBussinessHours?PageIndex=" + pageIndex + "&PageSize=" + pageSize + "&BussinessHoursId=" + BussinessHoursId + "&Sort=" + sort + "&Search=" + search);
  }

  allBussinessHours(OfficeLocationId: number, sort: string, search: string) {
    return this.http.get<any>(this.baseUrl + "/BussinessHours/AllBussinessHours?OfficeLocationId=" + OfficeLocationId + "&Sort=" + sort + "&Search=" + search);
  }

  // Company

  pagedCompanies(pageIndex: number, pageSize: number, sort: string, search: string) {
    return this.http.get<any>(this.baseUrl + "/Company/pagedCompanies?PageIndex=" + pageIndex + "&PageSize=" + pageSize + "&Sort=" + sort + "&Search=" + search);
  }

  allCompanies( sort: string, search: string) {
    return this.http.get<any>(this.baseUrl + "/Company/allCompamnies?Sort=" + sort + "&Search=" + search);
  }

  addOfficeLocation(location: OfficeLocationDto, id: number): Observable<any> {
    const formData = new FormData();
    
    formData.append('officeLocationName', location?.officeLocationName?.toString() ?? "");
    formData.append('color', location.color?.toString() ?? "");
    formData.append('addressLine1', location.addressLine1?.toString() ?? "");
    formData.append('addressLine2', location.addressLine2?.toString() ?? "");
    formData.append('city', location.city?.toString() ?? "");
    formData.append('zipCode', location.zipCode?.toString() ?? "0");
    formData.append('phoneNumber', location.phoneNumber?.toString() ?? "");
    formData.append('logoUrl', location.logoUrl?.toString() ?? "");
    formData.append('stateId', location.stateId?.toString() ?? "0");
    formData.append('timeZoneId', location.timeZoneId?.toString() ?? "0");

    if(id) {
      formData.append('id', id.toString());
      return this.http.put<any>(this.baseUrl + "/OfficeLocation/updateOfficeLocation", formData);
    } else {
      return this.http.post<any>(this.baseUrl + "/OfficeLocation/addOfficeLocation", formData);
    }
  }

  getOfficeLocationById(id: number) {
    return this.http.get<any>(this.baseUrl + "/OfficeLocation/getOfficeLocationById?id=" + id);
  }

  getPagedOfficeLocations (pageIndex: number, pageSize: number, OfficeLocationId: number, sort: string, search: string) {
    return this.http.get<any>(this.baseUrl + "/OfficeLocation/getPagedOfficeLocations?PageIndex=" + pageIndex + "&PageSize=" + pageSize + "&OfficeLocationId=" + OfficeLocationId + "&Sort=" + sort + "&Search=" + search);
  }

  allOfficeLocationIds(OfficeLocationId: number, sort: string, search: string) {
    return this.http.get<any>(this.baseUrl + "/OfficeLocation/allOfficeLocationIds?OfficeLocationId=" + OfficeLocationId + "&Sort=" + sort + "&Search=" + search);
  }

  officelocationsdropdown() {
    return this.http.get<any>(this.baseUrl + "/OfficeLocation/officelocationsdropdown");
  }
}
