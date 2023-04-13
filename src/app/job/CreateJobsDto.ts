export interface CreateJobDto {
  id?: number;
  usesId?: number;
  createdBy?: number;
  companyId?: number;
  createdDate?: Date;
  modifiedDate?: Date;
  isDeleted?: true;
  jobName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  stateId?: number;
  zipCode?: number;
  statusId?: number;
  startDate?: Date;
  endDate?: Date;
  discription?: string;
  leadSource?: string;
  sourceId?: number;
  lastStatusChangeDate?: Date;
  lastActivityDate?: Date;
  primaryContactId?: number;
  officeLocationId?: number;
  workFlowId?: number;
  salesRepId?: number;
  subContractorId?: number;
  productioManagerId?: number;
  timelineId?: number;
  relatedJobs?: number[];
  tags?: string[];
  note?: CreateNotesDto;
  teamMembers?: number[];
  relatedContacts?: number[];
  displayName?: string;
  phoneNumbers?: CreatePhoneNumbersDto[];
  customFields?: CreateCustomFieldsDto[];
  mobileNumber: number;
  }
  
  export interface CreateNotesDto {
    text: string;
  }
  
  export interface CreatePhoneNumbersDto {
    type: string;
    number: string;
  }
  
  export interface CreateCustomFieldsDto {
    name: string;
    value: string;
  }
