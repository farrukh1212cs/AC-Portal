import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CreateJobDto } from '../../job/CreateJobsDto';
import { CreateEvetDto, EventDTO } from '../../job/createEventDto';
import { createJobStatusDto } from '../../job/createJobStatusDto';
import { createLeadSourceDto } from '../../job/createLeadSourceDto';
import { createTagDto } from '../../job/createTagDto';
import { createWorkOrderDto } from '../../job/createWorkOrderDto';
import { createWorkflowDto } from '../../job/createWorkflowDto';
import { config } from '../app-config';
import { UtilityService } from './shared/UtilityService';
import { JobDTO } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  baseUrl = config.Base_url;
  constructor(private utilityService: UtilityService) {}

  //-----------Office Locations
  allOfficeLocations() {
    return this.utilityService.get<any>(
      config.OfficeLocation.allOfficeLocations
    );
  }

  allSalesRep() {
    return this.utilityService.get<any>(
      config.SalesRepresentative.getsalesrepresentative
    );
  }

  allWorkFlows() {
    return this.utilityService.get<any>(config.WorkFlow.allWorkFlows);
  }

  allStatus() {
    return this.utilityService.get<any>(config.status.allStatuses);
  }

  allSubcontractors() {
    return this.utilityService.get<any>(config.SubContractor.getsubcontractors);
  }

  allRelatedContacts() {
    return this.utilityService.get<any>(
      config.RelatedContact.getRelatedContactsDropDown
    );
  }

  ///TeamMember/getteammebers
  allTeamMembers() {
    return this.utilityService.get<any>(config.TeamMember.getteammebers);
  }

  allphoneTypes() {
    return this.utilityService.get<any>(
      config.DropDown.allDropDownsList + '?PageName=addcontact'
    );
  }
  allSource() {
    return this.utilityService.get<any>(
      config.DropDown.allDropDownsList + '?PageName=addcontact'
    );
  }
  allState() {
    return this.utilityService.get<any>(config.States);
  }

  //Job Requests

  //---------Get Jobs
  getAllJob() {
    return this.utilityService.get<any>(config.Jobs.GetAllJob);
  }

  //Get Job By ID
  getJobByID(id: number) {
    return this.utilityService.get<any>(config.Jobs.GetJobById, id, { id: id });
  }

  //get all jobs by company ID
  getAllJobsByCompanyID() {
    return this.utilityService.get<JobDTO[]>(config.Jobs.GetAllJobByCompanyId);
  }

  //get all jobs with pagination
  getAllJobsWithPagination(pageNumber: number, pageSize: number) {
    return this.utilityService.get<any>(
      config.Jobs.GetAllJobWithPagination + pageNumber + '&PageSize=' + pageSize
    );
  }

  //----------Add Jobs
  createJob(requestBody: JobDTO, phonesno: any): Observable<any> {
    console.log(requestBody);
    return this.utilityService.post<any>(
      config.Jobs.CreateJob,
      requestBody,
      null
    );
  }

  updateJob(requestBody: JobDTO, phonesno: any): Observable<any> {
    return this.utilityService.post<any>(
      config.Jobs.UpdateJob,
      requestBody,
      requestBody.id.toString(),
      { id: requestBody.id }
    );
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

    return this.utilityService.delete<any>(
      Jobs.id,
      config.Jobs.DeleteJob,
      { id: Jobs.id },
      requestBody
    );
  }

  //Events Requests

  getEventById(id: number) {
    return this.utilityService.get<any>(config.Events.GetEventById, 0, {
      id: id,
    });
  }

  getAllEvents() {
    return this.utilityService.get<any>(config.Events.GetAllEvent);
  }

  createEvent(Event: EventDTO): Observable<any> {
    if (Event?.id?.toString()) {
      return this.utilityService.put<any>(
        config.Events.UpdateEvent,
        Event,
        Event?.id.toString(),
        { id: Event?.id ?? 0 }
      );
    } else {
      return this.utilityService.post<any>(
        config.Events.CreateEvent,
        Event,
        null
      );
    }
  }

  // JOB status requests

  getJobStatusByID(id: number) {
    return this.utilityService.get<any>(config.Events.GetJobsStatusById, id, {
      Id: id,
    });
  }

  getAllJobStatus() {
    return this.utilityService.get<any>(config.Events.GetAllJobsStatus);
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
      return this.utilityService.put<any>(
        config.JobStatus.CreateJobStatus,
        formData,
        null
      );
    } else {
      return this.utilityService.post<any>(
        config.JobStatus.UpdateJobStatus,
        formData,
        jobStatus?.id?.toString(),
        { Id: jobStatus?.id?.toString() }
      );
    }
  }

  // Lead Source

  getLeadSourceById(id: number) {
    return this.utilityService.get<any>(
      config.LeadSource.GetLeadSourceById,
      id,
      { Id: id }
    );
  }

  getAllLeadSource() {
    return this.utilityService.get<any>(config.LeadSource.GetAllLeadSource);
  }

  createLeadSource(leadSource: createLeadSourceDto) {
    const formData = new FormData();

    formData.append('jobId', leadSource?.jobId?.toString() ?? '');
    formData.append('name', leadSource?.name?.toString() ?? '');

    if (leadSource.jobId?.toString()) {
      return this.utilityService.put<any>(
        config.LeadSource.CreateLeadSource,
        formData,
        leadSource?.jobId?.toString()
      );
    } else {
      return this.utilityService.post<any>(
        config.LeadSource.CreateLeadSource,
        formData,
        null,
        { id: leadSource.jobId?.toString() }
      );
    }
  }

  //Tags

  getAllTag() {
    return this.utilityService.get<any>(config.Tags.GetAllTag);
  }

  createTag(Tag: createTagDto): Observable<any> {
    const formData = new FormData();

    formData.append('jobId', Tag?.jobId?.toString() ?? '');
    formData.append('name', Tag?.name?.toString() ?? '');

    if (Tag.jobId?.toString()) {
      return this.utilityService.put<any>(
        config.Tags.CreateTag,
        formData,
        null
      );
    } else {
      return this.utilityService.post<any>(
        config.Tags.UpdateTag,
        formData,
        Tag.jobId?.toString() ?? '',
        { Id: Tag?.jobId ?? '' }
      );
    }
  }

  // Work Order

  getWorkOrderById(id: number) {
    return this.utilityService.get<any>(
      config.WorkOrder.GetWorkOrderById,
      id,
      {}
    );
  }

  getAllWorkOrder() {
    return this.utilityService.get<any>(config.WorkOrder.GetAllWorkOrder);
  }

  createWorkOrder(workOrder: createWorkOrderDto): Observable<any> {
    workOrder.lastStatusChangeDate = new Date();
    workOrder.contactId = 4;

    // if (workOrder?.jobId?.toString()) {
    //   return this.utilityService.post<any>(this.baseUrl + "/WorkOrder/CreateWorkOrder", workOrder);
    // } else {
    //   return this.utilityService.post<any>(this.baseUrl + "/WorkOrder/UpdateWorkOrder", workOrder);
    // }
    console.log(workOrder);
    return this.utilityService.post<any>(
      config.WorkOrder.CreateWorkOrder,
      workOrder,
      null,
      null
    );
  }

  //WorkFlow

  getWorkFlowById(id: number) {
    return this.utilityService.get<any>(config.WorkFlow.GetWorkFlowById, 0, {
      id: id,
    });
  }

  getAllWorkFlows() {
    return this.utilityService.get<any>(config.WorkFlow.allWorkFlows);
  }

  createWorkflow(workFlow: createWorkflowDto): Observable<any> {
    if (workFlow.jobId?.toString()) {
      return this.utilityService.put<any>(
        config.WorkFlow.UpdateWorkFlow,
        workFlow,
        workFlow.jobId.toString()
      );
    } else {
      return this.utilityService.post<any>(
        config.WorkFlow.CreateWorkFlow,
        workFlow,
        null
      );
    }
  }
}
