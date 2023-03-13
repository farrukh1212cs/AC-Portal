import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateContactDto } from './CreateContactDto';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = environment.apiUrl;
  contactDto: any ;

  constructor(private http: HttpClient, private router: Router) { }


  allResult() {
    return this.http.get<any>(this.baseUrl + "/Contact/allContacts");
  }

  //===================================================================
  //-----------officeLocations
  allOfficeLocations(){
    return this.http.get<any>(this.baseUrl + "/OfficeLocation/officelocationsdropdown");
  }

  //-----------officeLocations
  allSalesRep(){
    return this.http.get<any>(this.baseUrl + "/SalesRepresentative/getsalesrepresentative");
  }
  allWorkFlows(){
    return this.http.get<any>(this.baseUrl + "/WorkFlow/allWorkFlows");
  }
  allStatus(){
    return this.http.get<any>(this.baseUrl + "/Status/allStatuses");
  }
  allSubcontractors(){
    return this.http.get<any>(this.baseUrl + "/SubContractor/getsubcontractors");
  }
  allRelatedContacts(){
    return this.http.get<any>(this.baseUrl + "/RelatedContact/getRelatedContactsDropDown");
  }
  ///TeamMember/getteammebers
  allTeamMembers(){
    return this.http.get<any>(this.baseUrl + "/TeamMember/getteammebers");
  }
  allSource(){
    return this.http.get<any>(this.baseUrl + "/DropDown/allDropDownsList?PageName=addcontact");
  }
  allState(){
    return this.http.get<any>(this.baseUrl + "/States");
  }
  //===================================================================
  //-----------
 //---------------------
 

  create(contact: FormData){

    return this.http.post<any>("https://localhost:7063/api/contact/addContact", contact);   
  }


createContact(contact: CreateContactDto, img : any): Observable<any> {

  const url = `${this.baseUrl}/addContact`;
  const formData = new FormData();
  formData.append('firstName', contact.firstName);
  formData.append('lastName', contact.lastName);
formData.append('company', contact.company);
  formData.append('addressLine1', contact?.addressLine1?.toString() ?? "");
  formData.append('addressLine2', contact?.addressLine2?.toString() ?? "");
  formData.append('city', contact?.city?.toString() ?? "");
  formData.append('zipCode', contact?.zipCode?.toString() ?? "");
  formData.append('email', contact?.email?.toString() ?? "");
  formData.append('website', contact.website as string);
  formData.append('faxNo', contact?.faxNo?.toString() ?? "");
  formData.append('displayName',contact?.displayName?.toString() ?? "");
  formData.append('startDate', contact?.startDate?.toISOString() ?? "");
  formData.append('endDate', contact?.endDate?.toISOString() ?? "");
  formData.append('discription', contact?.discription?.toString() ?? "");
  formData.append('sourceId', contact?.sourceId?.toString() ?? "");
  formData.append('stateId', contact?.stateId?.toString() ?? "");
  formData.append('salesRepId', contact?.salesRepId?.toString() ?? "");
  formData.append('subContractorId', contact?.subContractorId?.toString() ?? "");
  contact?.teamMembers?.forEach((id?) => formData.append('teamMembers[]', id?.toString()));
  formData.append('officeLocationId', contact?.officeLocationId?.toString() ?? "");
  formData.append('workFlowId', contact?.workFlowId?.toString() ?? "");
  formData.append('statusId', contact?.statusId?.toString() ?? "");
  contact?.relatedContacts?.forEach((id) => formData.append('relatedContacts[]', id.toString()));
  // if (contact.tags) {
  //   contact.tags.forEach((tag) => formData.append('tags[]', tag));
  // }
  // if (contact.note) {
  //   formData.append('note.title', contact.note.title);
  //   formData.append('note.text', contact.note.text);
  // }
  // if (contact.phoneNumbers) {
  //   contact.phoneNumbers.forEach((phone) => {
  //     formData.append(`phoneNumbers[${phone.type}].number`, phone.number);
  //     formData.append(`phoneNumbers[${phone.type}].extension`, phone.extension);
  //   });
  // }
  // if (contact.customFields) {
  //   contact.customFields.forEach((field) => {
  //     formData.append(`customFields[${field.fieldName}].fieldValue`, field.fieldValue);
  //     formData.append(`customFields[${field.fieldName}].fieldType`, field.fieldType.toString());
  //   });
  // }
  if (img != null) {
    formData.append('file', img, img.name);
  }
  return this.http.post<any>(this.baseUrl + "/Contact/addContact", formData);
}
  //--------------
}
