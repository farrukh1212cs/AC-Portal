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
  allSource() {
    return this.http.get<any>(this.baseUrl + "/DropDown/allDropDownsList?PageName=addcontact");
  }
  allState() {
    return this.http.get<any>(this.baseUrl + "/States");
  }

  //----------Add Jobs
  createJob(Jobs: CreateJobDto): Observable<any> {
    const formData = new FormData();
    formData.append('address1', Jobs?.address1?.toString() ?? "");
    formData.append('address2', Jobs?.address2?.toString() ?? "");
    formData.append('city', Jobs?.city?.toString() ?? "");
    formData.append('zip', Jobs?.zip?.toString() ?? "");
    formData.append('name', Jobs?.name?.toString() ?? "");
    formData.append('startDate', Jobs?.startDate?.toISOString() ?? "");
    formData.append('endDate', Jobs?.endDate?.toISOString() ?? "");
    formData.append('description', Jobs?.description?.toString() ?? "");
    formData.append('leadSource', Jobs?.leadSource?.toString() ?? "");
    formData.append('state', Jobs?.state?.toString() ?? "");
    formData.append('salesRepId', Jobs?.salesRepId?.toString() ?? "");
    formData.append('officeLocationId', Jobs?.officeLocationId?.toString() ?? "");
    formData.append('workFlowId', Jobs?.workFlowId?.toString() ?? "");
    formData.append('jobStatus', Jobs?.jobStatus?.toString() ?? "");
    return this.http.post<any>(this.baseUrl + "/Jobs/CreateJob", formData);
  }
}
