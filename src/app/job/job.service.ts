import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { CreateJobDto } from './CreateJobsDto';
import { CreateEvetDto } from './createEventDto';
import {createJobStatusDto} from './createJobStatusDto';
import {createLeadSourceDto} from './createLeadSourceDto';
import {createTagDto} from './createTagDto';
import {createWorkOrderDto} from './createWorkOrderDto';
import {createWorkflowDto} from './createWorkflowDto';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }

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

  //Job Requests

  //---------Get Jobs 
  allJobs() {
    return this.http.get<any>(this.baseUrl + "/Jobs/GetAllJob");
  }

  //Get Job By ID
  getJobByID(id: number) {
    return this.http.get<any>(this.baseUrl + "/Jobs/GetJobById=" + id); 
  }

  //get all jobs by company ID
  getAllJobsByCompanyID() {
    return this.http.get<any>(this.baseUrl + "/Jobs/GetAllJobByCompanyId"); 
  }

  //get all jobs with pagination
  getAllJobsWithPagination(pageNumber: number, pageSize: number) {
    return this.http.get<any>(this.baseUrl + "Jobs/GetAllJobWithPagination?PageNumber=" + pageNumber + "&PageSize=" + pageSize);
  }

  //----------Add Jobs
  createJob(Jobs: CreateJobDto, phonesno: any): Observable<any> {
    var requestBody: any = {};

    requestBody['id'] = Jobs.id;
    requestBody['address1'] = Jobs.addressLine1;
    requestBody['address2'] = Jobs.addressLine2;
    requestBody['city'] = Jobs.city;
    requestBody['zip'] = Jobs.zipCode;
    requestBody['faxNo'] = Jobs.faxNo;
    requestBody['mobileNo'] = Jobs.mobileNumber;
    requestBody['officeNo'] = Jobs.officeNumber;
    requestBody['homeNo'] = Jobs.homeNumber;
    requestBody['name'] = Jobs.name;
    requestBody['stateId'] = Jobs.stateId;
    requestBody['startDate'] = Jobs.startDate;
    requestBody['endDate'] = Jobs.endDate;
    requestBody['description'] = Jobs.discription;
    requestBody['leadSourceId'] = Jobs.leadSource;
    requestBody['salesRepsentativeId'] = Jobs.salesRepId;
    requestBody['officeLocationId'] = Jobs.officeLocationId;
    requestBody['workFlowId'] = Jobs.workFlowId;
    requestBody['subContractorId'] = Jobs.subContractorId;
    requestBody['teamMememberId'] = Jobs.TeamMememberId;
    requestBody['relatedContactId'] = Jobs.RelatedContactId;
    requestBody['lastStatusChangeDate'] = Jobs.lastStatusChangeDate;
    requestBody['primaryContactId'] = Jobs.primaryContactId;
    requestBody['jobStatusId'] = Jobs.statusId;

    console.log(requestBody);
    return this.http.post<any>(this.baseUrl + "/Jobs/CreateJob", requestBody);
  }

  updateJob(Jobs: CreateJobDto, phonesno: any): Observable<any> {
    var requestBody: any = {};

    requestBody['id'] = Jobs.id;
    requestBody['name'] = Jobs.name;
    requestBody['address1'] = Jobs.addressLine1;
    requestBody['address2'] = Jobs.addressLine2;
    requestBody['city'] = Jobs.city;
    requestBody['stateId'] = Jobs.stateId;
    requestBody['zip'] = Jobs.zipCode;
    requestBody['jobStatusId'] = Jobs.statusId;
    requestBody['startDate'] = Jobs.startDate;
    requestBody['endDate'] = Jobs.endDate;
    requestBody['description'] = Jobs.discription;
    requestBody['leadSourceId'] = Jobs.leadSource;
    requestBody['salesRepsentativeId'] = Jobs.salesRepId;
    requestBody['primaryContactId'] = Jobs.primaryContactId;
    requestBody['officeLocationId'] = Jobs.officeLocationId;
    requestBody['workFlowId'] = Jobs.workFlowId;
    requestBody['subContractorId'] = Jobs.subContractorId;
    requestBody['relatedContactId'] = Jobs.RelatedContactId;
    requestBody['teamMememberId'] = Jobs.TeamMememberId;

    return this.http.post<any>(this.baseUrl + "/Jobs/UpdateJob", requestBody);
  }

  deleteJob(Jobs: any, phonesno: any) {
    var requestBody: any = {};
    requestBody['id'] = Jobs.id;
    requestBody['name'] = Jobs.name;
    requestBody['address1'] = Jobs.address1;
    requestBody['address2'] = Jobs.address2;
    requestBody['city'] = Jobs.city;
    requestBody['stateId'] = Jobs.stateId;
    requestBody['zip'] = Jobs.zip;
    requestBody['jobStatusId'] = Jobs.jobStatusId;
    requestBody['startDate'] = Jobs.startDate;
    requestBody['endDate'] = Jobs.endDate;
    requestBody['description'] = Jobs.description;
    requestBody['leadSourceId'] = Jobs.leadSourceId;
    requestBody['salesRepsentativeId'] = Jobs.salesRepsentativeId;
    requestBody['lastStatusChangeDate'] = Jobs.lastStatusChangeDate;
    requestBody['primaryContactId'] = Jobs.primaryContactId;
    requestBody['officeLocationId'] = Jobs.officeLocationId;
    requestBody['workFlowId'] = Jobs.workFlowId;
    requestBody['subContractorId'] = Jobs.subContractorId;
    requestBody['relatedContactId'] = Jobs.relatedContactId;
    requestBody['teamMememberId'] = Jobs.teamMememberId;

    console.log(requestBody);

    // const formData = new FormData();
    
    // formData.append('id', Jobs?.id?.toString() ?? "0");
    // formData.append('address1', Jobs?.address1?.toString() ?? "");
    // formData.append('address2', Jobs?.address2?.toString() ?? "");
    // formData.append('city', Jobs?.city?.toString() ?? "");
    // formData.append('stateId', Jobs?.stateId?.toString() ?? "");
    // formData.append('zip', Jobs?.zip?.toString() ?? "");
    // formData.append('jobStatusId', Jobs?.jobStatusId?.toString() ?? "");
    // formData.append('name', Jobs?.name?.toString() ?? "");
    // const startDate = Jobs?.startDate;
    // if (startDate !== undefined) {
    //   const startDateObj = new Date(startDate);
    //   startDateObj.setDate(startDateObj.getDate() + 1);
    //   formData.append('startDate', startDateObj.toISOString());
    // }
    // const endDate = Jobs?.endDate;
    // if (endDate !== undefined) {
    //   const endDateObj = new Date(endDate);
    //   endDateObj.setDate(endDateObj.getDate() + 1);
    //   formData.append('endDate', endDateObj.toISOString());
    // } 
    // formData.append('description', Jobs?.description?.toString() ?? "");
    // formData.append('leadSourceId', Jobs?.leadSourceId?.toString() ?? "");
    // formData.append('salesRepsentativeId', Jobs?.salesRepsentativeId?.toString() ?? "");
    // formData.append('officeLocationId', Jobs?.officeLocationId?.toString() ?? "");
    // formData.append('workFlowId', Jobs?.workFlowId?.toString() ?? "");
    // formData.append('subContractorId', Jobs?.subContractorId?.toString() ?? "");
    // formData.append('primaryContactId', Jobs?.primaryContactId?.toString() ?? "");
    // formData.append('lastStatusChangeDate', Jobs?.lastStatusChangeDate?.toString() ?? "");
    // formData.append('relatedContactId', Jobs?.relatedContactId?.toString() ?? "");
    // formData.append('teamMememberId', Jobs?.teamMememberId?.toString() ?? "");
    
    return this.http.delete<any>(this.baseUrl + "/Jobs/DeleteJob", requestBody);
  }

  //Events Requests

  getEventById (id: number) {
    return this.http.get<any>(this.baseUrl + "/Events/GetEventById?Id=" + id);
  }

  getAllEvents() {
    return this.http.get<any>(this.baseUrl + "/Events/GetAllEvent");
  }

  createEvent(Event: CreateEvetDto): Observable<any> {
    
    if (Event?.id?.toString()) {
      return this.http.put<any>(this.baseUrl + "/Events/UpdateEvent", Event);
    } else {
      return this.http.post<any>(this.baseUrl + "/Events/CreateEvent", Event);
    }
  }

  // JOB status requests

  getJobStatusByID (id: number) {
    return this.http.get<any>(this.baseUrl + "/Events/GetJobsStatusById?Id=" + id);
  }

  getAllJobStatus() {
    return this.http.get<any>(this.baseUrl + "/Events/GetAllJobsStatus");
  }

  createJobStatus(jobStatus: createJobStatusDto): Observable<any> {
    const formData = new FormData();

    formData.append('id', jobStatus?.id?.toString() ?? "");
    formData.append('userId', jobStatus?.userId?.toString() ?? "");
    formData.append('createdBy', jobStatus?.createdBy?.toString() ?? "");
    formData.append('modifiedBy', jobStatus?.modifiedBy?.toString() ?? "");
    formData.append('companyId', jobStatus?.companyId?.toString() ?? "");
    const startDate = jobStatus?.createdDate;
    if (startDate !== undefined) {
      const startDateObj = new Date(startDate);
      startDateObj.setDate(startDateObj.getDate() + 1);
      formData.append('startDate', startDateObj.toISOString());
    }
    const modifiedDate = jobStatus?.modifiedDate;
    if (modifiedDate !== undefined) {
      const modifiedDateObj = new Date(modifiedDate);
      modifiedDateObj.setDate(modifiedDateObj.getDate() + 1);
      formData.append('endDate', modifiedDateObj.toISOString());
    }
    formData.append('jobStatus', jobStatus?.jobStatus?.toString() ?? "");
    formData.append('jobStaus', jobStatus?.jobStaus?.toString() ?? "");
    formData.append('isDeleted', jobStatus?.isDeleted?.toString() ?? "");

    if (jobStatus?.id?.toString()) {
      return this.http.put<any>(this.baseUrl + "/JobStatus/CreateJobStatus", formData);
    } else {
      return this.http.post<any>(this.baseUrl + "/JobStatus/UpdateJobStatus", formData);
    }
  }

  // Lead Source

  getLeadSourceById (id: number) {
    return this.http.get<any>(this.baseUrl + "/LeadSource/GetLeadSourceById?Id=" + id);
  }

  getAllLeadSource () {
    return this.http.get<any>(this.baseUrl + "/LeadSource/GetAllLeadSource");
  }
  
  createLeadSource (leadSource: createLeadSourceDto) {
    const formData = new FormData();

    formData.append('jobId', leadSource?.jobId?.toString() ?? "");
    formData.append('name', leadSource?.name?.toString() ?? "");

    if (leadSource.jobId?.toString()) {
      return this.http.put<any>(this.baseUrl + "/LeadSource/CreateLeadSource", formData);
    } else {
      return this.http.post<any>(this.baseUrl + "/JobStatus/UpdateLeadSource", formData);
    }
  }

  //Tags

  getAllTag () {
    return this.http.get<any>(this.baseUrl + "/Tags/GetAllTag");
  }

  createTag(Tag: createTagDto): Observable<any> {
    const formData = new FormData();

    formData.append('jobId', Tag?.jobId?.toString() ?? "");
    formData.append('name', Tag?.name?.toString() ?? "");

    if (Tag.jobId?.toString()) {
      return this.http.put<any>(this.baseUrl + "/Tags/CreateTag", formData);
    } else {
      return this.http.post<any>(this.baseUrl + "/Tags/UpdateTag", formData);
    }
  } 

  // Work Order

  getWorkOrderById (id: number) {
    return this.http.get<any>(this.baseUrl + "/WorkOrder/GetWorkOrderById?Id=" + id);
  }

  getAllWorkOrder () {
    return this.http.get<any>(this.baseUrl + "/WorkOrder/GetAllWorkOrder");
  }

  createWorkOrder(workOrder: createWorkOrderDto) : Observable<any> {
    workOrder.lastStatusChangeDate = new Date();
    workOrder.contactId = 4;
    
    // if (workOrder?.jobId?.toString()) {
    //   return this.http.post<any>(this.baseUrl + "/WorkOrder/CreateWorkOrder", workOrder);
    // } else {
    //   return this.http.post<any>(this.baseUrl + "/WorkOrder/UpdateWorkOrder", workOrder);
    // }
    console.log(workOrder);

    return this.http.post<any>(this.baseUrl + "/WordOrder/CreateWorkOrder", workOrder);
  }

  //WorkFlow

  getWorkFlowById(id: number) {
    return this.http.get<any>(this.baseUrl + "/WorkFlow/GetWorkFlowById?Id=" + id);
  }

  getAllWorkFlows () {
    return this.http.get<any>(this.baseUrl + "/WorkFlow/GetAllWorkFlows");
  }

  createWorkflow(workFlow: createWorkflowDto): Observable<any> {
    if (workFlow.jobId?.toString()) {
      return this.http.put<any>(this.baseUrl + "/WorkFlow/CreateWorkFlow", workFlow);
    } else {
      return this.http.post<any>(this.baseUrl + "/WorkFlow/UpdateWorkFlow", workFlow);
    }
  }
}
