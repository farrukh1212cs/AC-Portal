import { environment } from 'src/environments/environment';
const API_URL = environment.apiBaseUrl;

export const config = {
  Base_url: API_URL,
  auth: {
    login: `${API_URL}/login`,
    register: `${API_URL}/register`,
  },
  status: {
    allStatuses: `${API_URL}/Status/allStatuses`,
  },
  SubContractor: {
    getsubcontractors: `${API_URL}/SubContractor/getsubcontractors`,
  },
  RelatedContact: {
    getRelatedContactsDropDown: `${API_URL}/RelatedContact/getRelatedContactsDropDown`,
  },
  BussinessHours: {
    Add: `${API_URL}/BussinessHours/Add`,
    Update: `${API_URL}/BussinessHours/Update`,
    Delete: `${API_URL}/BussinessHours/Delete`,
    Getbyid: `${API_URL}/BussinessHours/Getbyid`,
    Pagedbussinesshours: `${API_URL}/BussinessHours/Pagedbussinesshours`,
    Allbussinesshours: `${API_URL}/BussinessHours/Allbussinesshours`,
  },
  Company: {
    PagedCompamnies: `${API_URL}/Company/PagedCompamnies`,
    allCompamnies: `${API_URL}/Company/allCompamnies`,
  },
  DropDown: {
    allDropDownsList: `${API_URL}/DropDown/allDropDownsList`,
    getDropDownChilds: `${API_URL}/DropDown/getDropDownChilds`,
  },
  OfficeLocation: {
    addOfficeLocation: `${API_URL}/OfficeLocation/addOfficeLocation`,
    updateOfficeLocation: `${API_URL}/OfficeLocation/updateOfficeLocation`,
    getOfficeLocationById: `${API_URL}/OfficeLocation/getOfficeLocationById`,
    PagedOfficeLocations: `${API_URL}/OfficeLocation/PagedOfficeLocations`,
    allOfficeLocations: `${API_URL}/OfficeLocation/allOfficeLocations`,
    officelocationsdropdown: `${API_URL}/OfficeLocation/officelocationsdropdown`,
  },
  SalesRepresentative: {
    getsalesrepresentative: `${API_URL}/SalesRepresentative/getsalesrepresentative`,
  },
  States: `${API_URL}/States`,
  TeamMember: {
    add: `${API_URL}/TeamMember/add`,
    update: `${API_URL}/TeamMember/update`,
    disablelogin: `${API_URL}/TeamMember/disablelogin`,
    getteammebers: `${API_URL}/TeamMember/getteammebers`,
  },
  TimeZone: `${API_URL}/TimeZone`,
  Contact: {
    PagedContacts: `${API_URL}/Contact/PagedContacts`,
    addContact: `${API_URL}/Contact/addContact`,
    allContacts: `${API_URL}/Contact/allContacts`,
    deleteContact: `${API_URL}/Contact/deleteContact`,
    getContactById: `${API_URL}/Contact/getContactById`,
    updateContact: `${API_URL}/Contact/updateContact`,
  },
  WorkFlow: {
    allWorkFlows: `${API_URL}/WorkFlow/allWorkFlows`,
    GetWorkFlowById: `${API_URL}/WorkFlow/GetWorkFlowById`,
    CreateWorkFlow: `${API_URL}/WorkFlow/CreateWorkFlow`,
    UpdateWorkFlow: `${API_URL}/WorkFlow/UpdateWorkFlow`,
  },
  Jobs: {
    CreateJob: `${API_URL}/Jobs/CreateJob`,
    GetAllJob: `${API_URL}/Jobs/GetAllJob`,
    GetJobById: `${API_URL}/Jobs/GetJobById`,
    UpdateJob: `${API_URL}/Jobs/UpdateJob`,
    GetAllJobByCompanyId: `${API_URL}/Jobs/GetAllJobByCompanyId`,
    GetAllJobWithPagination: `${API_URL}/Jobs/GetAllJobWithPagination?PageNumber=`,
    DeleteJob: `${API_URL}/Jobs/DeleteJob`,
  },
  Events: {
    GetEventById: `${API_URL}/Events/GetEventById`,
    UpdateEvent: `${API_URL}/Events/UpdateEvent`,
    GetAllEvent: `${API_URL}/Events/GetAllEvent`,
    CreateEvent: `${API_URL}/Events/CreateEvent`,
    GetJobsStatusById: `${API_URL}/Events/GetJobsStatusById`,
    GetAllJobsStatus: `${API_URL}/Events/GetAllJobsStatus`,
  },
  JobStatus: {
    CreateJobStatus: `${API_URL}/JobStatus/CreateJobStatus`,
    UpdateJobStatus: `${API_URL}/JobStatus/UpdateJobStatus`,
    UpdateLeadSource: `${API_URL}/JobStatus/UpdateLeadSource`,
  },
  LeadSource: {
    GetLeadSourceById: `${API_URL}/LeadSource/GetLeadSourceById`,
    GetAllLeadSource: `${API_URL}/LeadSource/GetAllLeadSource`,
    CreateLeadSource: `${API_URL}/LeadSource/CreateLeadSource`,
  },
  Tags: {
    CreateTag: `${API_URL}/Tags/CreateTag`,
    UpdateTag: `${API_URL}/Tags/UpdateTag`,
    GetAllTag: `${API_URL}/Tags/GetAllTag`,
  },
  WorkOrder: {
    GetWorkOrderById: `${API_URL}/WorkOrder/GetWorkOrderById`,
    CreateWorkOrder: `${API_URL}/WorkOrder/CreateWorkOrder`,
    UpdateWorkOrder: `${API_URL}/WorkOrder/UpdateWorkOrder`,
    DeleteWorkOrder: `${API_URL}/WorkOrder/DeleteWorkOrder`,
    GetAllWorkOrder: `${API_URL}/WorkOrder/GetAllWorkOrder`,
  },
};
