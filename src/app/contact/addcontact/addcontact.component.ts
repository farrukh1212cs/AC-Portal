import { Component, Inject, OnInit , ViewChild } from '@angular/core';
import { FormArray, FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { CreateContactDto } from '../CreateContactDto';
import { CreatePhoneNumbersDto } from '../CreatePhoneNumbersDto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent  implements OnInit {
  contactForm!: FormGroup;
  phoneNumbersForm!: FormGroup;
  contactDto?: CreateContactDto;
  phoneTypes: any[] = [];
  phoneNumbers: { phoneNumber: string, typeId: string, typeName: string}[] = [];
  ph : CreatePhoneNumbersDto[] = [];
  updateData:any = {};
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,public contactService : ContactService,private route: ActivatedRoute) {
    console.log(data);
    if(data)
    {
      this.updateData = data;
    }
   }
  get ssForm() {
    return this.contactForm.controls;
  }
  ngOnInit(): void {
   
    //----------PH
    this.phoneNumbersForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      type : ['', Validators.required],
      typeId: ['', Validators.required]
    });
    //---------
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
        //this.createCustomFieldFormGroup()
      ])
    });
    Promise.all([
      this.getOfficeLocation(),
      this.getSalesRep(),
      this.getWorkflows(),
      this.getStatuses(),
      this.getSubcontractors(),
      this.getRelatedcontacts(),
      this.getTeamMembers(),
      this.getSources(),
      this.getState(),
      this.getPhoneTypes()
    ]).then(() => {
      // All asynchronous functions have completed
      this.contactForm.patchValue({
        firstName: this.updateData.contact.firstName,
        lastName: this.updateData.contact.lastName,
        company: this.updateData.contact.company,
        addressLine1: this.updateData.contact.addressLine1,
        addressLine2: this.updateData.contact.addressLine2,
        city: this.updateData.contact.city,
        zipCode: this.updateData.contact.zipCode,
        email: this.updateData.contact.email,
        website: this.updateData.contact.website,
        faxNo: this.updateData.contact.faxNo,
        displayName: this.updateData.contact.displayName,
        startDate: this.updateData.contact.startDate,
        endDate: this.updateData.contact.endDate,
        description: this.updateData.contact.description,
        file: this.updateData.contact.file,
        sourceId: this.updateData.contact.sourceId,
        stateId: this.updateData.contact.stateId,
        salesRepId: this.updateData.contact.salesRepId,
        subContractorId: this.updateData.contact.subContractorId,
        teamMembers: this.updateData.contact.teamMembers,
        officeLocationId: this.updateData.contact.officeLocationId,
        workFlowId: this.updateData.contact.workFlowId,
        statusId: this.updateData.contact.state.id,
        relatedContacts: this.updateData.contact.relatedContacts,
        tags: this.updateData.contact.tags,
        note: {
          text: this.updateData.contact.note.text
        },
        phoneNumbers: this.updateData.contact.phoneNumbers.map((phoneNumber: any) => ({
          number: phoneNumber.number,
          type: phoneNumber.type
        })),
        customFields: this.updateData.contact.customFields.map((customField: any) => ({
          name: customField.name,
          value: customField.value
        }))
      });
    }).catch((error) => {
      console.error('An error occurred while fetching data:', error);
    });
   
    
  }
 
  //---------
  createPhoneNumberFormGroup(): FormGroup {
    return this.formBuilder.group({
      typeId: [''],
      phoneNumber: [''],
      typeName : ['']
    });

   
  }
 
  //----------
  addPhoneNumber(types : any): void {
    debugger;
    const phoneNumber = this.phoneNumbersForm.value.phoneNumber.trim();
    const typeId = this.phoneNumbersForm.value.typeId;
    const  typeName = types.find((x:any)=>x.id===typeId).value ;
    if(this.phoneNumbers.find(pn => pn.phoneNumber === phoneNumber)){
      const index = this.phoneNumbers.findIndex(pn => pn.phoneNumber === phoneNumber);
      if (index >= 0) {
        this.phoneNumbers.splice(index, 1);
      }
    }

    if (phoneNumber && typeId && !this.phoneNumbers.find(pn => pn.phoneNumber === phoneNumber)) {    
      this.phoneNumbers.push({ phoneNumber, typeId,typeName });
      this.phoneNumbersForm.reset();
    }
  }

  removePhoneNumber(phoneNumber: string): void {
    const index = this.phoneNumbers.findIndex(pn => pn.phoneNumber === phoneNumber);
    if (index >= 0) {
      this.phoneNumbers.splice(index, 1);
    }
  }
 

  // formData = new FormData();
  // upload(e: any) {
  //   this.formData.append("file", this.fileInput.nativeElement.files[0]);
  // }
  onSubmit(): void {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      this.contactDto = this.contactForm.value
      this.contactService.createContact(this.contactForm.value,this.fileInput.nativeElement.files[0],this.phoneNumbers).subscribe(
        res => {
         console.log(res);
        },
        err => {
          alert(err);
        },
        () => {
    
        }
      );
    }   
    

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
getPhoneTypes(){
  this.contactService.allphoneTypes().subscribe(
    res => {
      const sourcePhoneTypes = res.payload[0].dropDown.find((dropdown : any) => dropdown.dropDownName === "MobileType");
      this.phoneTypes = sourcePhoneTypes.dropDownValues;;
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
