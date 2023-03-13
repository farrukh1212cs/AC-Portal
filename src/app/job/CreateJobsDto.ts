export interface CreateJobDto {
  id?: number;
  usesId?: number;
  createdBy?: number;
  companyId?: number;
  createdDate?: Date;
  modifiedDate?: Date;
  isDeleted?: true;
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: number;
  jobStatus?: number;
  startDate?: Date;
  endDate: Date;
  description?: string;
  leadSource?: string;
  lastStatusChangeDate?: Date;
  lastActivityDate?: Date;
  primaryContactId?: number;
  officeLocationId?: number;
  workFlowId?: number;
  salesRepId?: number;
  productioManagerId?: number;
  timelineId?: number;
  relatedJobs?: number[];
  tags?: string[];
  note?: CreateNotesDto;
  phoneNumbers?: CreatePhoneNumbersDto[];
  customFields?: CreateCustomFieldsDto[];
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
