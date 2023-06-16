import { Component, Inject, OnInit , ViewChild } from '@angular/core';
import { FormArray, FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { CreateContactDto } from '../CreateContactDto';
import { CreatePhoneNumbersDto } from '../CreatePhoneNumbersDto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.scss']
})
export class AddcontactComponent  implements OnInit {
  contactForm!: FormGroup;
  phoneNumbersForm!: FormGroup;
  contactDto?: CreateContactDto;
  phoneTypes: any[] = [];
  phoneNumbers: { id : string, phoneNumber: string, typeId: string, typeName: string}[] = [];
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
  //---------Patch
  //-------------------
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

  constructor(private router: Router,public dialogRef: MatDialogRef<AddcontactComponent>,private snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,public contactService : ContactService,private route: ActivatedRoute) {
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
      id:[''],
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
      subContractorId: [],
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
      if(this.updateData.contact?.firstName){

        this.contactForm.patchValue({
          id: this.updateData.contact?.id,
          firstName: this.updateData.contact?.firstName,
          lastName: this.updateData.contact?.lastName,
          company: this.updateData.contact?.company,
          addressLine1: this.updateData.contact?.addressLine1,
          addressLine2: this.updateData.contact?.addressLine2,
          city: this.updateData.contact?.city,
          zipCode: this.updateData.contact?.zipCode,
          email: this.updateData.contact?.email,
          website: this.updateData.contact?.website,
          faxNo: this.updateData.contact?.faxNo,
          displayName: this.updateData.contact?.displayName,
          startDate: this.updateData.contact?.startDate,
          endDate: this.updateData.contact?.endDate,
          description: this.updateData.contact?.description,
          file: this.updateData.contact?.file,
          sourceId: this.updateData.contact?.source?.id,
          stateId: this.updateData.contact?.state?.id,
          salesRepId: this.updateData.contact?.salesRep?.id,
          subContractorId:this.updateData.contact?.subContractor?.id,
          teamMembers: this.updateData.contact?.teamMembers?.map((contact:any) => contact.id),
          officeLocationId: this.updateData.contact?.officeLocation.id,
          workFlowId: this.updateData.contact?.workFlow?.id,
          statusId: this.updateData.contact?.status?.id,
          relatedContacts: this.updateData.contact?.relatedContacts?.map((contact:any) => contact.id),        
          tags: this.updateData?.contact?.tags?.map((tagd:any)=>({
            display : tagd.tag,
            value : tagd.tag
          })),
          note: {
            text: this.updateData.contact?.note?.text
          },
          
         
          // customFields: this.updateData.contact.customFields.map((customField: any) => ({
          //   name: customField.name,
          //   value: customField.value
          // }))
        });
  
        this.phoneNumbers = this.updateData.contact?.phoneNumbers?.map((phoneNumber: any) => ({
          id : phoneNumber.id,
          phoneNumber: phoneNumber.phoneNumber,
          typeId: phoneNumber.phoneNumberType.id,
          typeName : phoneNumber.phoneNumberType.value
        }))
      }
      
     
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
    const phoneNumber = this.phoneNumbersForm.value.phoneNumber.trim();
    const typeId = this.phoneNumbersForm.value.typeId;
    const id = this.phoneNumbersForm.value.id;
    const  typeName = types.find((x:any)=>x.id===typeId).value ;
    if(this.phoneNumbers.find(pn => pn.phoneNumber === phoneNumber)){
      const index = this.phoneNumbers.findIndex(pn => pn.phoneNumber === phoneNumber);
      if (index >= 0) {
        this.phoneNumbers.splice(index, 1);
      }
    }

    if (phoneNumber && typeId && !this.phoneNumbers.find(pn => pn.phoneNumber === phoneNumber)) {    
      this.phoneNumbers.push({ phoneNumber, typeId,typeName,id });
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

  closeDailog(){
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {

      this.contactDto = this.contactForm.value
      this.contactService.createContact(this.contactForm.value,this.fileInput.nativeElement.files[0],this.phoneNumbers).subscribe(
        res => {
          this.snackBar.open('Record inserted successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/contact']);
          this.dialogRef.close();
        
        },
        err => {
          console.log(err)
          this.snackBar.open('Error', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    },
    () => {

    }
  );
}
getRelatedcontacts(){
  this.contactService.getRelatedContactsDropDown().subscribe(
    res => {
      this.relatedcontacts = res.payload;
    },
    err => {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    },
    () => {

    }
  );
}
//============================================
}
