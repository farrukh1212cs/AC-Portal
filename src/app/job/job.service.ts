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

  deleteJob(Jobs: CreateJobDto, phonesno: any) {
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
    
    return this.http.put<any>(this.baseUrl + "/Jobs/CreateJob", formData);
  }

  //Events Requests

  getEventById (id: number) {
    return this.http.get<any>(this.baseUrl + "/Events/GetEventById?Id=" + id);
  }

  getAllEvents() {
    return this.http.get<any>(this.baseUrl + "/Events/GetAllEvent");
  }

  createEvent(Event: CreateEvetDto): Observable<any> {
    const formData = new FormData();
    
    formData.append('eventType', Event?.eventType?.toString() ?? "");
    formData.append('eventPriority', Event?.eventPriority?.toString() ?? "");
    formData.append('eventName', Event?.eventName?.toString() ?? "");
    formData.append('eventStatus', Event?.eventStatus?.toString() ?? "");
    formData.append('estimatedDuration', Event?.estimatedDuration?.toString() ?? "");
    formData.append('description', Event?.description?.toString() ?? "");
    formData.append('tags', Event?.tags?.toString() ?? "");
    const startDate = Event?.startDate;
    if (startDate !== undefined) {
      const startDateObj = new Date(startDate);
      startDateObj.setDate(startDateObj.getDate() + 1);
      formData.append('startDate', startDateObj.toISOString());
    }
    const endDate = Event?.endDate;
    if (endDate !== undefined) {
      const endDateObj = new Date(endDate);
      endDateObj.setDate(endDateObj.getDate() + 1);
      formData.append('endDate', endDateObj.toISOString());
    }
    const lastStatusChangeDate = Event?.lastStatusChangeDate;
    if (lastStatusChangeDate !== undefined) {
      const lastStatusChangeDateObj = new Date(lastStatusChangeDate);
      lastStatusChangeDateObj.setDate(lastStatusChangeDateObj.getDate() + 1);
      formData.append('lastStatusChangeDate', lastStatusChangeDateObj.toISOString());
    }
    if (Event?.jobId?.toString()) {
      formData.append('jobId', Event?.jobId?.toString() ?? "0");
    }

    if (Event?.jobId?.toString()) {
      return this.http.put<any>(this.baseUrl + "/Events/CreateEvent", formData);
    } else {
      return this.http.post<any>(this.baseUrl + "/Events/CreateEvent", formData);
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
    const formData = new FormData();

    formData.append('workOrderPriority', workOrder?.workOrderPriority?.toString() ?? "");
    formData.append('name', workOrder?.name?.toString() ?? "");
    formData.append('workOrderStatus', workOrder?.workOrderStatus?.toString() ?? "");
    formData.append('notes', workOrder?.notes?.toString() ?? "");
    formData.append('contactId', workOrder?.contactId?.toString() ?? "");
    formData.append('jobId', workOrder?.jobId?.toString() ?? "");

    const startDate = workOrder?.startDate;
    if (startDate !== undefined) {
      const startDateObj = new Date(startDate);
      startDateObj.setDate(startDateObj.getDate() + 1);
      formData.append('startDate', startDateObj.toISOString());
    }
    const dueDate = workOrder?.dueDate;
    if (dueDate !== undefined) {
      const dueDateObj = new Date(dueDate);
      dueDateObj.setDate(dueDateObj.getDate() + 1);
      formData.append('endDate', dueDateObj.toISOString());
    }
    const lastStatusChangeDate = workOrder?.lastStatusChangeDate;
    if (lastStatusChangeDate !== undefined) {
      const lastStatusChangeDateObj = new Date(lastStatusChangeDate);
      lastStatusChangeDateObj.setDate(lastStatusChangeDateObj.getDate() + 1);
      formData.append('endDate', lastStatusChangeDateObj.toISOString());
    }
    
    if (workOrder?.jobId?.toString()) {
      return this.http.put<any>(this.baseUrl + "/WorkOrder/CreateWorkOrder", formData);
    } else {
      return this.http.post<any>(this.baseUrl + "/WorkOrder/UpdateWorkOrder", formData);
    }
  }

  //WorkFlow

  getWorkFlowById(id: number) {
    return this.http.get<any>(this.baseUrl + "/WorkFlow/GetWorkFlowById?Id=" + id);
  }

  getAllWorkFlows () {
    return this.http.get<any>(this.baseUrl + "/WorkFlow/GetAllWorkFlows");
  }

  createWorkflow(workFlow: createWorkflowDto): Observable<any> {
    const formData = new FormData();

    formData.append('name', workFlow?.name?.toString() ?? "");
    formData.append('description', workFlow?.description?.toString() ?? "");
    formData.append('jobId', workFlow?.jobId?.toString() ?? "");

    if (workFlow.jobId?.toString()) {
      return this.http.put<any>(this.baseUrl + "/WorkFlow/CreateWorkFlow", formData);
    } else {
      return this.http.post<any>(this.baseUrl + "/WorkFlow/UpdateWorkFlow", formData);
    }
  }
}
