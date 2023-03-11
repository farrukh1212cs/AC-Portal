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

  //-----------officeLocations
  allOfficeLocations(){
    return this.http.get<any>(this.baseUrl + "/OfficeLocation/officelocationsdropdown");
  }
  //-----------
 //---------------------
 
createContact(contact: CreateContactDto): Observable<any> {
  const url = `${this.baseUrl}/addContact`;
  const formData = new FormData();
  formData.append('firstName', contact.firstName);
  formData.append('lastName', contact.lastName);
  formData.append('company', contact.company);
   formData.append('addressLine1', "123");
   formData.append('addressLine2', "123");
   formData.append('city', "123");
  // formData.append('zipCode', contact.zipCode.toString());
   formData.append('email', "123@g.com");
  // formData.append('website', contact.website);
   formData.append('faxNo', "123");
   formData.append('displayName', "123");
  // formData.append('startDate', contact.startDate.toISOString());
  // formData.append('endDate', contact.endDate.toISOString());
   formData.append('discription', "123");
  //formData.append('sourceId', contact.sourceId.toString());
  //formData.append('stateId', contact.stateId.toString());
  //formData.append('salesRepId', contact.salesRepId.toString());
 // formData.append('subContractorId', contact.subContractorId.toString());
  //contact.teamMembers.forEach((id) => formData.append('teamMembers[]', id.toString()));
  //formData.append('officeLocationId', contact.officeLocationId.toString());
 // formData.append('workFlowId', contact.workFlowId.toString());
  //formData.append('statusId', contact.statusId.toString());
  //contact.relatedContacts.forEach((id) => formData.append('relatedContacts[]', id.toString()));
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
  // if (contact.file) {
  //   formData.append('file', contact.file, contact.file.name);
  // }
  return this.http.post<any>("https://localhost:7063/api/contact/addContact", formData);
}
  //--------------
}
