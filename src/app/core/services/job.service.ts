import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AppConfig } from '../app-config';
import { UtilityService } from './shared/UtilityService';
import { JobDTO } from '../interfaces';
import { EventDTO } from 'src/app/modules/job/createEventDto';
import { createJobStatusDto } from 'src/app/modules/job/createJobStatusDto';
import { createLeadSourceDto } from 'src/app/modules/job/createLeadSourceDto';
import { createTagDto } from 'src/app/modules/job/createTagDto';
import { createWorkOrderDto } from 'src/app/modules/job/createWorkOrderDto';
import { createWorkflowDto } from 'src/app/modules/job/createWorkflowDto';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  baseUrl = AppConfig.Base_url;
  constructor(
    private utilityService: UtilityService,
    private http: HttpClient
  ) {}

  //-----------Office Locations
  allOfficeLocations() {
    return this.http.get<any>(AppConfig.OfficeLocation.allOfficeLocations);
  }

  allSalesRep() {
    return this.http.get<any>(
      AppConfig.SalesRepresentative.getsalesrepresentative
    );
  }

  allWorkFlows() {
    return this.http.get<any>(AppConfig.WorkFlow.allWorkFlows);
  }

  allStatus() {
    return this.http.get<any>(AppConfig.status.allStatuses);
  }

  allSubcontractors() {
    return this.http.get<any>(AppConfig.SubContractor.getsubcontractors);
  }

  allRelatedContacts() {
    return this.http.get<any>(AppConfig.RelatedContact.getRelatedContactsDropDown);
  }

  ///TeamMember/getteammebers
  allTeamMembers() {
    return this.http.get<any>(AppConfig.TeamMember.getteammebers);
  }

  allphoneTypes() {
    return this.http.get<any>(
      AppConfig.DropDown.allDropDownsList + '?PageName=addcontact'
    );
  }
  allSource() {
    return this.http.get<any>(
      AppConfig.DropDown.allDropDownsList + '?PageName=addcontact'
    );
  }
  allState() {
    return this.http.get<any>(AppConfig.States);
  }

  //Job Requests

  //---------Get Jobs
  getAllJob() {
    return this.http.get<any>(AppConfig.Jobs.GetAllJob);
  }

  //Get Job By ID
  getJobByID(id: number) {
    return this.http.get<any>(AppConfig.Jobs.GetJobById);
  }

  //get all jobs by company ID
  getAllJobsByCompanyID() {
    return this.http.get<JobDTO[]>(AppConfig.Jobs.GetAllJobByCompanyId);
  }

  //get all jobs with pagination
  getAllJobsWithPagination(pageNumber: number, pageSize: number) {
    return this.http.get<any>(
      AppConfig.Jobs.GetAllJobWithPagination + pageNumber + '&PageSize=' + pageSize
    );
  }

  //----------Add Jobs
  createJob(requestBody: JobDTO, phonesno: any): Observable<any> {
    return this.http.post<any>(AppConfig.Jobs.CreateJob, requestBody, null);
  }

  updateJob(requestBody: JobDTO, phonesno: any): Observable<any> {
    return this.http.post<any>(AppConfig.Jobs.UpdateJob, requestBody, {
      params: { id: requestBody.id },
    });
  }

  deleteJob(Jobs: any) {
    return this.http.delete<any>(AppConfig.Jobs.DeleteJob, { body: Jobs });
  }

  //Events Requests

  getEventById(id: number) {
    return this.http.get<any>(AppConfig.Events.GetEventById, {
      params: { id: id },
    });
  }

  getAllEvents() {
    return this.http.get<any>(AppConfig.Events.GetAllEvent);
  }

  createEvent(Event: EventDTO): Observable<any> {
    if (Event?.id?.toString()) {
      return this.http.put<any>(AppConfig.Events.UpdateEvent, Event, {
        params: Event?.id.toString(),
      });
    } else {
      return this.http.post<any>(AppConfig.Events.CreateEvent, Event, null);
    }
  }

  // JOB status requests

  getJobStatusByID(id: number) {
    return this.http.get<any>(AppConfig.Events.GetJobsStatusById, {
      params: { Id: id },
    });
  }

  getAllJobStatus() {
    return this.http.get<any>(AppConfig.Events.GetAllJobsStatus);
  }

  createJobStatus(jobStatus: createJobStatusDto): Observable<any> {
    const formData = new FormData();
    formData.append('id', jobStatus?.id?.toString() ?? '');
    formData.append('userId', jobStatus?.userId?.toString() ?? '');
    formData.append('createdBy', jobStatus?.createdBy?.toString() ?? '');
    formData.append('modifiedBy', jobStatus?.modifiedBy?.toString() ?? '');
    formData.append('companyId', jobStatus?.companyId?.toString() ?? '');
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
    formData.append('jobStatus', jobStatus?.jobStatus?.toString() ?? '');
    formData.append('jobStaus', jobStatus?.jobStaus?.toString() ?? '');
    formData.append('isDeleted', jobStatus?.isDeleted?.toString() ?? '');

    if (jobStatus?.id?.toString()) {
      const url = AppConfig.JobStatus.CreateJobStatus;
      return this.http.put<any>(url, formData);
    } else {
      const url = AppConfig.JobStatus.UpdateJobStatus;
      const params = { Id: jobStatus?.id?.toString() };
      return this.http.post<any>(url, formData, { params });
    }
  }

  // Lead Source

  getLeadSourceById(id: number): Observable<any> {
    const url = `${AppConfig.LeadSource.GetLeadSourceById}/${id}`;
    return this.http.get<any>(url);
  }

  getAllLeadSource(): Observable<any> {
    const url = AppConfig.LeadSource.GetAllLeadSource;
    return this.http.get<any>(url);
  }

  createLeadSource(leadSource: createLeadSourceDto): Observable<any> {
    const formData = new FormData();
    formData.append('jobId', leadSource?.jobId?.toString() ?? '');
    formData.append('name', leadSource?.name?.toString() ?? '');

    if (leadSource.jobId?.toString()) {
      const url = `${AppConfig.LeadSource.CreateLeadSource}/${leadSource.jobId}`;
      return this.http.put<any>(url, formData);
    } else {
      const url = AppConfig.LeadSource.CreateLeadSource;
      const params = { id: leadSource.jobId?.toString() };
      return this.http.post<any>(url, formData, { params });
    }
  }
  //Tags

  getAllTag() {
    return this.http.get<any>(AppConfig.Tags.GetAllTag);
  }

  createTag(tag: createTagDto): Observable<any> {
    const formData = new FormData();
    formData.append('jobId', tag?.jobId?.toString() ?? '');
    formData.append('name', tag?.name?.toString() ?? '');

    if (tag.jobId?.toString()) {
      const url = AppConfig.Tags.CreateTag;
      return this.http.put<any>(url, formData);
    } else {
      const url = AppConfig.Tags.UpdateTag;
      const jobIdParam = tag?.jobId?.toString() ?? '';
      const params = { Id: jobIdParam };
      return this.http.post<any>(url, formData, { params });
    }
  }

  // Work Order
  getWorkOrderById(id: number): Observable<any> {
    const url = `${AppConfig.WorkOrder.GetWorkOrderById}/${id}`;
    return this.http.get<any>(url);
  }

  getAllWorkOrder(): Observable<any> {
    const url = AppConfig.WorkOrder.GetAllWorkOrder;
    return this.http.get<any>(url);
  }

  createWorkOrder(workOrder: createWorkOrderDto): Observable<any> {
    workOrder.lastStatusChangeDate = new Date();
    workOrder.contactId = 4;
    const url = AppConfig.WorkOrder.CreateWorkOrder;
    return this.http.post<any>(url, workOrder);
  }

  //WorkFlow
  getWorkFlowById(id: number): Observable<any> {
    const url = `${AppConfig.WorkFlow.GetWorkFlowById}/${id}`;
    return this.http.get<any>(url, { params: { id: id.toString() } });
  }

  getAllWorkFlows(): Observable<any> {
    const url = AppConfig.WorkFlow.allWorkFlows;
    return this.http.get<any>(url);
  }

  createWorkflow(workFlow: createWorkflowDto): Observable<any> {
    if (workFlow.jobId?.toString()) {
      const url = `${AppConfig.WorkFlow.UpdateWorkFlow}/${workFlow.jobId}`;
      return this.http.put<any>(url, workFlow);
    } else {
      const url = AppConfig.WorkFlow.CreateWorkFlow;
      return this.http.post<any>(url, workFlow);
    }
  }
}
