import { Component, OnInit , ViewChild } from '@angular/core';
import { FormArray, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { CreateContactDto } from '../CreateContactDto';


@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent  implements OnInit {
  contactForm!: FormGroup;
  contactDto?: CreateContactDto;
  //-----------

 
 
  //-----------DropDowns
  salesReps : any;
  officeLocations : any;
  workflows : any;
  statuses : any;
  subcontractors : any;
  relatedcontacts : any;
  teamMembers : any;
  sources : any;
  states:any;
  //-----------DropDowns
  imagePath: any = "assets/images/5.png"; // initialize with a default image
  @ViewChild('fileInput') fileInput: any;

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imagePath = reader.result;

      reader.readAsDataURL(file);
  }
  }
 

  //--------------------

  constructor(private formBuilder: FormBuilder,public contactService : ContactService) { }
  get ssForm() {
    return this.contactForm.controls;
  }
  ngOnInit(): void {
    Promise.all([
      this.getOfficeLocation(),
      this.getSalesRep(),
      this.getWorkflows(),
      this.getStatuses(),
      this.getSubcontractors(),
      this.getRelatedcontacts(),
      this.getTeamMembers(),
      this.getSources(),
      this.getState()
    ]).then(() => {
      // All asynchronous functions have completed
    }).catch((error) => {
      console.error('An error occurred while fetching data:', error);
    });
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
      salesRepId: ['', Validators.required],
      subContractorId: [[]],
      teamMembers: [[]],
      officeLocationId: ['', Validators.required],
      workFlowId: ['', Validators.required],
      statusId: ['', Validators.required],
      relatedContacts: [[]],
      tags: [[]],
      note: this.formBuilder.group({
        text: ['']
      }),
      phoneNumbers: this.formBuilder.array([
        this.createPhoneNumberFormGroup()
      ]),
      customFields: this.formBuilder.array([
        this.createCustomFieldFormGroup()
      ])
    });
  }
 
  createPhoneNumberFormGroup(): FormGroup {
    return this.formBuilder.group({
      type: [''],
      number: ['']
    });
  }
  addPhoneNumber(): void {
    const phoneNumbers = this.contactForm.get('phoneNumbers') as FormArray;
    phoneNumbers.push(this.createPhoneNumberFormGroup());
  }
  removePhoneNumber(index: number): void {
    const phoneNumbers = this.contactForm.get('phoneNumbers') as FormArray;
    phoneNumbers.removeAt(index);
  }
  createCustomFieldFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      value: ['']
    });
  }  
  addCustomField(): void {
    const customFields = this.contactForm.get('customFields') as FormArray;
    customFields.push(this.createCustomFieldFormGroup());
  }

  removeCustomField(index: number): void {
    const customFields = this.contactForm.get('customFields') as FormArray;
    customFields.removeAt(index);
  }

  get phoneNumbers(): FormArray {
    return this.contactForm.get('phoneNumbers') as FormArray;
  }

  get customFields(): FormArray {
    return this.contactForm.get('customFields') as FormArray;
  }
  formData = new FormData();
  upload(e: any) {
    this.formData.append("file", this.fileInput.nativeElement.files[0]);
  }
  onSubmit(): void {
  

   
    this.contactDto = this.contactForm.value;

    
    this.contactService.createContact(this.contactForm.value,this.fileInput.nativeElement.files[0]).subscribe(
      res => {
       console.log(res);
      },
      err => {
        alert(err);
      },
      () => {
  
      }
    );

    // Call your service to save the contact data
  }//==================================================================
 
//-------------Callings
getOfficeLocation(){
  this.contactService.allOfficeLocations().subscribe(
    res => {
      this.officeLocations = res.payload;
    },
    err => {
      alert(err);
    },
    () => {

    }
  );
}
getSalesRep(){
  this.contactService.allSalesRep().subscribe(
    res => {
      this.salesReps = res.payload;
    },
    err => {
      alert(err);
    },
    () => {

    }
  );
}
getWorkflows(){
  this.contactService.allWorkFlows().subscribe(
    res => {
      this.workflows = res.payload;
    },
    err => {
      alert(err);
    },
    () => {

    }
  );
}
getStatuses(){
  this.contactService.allStatus().subscribe(
    res => {
      this.statuses = res.payload;
    },
    err => {
      alert(err);
    },
    () => {

    }
  );
}
//subcontractors
getSubcontractors(){
  this.contactService.allSubcontractors().subscribe(
    res => {
      this.subcontractors = res.payload;
    },
    err => {
      alert(err);
    },
    () => {

    }
  );
}
//relatedcontacts
getRelatedcontacts(){
  this.contactService.allRelatedContacts().subscribe(
    res => {
      this.relatedcontacts = res.payload;
    },
    err => {
      alert(err);
    },
    () => {

    }
  );
}
getTeamMembers(){
  this.contactService.allTeamMembers().subscribe(
    res => {
      this.teamMembers = res.payload;
    },
    err => {
      alert(err);
    },
    () => {

    }
  );
}

getSources(){
  this.contactService.allSource().subscribe(
    res => {
      const sourceTypeDropdown = res.payload[0].dropDown.find((dropdown : any) => dropdown.dropDownName === "SourceType");
      this.sources = sourceTypeDropdown.dropDownValues;;
    },
    err => {
      alert(err);
    },
    () => {

    }
  );
}
getState(){
  this.contactService.allState().subscribe(
    res => {
      this.states = res.payload;
    },
    err => {
      alert(err);
    },
    () => {

    }
  );
}
//============================================
}
