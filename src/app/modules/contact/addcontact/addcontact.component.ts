import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../../core/services/contact.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CreateContactDto } from '../CreateContactDto';
import { CreatePhoneNumbersDto } from '../CreatePhoneNumbersDto';
@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css'],
})
export class AddcontactComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  contactForm!: FormGroup;
  phoneNumbersForm!: FormGroup;
  contactDto?: CreateContactDto;
  phoneTypes: any[] = [];
  phoneNumbers: {
    id: string;
    phoneNumber: string;
    typeId: string;
    typeName: string;
  }[] = [];
  ph: CreatePhoneNumbersDto[] = [];
  updateData: any = {};
  //-----------

  //-----------DropDowns
  salesReps: any;
  officeLocations: any;
  workflows: any;
  statuses: any;
  subcontractors: any;
  relatedcontacts: any;
  teamMembers: any;
  sources: any;
  states: any;
  //-----------DropDowns
  //---------Patch
  //-------------------
  imagePath: any = 'assets/images/5.png'; // initialize with a default image
  @ViewChild('fileInput') fileInput: any;

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imagePath = reader.result);
      reader.readAsDataURL(file);
    }
  }

  //--------------------

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AddcontactComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public contactService: ContactService,
    private route: ActivatedRoute
  ) {
    if (data) {
      this.updateData = data;
    }
  }

  get ssForm() {
    return this.contactForm.controls;
  }

  ngOnInit(): void {
    this.phoneNumbersForm = new FormGroup({
      phoneNumber: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      typeId: new FormControl('', Validators.required),
    });

    this.contactForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      company: new FormControl(''),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      city: new FormControl(''),
      zipCode: new FormControl(''),
      email: new FormControl('', Validators.email),
      website: new FormControl(''),
      faxNo: new FormControl(''),
      displayName: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      discription: new FormControl(''),
      homeNumber: new FormControl(''),
      officeNumber: new FormControl(''),
      file: new FormControl(''),
      sourceId: new FormControl(''),
      stateId: new FormControl(''),
      salesRepId: new FormControl('', Validators.required),
      subContractorId: new FormControl(),
      teamMembers: new FormControl([]),
      officeLocationId: new FormControl('', Validators.required),
      workFlowId: new FormControl('', Validators.required),
      statusId: new FormControl('', Validators.required),
      relatedContacts: new FormControl([]),
      tags: new FormControl([]),
      note: new FormControl(''),
      phoneNumbers: new FormControl([this.createPhoneNumberFormGroup()]),
      customFields: new FormControl([
        //this.createCustomFieldFormGroup()
      ]),
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
      this.getPhoneTypes(),
    ])
      .then(() => {
        console.log(this.updateData);
        // All asynchronous functions have completed
        if (this.updateData && this.updateData?.id) {
          debugger
          this.imagePath = this.updateData.picUrl
          this.contactForm.setValue({
            id: this.updateData?.id,
            firstName: this.updateData?.firstName,
            lastName: this.updateData?.lastName,
            company: this.updateData?.company,
            addressLine1: this.updateData?.addressLine1,
            addressLine2: this.updateData?.addressLine2,
            city: this.updateData?.city,
            zipCode: this.updateData?.zipCode,
            email: this.updateData?.email,
            website: this.updateData?.website,
            faxNo: this.updateData?.faxNo,
            displayName: this.updateData?.displayName,
            startDate: this.updateData?.startDate,
            endDate: this.updateData?.endDate,
            discription: this.updateData?.discription ?? '',
            file: this.updateData?.file ?? '',
            sourceId: this.updateData?.source?.id??'',
            stateId: this.updateData?.state?.id??'',
            salesRepId: this.updateData?.salesRep?.id??'',
            subContractorId: this.updateData?.subContractor?.id??'',
            teamMembers: this.updateData?.teamMembers?.map(
              (contact: any) => contact.id
            )??[],
            officeLocationId: this.updateData?.officeLocation.id??'',
            workFlowId: this.updateData?.workFlow?.id??'',
            statusId: this.updateData?.status?.id??'',
            relatedContacts: this.updateData?.relatedContacts?.map(
              (contact: any) => contact.id
            )??[],
            tags: this.updateData?.tags?.map((tagd: any) => ({
              display: tagd.tag,
              value: tagd.tag,
            }))??[],
            note: this.updateData.note,
            phoneNumbers: this.updateData?.phoneNumbers??[],
            customFields: this.updateData.customFields??[],
            homeNumber: this.updateData?.homeNumber ?? '',
            officeNumber: this.updateData?.officeNumber ?? '',
          });

          this.phoneNumbers = this.updateData?.phoneNumbers?.map(
            (phoneNumber: any) => ({
              id: phoneNumber.id,
              phoneNumber: phoneNumber.phoneNumber,
              typeId: phoneNumber.phoneNumberType.id,
              typeName: phoneNumber.phoneNumberType.value,
            })
          );
        }
      })
      .catch((error) => {
        console.error('An error occurred while fetching data:', error);
      });
  }

  createPhoneNumberFormGroup(): FormGroup {
    return new FormGroup({
      typeId: new FormControl(''),
      phoneNumber: new FormControl(''),
      typeName: new FormControl(''),
    });
  }

  addPhoneNumber(types: any): void {
    debugger
    const phoneNumber = this.phoneNumbersForm.value.phoneNumber.trim();
    const typeId = this.phoneNumbersForm.value.typeId;
    const id = this.phoneNumbersForm.value.id;
    const typeName = types.find((x: any) => x.id === typeId).value;
    if (this.phoneNumbers.find((pn) => pn.phoneNumber === phoneNumber)) {
      const index = this.phoneNumbers.findIndex(
        (pn) => pn.phoneNumber === phoneNumber
      );
      if (index >= 0) {
        this.phoneNumbers.splice(index, 1);
      }
    }

    if (
      phoneNumber &&
      typeId &&
      !this.phoneNumbers.find((pn) => pn.phoneNumber === phoneNumber)
    ) {
      this.phoneNumbers.push({ phoneNumber, typeId, typeName, id });
      this.phoneNumbersForm.reset();
    }
  }

  removePhoneNumber(phoneNumber: string): void {
    const index = this.phoneNumbers.findIndex(
      (pn) => pn.phoneNumber === phoneNumber
    );
    if (index >= 0) {
      this.phoneNumbers.splice(index, 1);
    }
  }

  // formData = new FormData();
  // upload(e: any) {
  //   this.formData.append("file", this.fileInput.nativeElement.files[0]);
  // }

  closeDailog() {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.contactForm.markAllAsTouched();
    console.log(
      this.contactForm.value,
      this.fileInput.nativeElement.files[0],
      this.phoneNumbers
    );

    if (this.contactForm.valid) {
      this.contactDto = this.contactForm.value;
      this.subscriptions.add(
        this.contactService
          .createContact(
            this.contactForm.value,
            this.fileInput.nativeElement.files[0],
            this.phoneNumbers
          )
          .subscribe({
            next: (res) => {
              this.snackBar.open('Record inserted successfully', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: ['success-snackbar'],
              });
              this.router.navigate(['/contact']);
              this.dialogRef.close();
            },
            error: (err) => {
              console.log(err);
              this.snackBar.open('Error', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: ['error-snackbar'],
              });
            },
            complete: () => {
              // This block will be executed when the observable completes
            },
          })
      );
    }
  }

  //-------------Callings
  getOfficeLocation() {
    this.subscriptions.add(
      this.contactService.allOfficeLocations().subscribe({
        next: (res) => {
          this.officeLocations = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getSalesRep() {
    this.subscriptions.add(
      this.contactService.allSalesRep().subscribe({
        next: (res) => {
          this.salesReps = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getWorkflows() {
    this.subscriptions.add(
      this.contactService.allWorkFlows().subscribe({
        next: (res) => {
          this.workflows = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getStatuses() {
    this.subscriptions.add(
      this.contactService.allStatus().subscribe({
        next: (res) => {
          this.statuses = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  //subcontractors
  getSubcontractors() {
    this.subscriptions.add(
      this.contactService.allSubcontractors().subscribe({
        next: (res) => {
          this.subcontractors = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getRelatedcontacts() {
    this.subscriptions.add(
      this.contactService.getRelatedContactsDropDown().subscribe({
        next: (res) => {
          this.relatedcontacts = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getTeamMembers() {
    this.subscriptions.add(
      this.contactService.allTeamMembers().subscribe({
        next: (res) => {
          this.teamMembers = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getSources() {
    this.subscriptions.add(
      this.contactService.allSource().subscribe({
        next: (res) => {
          const sourceTypeDropdown = res.payload[0].dropDown.find(
            (dropdown: any) => dropdown.dropDownName === 'SourceType'
          );
          this.sources = sourceTypeDropdown.dropDownValues;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getPhoneTypes() {
    this.subscriptions.add(
      this.contactService.allphoneTypes().subscribe({
        next: (res) => {
          const sourcePhoneTypes = res.payload[0].dropDown.find(
            (dropdown: any) => dropdown.dropDownName === 'MobileType'
          );
          this.phoneTypes = sourcePhoneTypes.dropDownValues;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getState() {
    this.subscriptions.add(
      this.contactService.allState().subscribe({
        next: (res) => {
          this.states = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  ngOnDestroy() {
    //Unsubscribe All subscriptions
    this.subscriptions.unsubscribe();
  }
}
