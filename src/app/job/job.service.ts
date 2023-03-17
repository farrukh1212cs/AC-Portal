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
  allSalesRep() {
    return this.http.get<any>(this.baseUrl + "/SalesRepresentative/getsalesrepresentative");
  }
  allWorkFlows() {
    return this.http.get<any>(this.baseUrl + "/WorkFlow/allWorkFlows");
  }
  allStatus() {
    return this.http.get<any>(this.baseUrl + "/Status/allStatuses");
  }
  allSubcontractors() {
    return this.http.get<any>(this.baseUrl + "/SubContractor/getsubcontractors");
  }
  allRelatedContacts() {
    return this.http.get<any>(this.baseUrl + "/RelatedContact/getRelatedContactsDropDown");
  }
  ///TeamMember/getteammebers
  allTeamMembers() {
    return this.http.get<any>(this.baseUrl + "/TeamMember/getteammebers");
  }
  allphoneTypes() {
    return this.http.get<any>(this.baseUrl + "/DropDown/allDropDownsList?PageName=addcontact");
  }
  allSource() {
    return this.http.get<any>(this.baseUrl + "/DropDown/allDropDownsList?PageName=addcontact");
  }
  allState() {
    return this.http.get<any>(this.baseUrl + "/States");
  }

  //----------Add Jobs
  createJob(Jobs: CreateJobDto, phonesno: any): Observable<any> {
    debugger;
    const formData = new FormData();
    if (Jobs?.id?.toString()) {
      formData.append('id', Jobs?.id?.toString() ?? "0");
    }
    formData.append('address1', Jobs?.address1?.toString() ?? "");
    formData.append('address2', Jobs?.address2?.toString() ?? "");
    formData.append('city', Jobs?.city?.toString() ?? "");
    formData.append('zip', Jobs?.zip?.toString() ?? "");
    formData.append('name', Jobs?.name?.toString() ?? "");
    const startDate = Jobs?.startDate;
    if (startDate !== undefined) {
      const startDateObj = new Date(startDate);
      startDateObj.setDate(startDateObj.getDate() + 1);
      formData.append('startDate', startDateObj.toISOString());
    }
    const endDate = Jobs?.endDate;
    if (endDate !== undefined) {
      const endDateObj = new Date(endDate);
      endDateObj.setDate(endDateObj.getDate() + 1);
      formData.append('endDate', endDateObj.toISOString());
    }
    formData.append('description', Jobs?.description?.toString() ?? "");
    formData.append('leadSource', Jobs?.leadSource?.toString() ?? "");
    formData.append('state', Jobs?.state?.toString() ?? "");
    formData.append('salesRepId', Jobs?.salesRepId?.toString() ?? "");
    formData.append('officeLocationId', Jobs?.officeLocationId?.toString() ?? "");
    formData.append('workFlowId', Jobs?.workFlowId?.toString() ?? "");
    formData.append('jobStatus', Jobs?.jobStatus?.toString() ?? "");
    debugger;
    phonesno?.forEach((phoneNumber: any, index: number) => {
      const keyPrefix = `phoneNumbers[${index}]`;
      formData.append(`${keyPrefix}.phoneNumber`, phoneNumber.phoneNumber);
      formData.append(`${keyPrefix}.typeId`, phoneNumber.typeId);
      formData.append(`${keyPrefix}.id`, phoneNumber.id ?? "0");
    });
    if (Jobs.tags) {
      Jobs.tags.forEach((tag: any) => formData.append('tags[]', tag.value));
    }
    if (Jobs?.id?.toString()) {
      return this.http.put<any>(this.baseUrl + "/Jobs/CreateJob", formData);
    } else {
      return this.http.post<any>(this.baseUrl + "/Jobs/CreateJob", formData);
    }
  }
}
