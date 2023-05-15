import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { CreateJobDto } from '../CreateJobsDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatePhoneNumbersDto } from '../../contact/CreatePhoneNumbersDto';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent implements OnInit {
  officeLocationDropdownValues: any = [];
  public model: any = {};
  public modelMain: any = {};
  jobForm!: FormGroup;
  phoneNumbersForm!: FormGroup;
  JobDto?: CreateJobDto;
  phoneTypes: any[] = [];
  phoneNumbers: { id: string, phoneNumber: string, typeId: string, typeName: string }[] = [];
  ph: CreatePhoneNumbersDto[] = [];
  //-----------DropDowns
  updateData: any = {};
  //-----------DropDowns
  salesReps: any;
  officeLocations: any;
  workflows: any;
  statuses: any;
  subcontractors: any;
  RelatedContactId: any;
  TeamMememberId: any;
  sources: any;
  states: any;
  @ViewChild('fileInput') fileInput: any;

  constructor(private dialogRef: MatDialogRef<AddJobsComponent>, private jobService: JobService, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    if (data) {
      this.modelMain = data;
      this.updateData = Object.assign({}, this.modelMain);
    }
  }
  get ssForm() {
    return this.jobForm.controls;
  }
  closeAddJobsModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    //----------PH
    this.phoneNumbersForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      type: ['', Validators.required],
      typeId: ['', Validators.required]
    });

    //---------
    this.jobForm = this.formBuilder.group({
      id: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      zipCode: [''],
      faxNo: [''],
      officeNumber: [''],
      homeNumber: [''],
      mobileNumber: [''],
      name: [''],
      startDate: [''],
      endDate: [''],
      discription: [''],
      sourceId: [''],
      stateId: [''],
      salesRepId: ['', Validators.required],
      subContractorId: [],
      TeamMememberId: [[]],
      officeLocationId: ['', Validators.required],
      workFlowId: ['', Validators.required],
      statusId: ['', Validators.required],
      RelatedContactId: [[]],
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
      console.log(this.officeLocationDropdownValues);
      console.log(this.salesReps);
      console.log(this.workflows);
      console.log(this.statuses);
      console.log(this.subcontractors);
      console.log(this.RelatedContactId);
      console.log(this.TeamMememberId);
      console.log(this.sources);
      console.log(this.states);
      console.log(this.phoneTypes);
      if (this.updateData.id) {
        console.log(this.updateData);
        this.jobForm.patchValue({
          id: this.updateData.id,
          addressLine1: this.updateData.address1,
          addressLine2: this.updateData.address2,
          city: this.updateData.city,
          zipCode: this.updateData.zip,
          name: this.updateData.name,
          startDate: this.updateData.startDate,
          endDate: this.updateData.endDate,
          discription: this.updateData.description,
          sourceId: this.updateData.leadSourceId,
          stateId: this.updateData.stateId,
          salesRepId: this.updateData.salesRepsentativeId,
          subContractorId: this.updateData.subContractorId,
          officeLocationId: this.updateData.officeLocationId,
          workFlowId: this.updateData.workFlowId,
          statusId: this.updateData.jobStatusId,
          faxNo: this.updateData.faxNo,
          officeNumber: this.updateData.officeNo,
          homeNumber: this.updateData.homeNo,
          mobileNumber: this.updateData.mobileNo,
          
          // TeamMememberId: this.updateData.id,
          // RelatedContactId: [[]],
          // tags: [[]],
          // faxNo: this.updateData.id,
          // note: this.formBuilder.group({
          //   text: ['']
          // }),
          // phoneNumbers: this.formBuilder.array([
          //   this.createPhoneNumberFormGroup()
          // ]),
          // customFields: this.formBuilder.array([
          //   //this.createCustomFieldFormGroup()
          // ])
          
        });
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
      typeName: ['']
    });
  }

  //----------
  addPhoneNumber(types: any): void {
    const phoneNumber = this.phoneNumbersForm.value.phoneNumber.trim();
    const typeId = this.phoneNumbersForm.value.typeId;
    const id = this.phoneNumbersForm.value.id;
    const typeName = types.find((x: any) => x.id === typeId).value;
    if (this.phoneNumbers.find(pn => pn.phoneNumber === phoneNumber)) {
      const index = this.phoneNumbers.findIndex(pn => pn.phoneNumber === phoneNumber);
      if (index >= 0) {
        this.phoneNumbers.splice(index, 1);
      }
    }
    if (phoneNumber && typeId && !this.phoneNumbers.find(pn => pn.phoneNumber === phoneNumber)) {
      this.phoneNumbers.push({ phoneNumber, typeId, typeName, id });
      this.phoneNumbersForm.reset();
    }
  }
  removePhoneNumber(phoneNumber: string): void {
    const index = this.phoneNumbers.findIndex(pn => pn.phoneNumber === phoneNumber);
    if (index >= 0) {
      this.phoneNumbers.splice(index, 1);
    }
  }

  //------------------
  getOfficeLocation() {
    this.jobService.allOfficeLocations().subscribe(
      res => {
        this.officeLocationDropdownValues = res.payload;
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }

  onSubmit(requestType: string): void {
    this.jobForm.markAllAsTouched();
    if (this.jobForm.valid) {
      this.JobDto = this.jobForm.value;

      if(requestType === "Add") {
        this.jobService.createJob(this.jobForm.value, this.phoneNumbers).subscribe(
          res => {
            // this.snackBar.open('Record inserted successfully', 'Close', {
            //   duration: 3000,
            //   verticalPosition: 'top',
            //   panelClass: ['success-snackbar']
            // });
            this.router.navigate(['/jobs']);
            this.dialogRef.close();
          },
          err => {
            console.log(err)
            // this.snackBar.open('Error', 'Close', {
            //   duration: 3000,
            //   verticalPosition: 'top',
            //   panelClass: ['error-snackbar']
            // });
            this.router.navigate(['/jobs']);
            this.dialogRef.close();
          },
          () => {
          }
        );
      } else {
        this.jobService.updateJob(this.jobForm.value, this.phoneNumbers).subscribe(
          res => {
            // this.snackBar.open('Record inserted successfully', 'Close', {
            //   duration: 3000,
            //   verticalPosition: 'top',
            //   panelClass: ['success-snackbar']
            // });
            this.router.navigate(['/jobs']);
            this.dialogRef.close();
          },
          err => {
            console.log(err)
            // this.snackBar.open('Error', 'Close', {
            //   duration: 3000,
            //   verticalPosition: 'top',
            //   panelClass: ['error-snackbar']
            // });
            this.router.navigate(['/jobs']);
            this.dialogRef.close();
          },
          () => {
          }
        );
      }

      
    }
    // Call your service to save the job data
  }//==================================================================

  //-------------Callings
  getSalesRep() {
    this.jobService.allSalesRep().subscribe(
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
  getWorkflows() {
    this.jobService.allWorkFlows().subscribe(
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
  getStatuses() {
    this.jobService.allStatus().subscribe(
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
  getSubcontractors() {
    this.jobService.allSubcontractors().subscribe(
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
  //relatedcontacts
  getRelatedcontacts() {
    this.jobService.allRelatedContacts().subscribe(
      res => {
        this.RelatedContactId = res.payload;
      },
      err => {
        console.log(err);
      },
      () => {

      }
    );
  }
  getTeamMembers() {
    this.jobService.allTeamMembers().subscribe(
      res => {
        this.TeamMememberId = res.payload;
      },
      err => {
        console.log(err);
      },
      () => {

      }
    );
  }
  getPhoneTypes() {
    this.jobService.allphoneTypes().subscribe(
      res => {
        const sourcePhoneTypes = res.payload[0].dropDown.find((dropdown: any) => dropdown.dropDownName === "MobileType");
        this.phoneTypes = sourcePhoneTypes.dropDownValues;;
      },
      err => {
        console.log(err);
      },
      () => {

      }
    );
  }

  getSources() {
    this.jobService.allSource().subscribe(
      res => {
        const sourceTypeDropdown = res.payload[0].dropDown.find((dropdown: any) => dropdown.dropDownName === "SourceType");
        this.sources = sourceTypeDropdown.dropDownValues;;
      },
      err => {
        console.log(err);
      },
      () => {

      }
    );
  }
  getState() {
    this.jobService.allState().subscribe(
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
