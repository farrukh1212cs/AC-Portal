import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateContactDto } from './CreateContactDto';
import { CreatePhoneNumbersDto } from './CreatePhoneNumbersDto';

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
  allphoneTypes(){
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


createContact(contact: CreateContactDto, img : any,phonesno : any): Observable<any> {
  const formData = new FormData();
  if(contact?.id?.toString())
  {
    formData.append('id', contact?.id?.toString() ?? "0");
  }

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

  const startDate = contact?.startDate;
      if (startDate !== undefined) {
        const startDateObj = new Date(startDate);
        startDateObj.setDate(startDateObj.getDate() + 1);
        formData.append('startDate', startDateObj.toISOString());
        // Use startDateISOString in the request body
      }
      const endDate = contact?.endDate;
      if (endDate !== undefined) {
        const endDateObj = new Date(endDate);
        endDateObj.setDate(endDateObj.getDate() + 1);
        formData.append('endDate', endDateObj.toISOString());
        // Use startDateISOString in the request body
      }
  // formData.append('endDate',new Date(contact?.endDate?.toString() ?? "").toISOString()  ?? "");
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
  debugger;
  phonesno?.forEach((phoneNumber : any, index : number) => {
    const keyPrefix = `phoneNumbers[${index}]`;  
    formData.append(`${keyPrefix}.phoneNumber`, phoneNumber.phoneNumber);
    formData.append(`${keyPrefix}.typeId`, phoneNumber.typeId);
    formData.append(`${keyPrefix}.id`, phoneNumber.id ?? "0");

  });
  if (contact.tags) {
    contact.tags.forEach((tag:any) => formData.append('tags[]', tag.value));
  }
  // if (contact.note) {
  //   formData.append('note.title', contact.note.title);
  //   formData.append('note.text', contact.note.text);
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
  if(contact?.id?.toString())
  {  return this.http.put<any>("https://localhost:7063/api/Contact/updateContact", formData);

  }else
  {
    return this.http.post<any>("https://localhost:7063/api/Contact/addContact", formData);
  
  }

}
  //--------------
}
