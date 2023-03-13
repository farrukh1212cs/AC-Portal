import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactService } from '../contact.service';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateContactDto } from '../CreateContactDto';


@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent  implements OnInit {
  contactForm!: FormGroup;
  contactDto?: CreateContactDto;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      zipCode: [''],
      email: ['', Validators.email],
      website: [''],
      faxNo: [''],
      displayName: [''],
      startDate: [''],
      endDate: [''],
      discription: [''],
      file: [''],
      sourceId: [''],
      stateId: [''],
      salesRepId: [''],
      subContractorId: [''],
      teamMembers: [''],
      officeLocationId: [''],
      workFlowId: [''],
      statusId: [''],
      relatedContacts: [''],
      tags: [''],
      note: this.formBuilder.group({
        text: ['']
      }),
      phoneNumbers: this.formBuilder.array([
        this.formBuilder.group({
          type: [''],
          number: ['']
        })
      ]),
      customFields: this.formBuilder.array([
        this.formBuilder.group({
          name: [''],
          value: ['']
        })
      ])
    });
  }

  onSubmit(): void {
    console.log(this.contactForm);
    if (this.contactForm.invalid) {
      console.log(this.contactForm);
    }

    this.contactDto = this.contactForm.value;
    console.log('Contact DTO:', this.contactDto);
    // Call your service to save the contact data
  }

  addPhoneNumber(): void {
    // const phoneNumbers = this.contactForm.get('phoneNumbers') as FormGroup;
    // phoneNumbers.push(this.formBuilder.group({
    //   type: [''],
    //   number: ['']
    // }));
  }

  removePhoneNumber(index: number): void {
    // const phoneNumbers = this.contactForm.get('phoneNumbers') as FormGroup;
    // phoneNumbers.removeAt(index);
  }

  addCustomField(): void {
    // const customFields = this.contactForm.get('customFields') as FormGroup;
    // customFields.push(this.formBuilder.group({
    //   name: [''],
    //   value: ['']
    // }));
  }

  removeCustomField(index: number): void {
    // const customFields = this.contactForm.get('customFields') as FormGroup;
    // customFields.removeAt(index);
  }
}
